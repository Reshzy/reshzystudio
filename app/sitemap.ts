import type { MetadataRoute } from "next";
import { loadAllArtwork, loadAllCollections } from "@/lib/content";
import { PUBLIC_STATIC_ROUTES } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticEntries = PUBLIC_STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const artworkEntries = loadAllArtwork().map((artwork) => ({
    url: `${siteUrl}/artwork/${artwork.slug}`,
    lastModified: new Date(artwork.metadata.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const collectionEntries = loadAllCollections().map((collection) => ({
    url: `${siteUrl}/collection/${collection.slug}`,
    lastModified: new Date(collection.metadata.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...artworkEntries, ...collectionEntries];
}
