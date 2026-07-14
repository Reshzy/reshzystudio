import type { Artwork } from "@/types/content";

/**
 * Immutable presentation model for artwork teasers, grids, and filters.
 */
export interface ArtworkPreviewModel {
  id: string;
  slug: string;
  title: string;
  href: string;
  summary: string;
  coverSrc: string;
  category: string;
  categorySlug: string;
  year: number;
  aspectRatio: string;
  featured: boolean;
  medium: string;
  software: string[];
  tags: string[];
  collectionSlug?: string;
}

export function toCategorySlug(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toArtworkPreview(artwork: Artwork): ArtworkPreviewModel {
  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    href: `/artwork/${artwork.slug}`,
    summary: artwork.summary,
    coverSrc: artwork.media.cover,
    category: artwork.creative.category,
    categorySlug: toCategorySlug(artwork.creative.category),
    year: artwork.creative.yearCreated,
    aspectRatio: artwork.technical?.aspectRatio ?? "4 / 5",
    featured: artwork.featured,
    medium: artwork.creative.medium,
    software: artwork.technical?.software ?? [],
    tags: artwork.tags,
    collectionSlug: artwork.creative.collectionSlug,
  };
}
