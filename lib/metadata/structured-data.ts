import type { Artwork, SiteConfiguration } from "@/types/content";
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

export function buildArtworkStructuredData(
  artwork: Artwork,
  config: SiteConfiguration,
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const path = artwork.metadata.seo.canonicalPath ?? `/artwork/${artwork.slug}`;
  const image = artwork.metadata.seo.socialImage ?? artwork.media.cover;

  const creativeWork: Record<string, unknown> = {
    "@type": "CreativeWork",
    "@id": `${siteUrl}${path}#creativework`,
    name: artwork.title,
    description: artwork.metadata.seo.metaDescription ?? artwork.summary,
    url: `${siteUrl}${path}`,
    image: image.startsWith("http") ? image : `${siteUrl}${image}`,
    dateCreated: String(artwork.creative.yearCreated),
    genre: artwork.creative.category,
    artMedium: artwork.creative.medium,
    keywords: artwork.tags.join(", "),
    creator: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  if (artwork.technical?.software?.length) {
    creativeWork.instrument = artwork.technical.software;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...buildSiteStructuredData(config)["@graph"],
      creativeWork,
    ],
  };
}

export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
