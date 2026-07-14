import type { SiteConfiguration } from "@/types/content";
import { getSiteUrl } from "@/lib/env";

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

export function buildSiteStructuredData(
  config: SiteConfiguration,
): JsonLdGraph {
  const siteUrl = getSiteUrl();

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: config.identity.owner,
    url: siteUrl,
  };

  if (config.footer.email) {
    person.email = config.footer.email;
  }

  if (config.footer.socialLinks.length > 0) {
    person.sameAs = config.footer.socialLinks.map((link) => link.url);
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: config.identity.siteName,
    description: config.seo.defaultDescription,
    url: siteUrl,
    inLanguage: config.seo.locale,
    publisher: { "@id": `${siteUrl}/#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };
}

export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
