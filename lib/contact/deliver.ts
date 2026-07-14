import type { ContactMessageInput } from "./validate";

export type ContactDeliveryStatus = "accepted";

export interface ContactDeliveryResult {
  status: ContactDeliveryStatus;
}

/**
 * Delivery adapter for validated contact messages.
 *
 * No email provider or external endpoint is defined in the architecture.
 * v1 accepts validated messages so the conversation UI can complete.
 * Replace this function's body when a delivery channel is introduced —
 * the form, validation, and Server Action contract stay unchanged.
 */
export async function deliverContactMessage(
  message: ContactMessageInput,
): Promise<ContactDeliveryResult> {
  void message;
  return { status: "accepted" };
}
