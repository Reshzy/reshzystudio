import type {
  Artwork,
  Collection,
  Profile,
  SiteConfiguration,
} from "@/types/content";
import { getSiteUrl } from "@/lib/env";

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function absoluteUrl(pathOrUrl: string, siteUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  if (!pathOrUrl || pathOrUrl === "/") {
    return siteUrl;
  }

  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
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

  const socialLinks = profile?.socialLinks.length
    ? profile.socialLinks
    : config.footer.socialLinks;

  if (socialLinks.length > 0) {
    person.sameAs = socialLinks.map((link) => link.url);
  }

  if (profile?.profileImage) {
    person.image = absoluteUrl(profile.profileImage, siteUrl);
  }

  return person;
}

function buildWebsiteNode(config: SiteConfiguration): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: config.identity.siteName,
    description: config.seo.defaultDescription,
    url: siteUrl,
    inLanguage: config.seo.locale,
    publisher: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
  };
}

export function buildBreadcrumbList(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${items[items.length - 1]?.path ?? ""}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl),
    })),
  };
}

export function buildSiteStructuredData(
  config: SiteConfiguration,
  profile?: Profile,
): JsonLdGraph {
  const person = buildPersonNode(config, profile);
  const website = buildWebsiteNode(config);

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
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  const profilePage: Record<string, unknown> = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about#profilepage`,
    url: `${siteUrl}/about`,
    name: `About · ${profile.name}`,
    description: profile.shortBio,
    mainEntity: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, buildWebsiteNode(config), profilePage, breadcrumb],
  };
}

export function buildWebPageStructuredData(options: {
  config: SiteConfiguration;
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  profile?: Profile;
}): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const breadcrumb = buildBreadcrumbList(options.breadcrumbs);
  const url = absoluteUrl(options.path, siteUrl);

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url === siteUrl ? siteUrl : url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(options.config, options.profile),
      buildWebsiteNode(options.config),
      webPage,
      breadcrumb,
    ],
  };
}

export function buildCollectionPageStructuredData(options: {
  config: SiteConfiguration;
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  items?: Array<{ name: string; path: string }>;
  coverImage?: string;
  profile?: Profile;
}): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const breadcrumb = buildBreadcrumbList(options.breadcrumbs);
  const url = absoluteUrl(options.path, siteUrl);

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": `${url}#collectionpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  if (options.coverImage) {
    collectionPage.image = absoluteUrl(options.coverImage, siteUrl);
  }

  if (options.items?.length) {
    collectionPage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: options.items.length,
      itemListElement: options.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(item.path, siteUrl),
        name: item.name,
      })),
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(options.config, options.profile),
      buildWebsiteNode(options.config),
      collectionPage,
      breadcrumb,
    ],
  };
}

export function buildCollectionStructuredData(
  collection: Collection,
  config: SiteConfiguration,
  items: Array<{ name: string; path: string }> = [],
): JsonLdGraph {
  const path =
    collection.metadata.seo.canonicalPath ?? `/collection/${collection.slug}`;

  return buildCollectionPageStructuredData({
    config,
    path,
    name: collection.metadata.seo.metaTitle ?? collection.title,
    description:
      collection.metadata.seo.metaDescription ?? collection.description,
    coverImage: collection.coverImage,
    items,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Collection", path: "/collection" },
      { name: collection.title, path },
    ],
  });
}

export function buildArtworkStructuredData(
  artwork: Artwork,
  config: SiteConfiguration,
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const path = artwork.metadata.seo.canonicalPath ?? `/artwork/${artwork.slug}`;
  const image = artwork.metadata.seo.socialImage ?? artwork.media.cover;
  const imageUrl = absoluteUrl(image, siteUrl);
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Artwork", path: "/artwork" },
    { name: artwork.title, path },
  ]);

  const imageObject: Record<string, unknown> = {
    "@type": "ImageObject",
    "@id": `${siteUrl}${path}#image`,
    contentUrl: imageUrl,
    url: imageUrl,
    name: artwork.title,
    description: artwork.summary,
    creator: { "@id": `${siteUrl}/#person` },
  };

  if (artwork.technical?.dimensions) {
    imageObject.caption = artwork.technical.dimensions;
  }

  const creativeWork: Record<string, unknown> = {
    "@type": "CreativeWork",
    "@id": `${siteUrl}${path}#creativework`,
    name: artwork.title,
    description: artwork.metadata.seo.metaDescription ?? artwork.summary,
    url: `${siteUrl}${path}`,
    image: { "@id": imageObject["@id"] },
    dateCreated: String(artwork.creative.yearCreated),
    genre: artwork.creative.category,
    artMedium: artwork.creative.medium,
    keywords: artwork.tags.join(", "),
    creator: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    breadcrumb: { "@id": breadcrumb["@id"] },
  };

  if (artwork.technical?.software?.length) {
    creativeWork.instrument = artwork.technical.software;
  }

  if (artwork.metadata.publishedAt) {
    creativeWork.datePublished = artwork.metadata.publishedAt;
  }

  if (artwork.metadata.updatedAt) {
    creativeWork.dateModified = artwork.metadata.updatedAt;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...buildSiteStructuredData(config)["@graph"],
      creativeWork,
      imageObject,
      breadcrumb,
    ],
  };
}

export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
