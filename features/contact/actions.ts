"use server";

import {
  deliverContactMessage,
  validateContactMessage,
} from "@/lib/contact";
import type { ContactActionState } from "./contact-form-state";

/**
 * Contact form Server Action.
 * Validates input, then hands off to the delivery adapter.
 * Delivery provider is intentionally not invented here.
 */
export async function submitContactMessage(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { status: "success" };
  }

  const validation = validateContactMessage(formData);

  if (!validation.success || !validation.data) {
    return {
      status: "invalid",
      fieldErrors: validation.fieldErrors,
      message: "Please review the fields below.",
    };
  }

  try {
    await deliverContactMessage(validation.data);
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "The message could not be sent.",
    };
  }
}
