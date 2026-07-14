import type { Artwork } from "@/types/content";

/**
 * Immutable presentation model for artwork teasers and grids.
 */
export interface ArtworkPreviewModel {
  id: string;
  slug: string;
  title: string;
  href: string;
  summary: string;
  coverSrc: string;
  category: string;
  year: number;
  aspectRatio: string;
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
    year: artwork.creative.yearCreated,
    aspectRatio: artwork.technical?.aspectRatio ?? "4 / 5",
  };
}
