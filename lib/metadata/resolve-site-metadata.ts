import type { Metadata } from "next";
import type { ResolvedPageMetadata, SiteConfiguration } from "@/types/content";
import { getSiteUrl } from "@/lib/env";

interface ResolveSiteMetadataOptions {
  path?: string;
  overrides?: Partial<ResolvedPageMetadata>;
}

function resolveCanonicalUrl(siteUrl: string, path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

function toOpenGraphLocale(locale: string): string {
  if (locale.includes("_") || locale.includes("-")) {
    return locale.replace("-", "_");
  }

  if (locale === "en") {
    return "en_US";
  }

  return locale;
}

function isRasterSocialImage(src?: string): src is string {
  if (!src) {
    return false;
  }

  const normalized = src.toLowerCase().split("?")[0] ?? src;
  return !normalized.endsWith(".svg");
}

export function resolvePageMetadata(
  config: SiteConfiguration,
  options: ResolveSiteMetadataOptions = {},
): ResolvedPageMetadata {
  const { path = "/", overrides = {} } = options;
  const siteUrl = getSiteUrl();

  return {
    title: overrides.title ?? config.seo.defaultTitle,
    description: overrides.description ?? config.seo.defaultDescription,
    canonicalUrl: overrides.canonicalUrl ?? resolveCanonicalUrl(siteUrl, path),
    openGraphImage: overrides.openGraphImage ?? config.social.ogImage,
    keywords: overrides.keywords ?? config.seo.defaultKeywords,
    noIndex: overrides.noIndex ?? false,
    openGraphType: overrides.openGraphType ?? "website",
  };
}

export function buildSiteMetadata(
  config: SiteConfiguration,
  options: ResolveSiteMetadataOptions = {},
): Metadata {
  const resolved = resolvePageMetadata(config, options);
  const siteUrl = getSiteUrl();
  const isRootDefaults =
    !options.overrides?.title &&
    (options.path === undefined || options.path === "/");
  const owner = config.identity.owner;
  const socialImage = isRasterSocialImage(resolved.openGraphImage)
    ? resolved.openGraphImage
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    applicationName: config.identity.siteName,
    title: isRootDefaults
      ? {
          default: config.seo.defaultTitle,
          template: config.seo.titleTemplate,
        }
      : resolved.title,
    description: resolved.description,
    keywords: resolved.keywords,
    authors: [{ name: owner, url: `${siteUrl}/about` }],
    creator: owner,
    publisher: owner,
    alternates: {
      canonical: resolved.canonicalUrl,
    },
    openGraph: {
      type: resolved.openGraphType,
      locale: toOpenGraphLocale(config.seo.locale),
      url: resolved.canonicalUrl,
      siteName: config.identity.siteName,
      title: resolved.title,
      description: resolved.description,
      images: socialImage
        ? [{ url: socialImage, alt: resolved.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.description,
      images: socialImage ? [socialImage] : undefined,
      creator: config.social.twitterHandle,
    },
    robots: resolved.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
