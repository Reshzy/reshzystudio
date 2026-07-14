import type { Artwork, Profile, SiteConfiguration } from "@/types/content";
import { getSiteUrl } from "@/lib/env";

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

function buildPersonNode(
  config: SiteConfiguration,
  profile?: Profile,
): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile?.name ?? config.identity.owner,
    url: `${siteUrl}/about`,
  };

  const description = profile?.shortBio ?? config.seo.defaultDescription;
  if (description) {
    person.description = description;
  }

  const email = profile?.email ?? config.footer.email;
  if (email) {
    person.email = email;
  }

  if (profile?.location) {
    person.homeLocation = {
      "@type": "Place",
      name: profile.location,
    };
  }

  if (profile?.skills.length) {
    person.knowsAbout = profile.skills.map((skill) => skill.label);
  }

  if (profile?.currentFocus) {
    person.jobTitle = "Artist & Designer";
  } else if (profile?.experience?.[0]?.role) {
    person.jobTitle = profile.experience[0].role;
  }

  const socialLinks =
    profile?.socialLinks.length
      ? profile.socialLinks
      : config.footer.socialLinks;

  if (socialLinks.length > 0) {
    person.sameAs = socialLinks.map((link) => link.url);
  }

  if (profile?.profileImage) {
    person.image = profile.profileImage.startsWith("http")
      ? profile.profileImage
      : `${siteUrl}${profile.profileImage}`;
  }

  return person;
}

export function buildSiteStructuredData(
  config: SiteConfiguration,
  profile?: Profile,
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const person = buildPersonNode(config, profile);

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

export function buildAboutStructuredData(
  profile: Profile,
  config: SiteConfiguration,
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const person = buildPersonNode(config, profile);

  const profilePage: Record<string, unknown> = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about#profilepage`,
    url: `${siteUrl}/about`,
    name: `About · ${profile.name}`,
    description: profile.shortBio,
    mainEntity: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: config.identity.siteName,
        url: siteUrl,
      },
      profilePage,
    ],
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
