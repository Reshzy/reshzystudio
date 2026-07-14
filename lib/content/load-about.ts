import aboutContent from "@/content/site/about.json";
import type { AboutPageContent } from "@/types/content";

export function loadAboutContent(): AboutPageContent {
  return aboutContent as AboutPageContent;
}
