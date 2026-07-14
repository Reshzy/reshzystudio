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
    noIndex: overrides.noIndex ?? false,
  };
}

export function buildSiteMetadata(
  config: SiteConfiguration,
  options: ResolveSiteMetadataOptions = {},
): Metadata {
  const resolved = resolvePageMetadata(config, options);
  const siteUrl = getSiteUrl();
  const isRootDefaults =
    !options.overrides?.title && (options.path === undefined || options.path === "/");

  return {
    metadataBase: new URL(siteUrl),
    title: isRootDefaults
      ? {
          default: config.seo.defaultTitle,
          template: config.seo.titleTemplate,
        }
      : resolved.title,
    description: resolved.description,
    alternates: {
      canonical: resolved.canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: config.seo.locale,
      url: resolved.canonicalUrl,
      siteName: config.identity.siteName,
      title: resolved.title,
      description: resolved.description,
      images: resolved.openGraphImage
        ? [{ url: resolved.openGraphImage, alt: config.identity.siteName }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.title,
      description: resolved.description,
      images: resolved.openGraphImage ? [resolved.openGraphImage] : undefined,
      creator: config.social.twitterHandle,
    },
    robots: resolved.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
