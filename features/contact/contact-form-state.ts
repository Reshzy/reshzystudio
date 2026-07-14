import type { ContactFieldErrors } from "@/lib/contact";

export type ContactFormStatus = "idle" | "success" | "error" | "invalid";

export interface ContactActionState {
  status: ContactFormStatus;
  fieldErrors?: ContactFieldErrors;
  message?: string;
}

export const initialContactActionState: ContactActionState = {
  status: "idle",
};
