import siteConfig from "@/content/site/config.json";
import type { SiteConfiguration } from "@/types/content";

export function loadSiteConfiguration(): SiteConfiguration {
  return siteConfig as SiteConfiguration;
}
