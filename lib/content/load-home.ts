import homeContent from "@/content/site/home.json";
import type { HomePageContent } from "@/types/content";

export function loadHomeContent(): HomePageContent {
  return homeContent as HomePageContent;
}
