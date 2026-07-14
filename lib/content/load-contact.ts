import contactContent from "@/content/site/contact.json";
import type { ContactPageContent } from "@/types/content";

export function loadContactContent(): ContactPageContent {
  return contactContent as ContactPageContent;
}
