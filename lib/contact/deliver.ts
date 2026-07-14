import type { ContactMessageInput } from "./validate";

export type ContactDeliveryStatus = "accepted";

export interface ContactDeliveryResult {
  status: ContactDeliveryStatus;
}

function getWebhookUrl(): string | undefined {
  const value = process.env.CONTACT_WEBHOOK_URL?.trim();
  return value || undefined;
}

/**
 * Delivery adapter for validated contact messages.
 *
 * Production: POST JSON to CONTACT_WEBHOOK_URL when configured
 * (Formspree, Make, Zapier, or any compatible webhook).
 * Development: accepts and logs so the form UX can be exercised locally.
 * Production without a webhook: fails loudly so success is never fabricated.
 */
export async function deliverContactMessage(
  message: ContactMessageInput,
): Promise<ContactDeliveryResult> {
  const webhookUrl = getWebhookUrl();

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: message.name,
        email: message.email,
        message: message.message,
        source: "reshzystudio-contact",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Contact webhook responded with ${response.status}`);
    }

    return { status: "accepted" };
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact] Message accepted (no CONTACT_WEBHOOK_URL):", {
      name: message.name,
      email: message.email,
      messageLength: message.message.length,
    });
    return { status: "accepted" };
  }

  throw new Error("Contact delivery is not configured");
}
