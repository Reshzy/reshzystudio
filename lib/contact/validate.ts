export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export type ContactFieldErrors = Partial<
  Record<keyof ContactMessageInput, string>
>;

export interface ContactValidationResult {
  success: boolean;
  data?: ContactMessageInput;
  fieldErrors?: ContactFieldErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates contact form fields. Pure — no I/O.
 * Fields match CONTACT.md: Name, Email, Message.
 */
export function validateContactMessage(
  formData: FormData,
): ContactValidationResult {
  const name = readString(formData.get("name"));
  const email = readString(formData.get("email"));
  const message = readString(formData.get("message"));

  const fieldErrors: ContactFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Please share your name.";
  } else if (name.length > 120) {
    fieldErrors.name = "Please keep the name under 120 characters.";
  }

  if (!email) {
    fieldErrors.email = "Please share an email address.";
  } else if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!message) {
    fieldErrors.message = "Please include a short message.";
  } else if (message.length < 10) {
    fieldErrors.message = "A little more detail helps — at least a sentence.";
  } else if (message.length > 5000) {
    fieldErrors.message = "Please keep the message under 5,000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  return {
    success: true,
    data: { name, email, message },
  };
}
