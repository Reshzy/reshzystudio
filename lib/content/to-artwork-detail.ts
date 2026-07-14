import type { Artwork, ArtworkStory } from "@/types/content";
import { resolveArtworkAlt } from "@/lib/a11y";
import {
  toArtworkPreview,
  type ArtworkPreviewModel,
} from "./to-artwork-preview";
import { loadAllArtwork, loadArtworkById } from "./load-artwork";

export interface ArtworkGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArtworkNavigationLink {
  id: string;
  slug: string;
  title: string;
  href: string;
  coverSrc: string;
  category: string;
  year: number;
}

export interface ArtworkDetailModel {
  id: string;
  slug: string;
  title: string;
  href: string;
  summary: string;
  overview: string;
  narrative?: string;
  story: ArtworkStory;
  category: string;
  medium: string;
  year: number;
  duration?: string;
  role?: string;
  client?: string;
  software: string[];
  dimensions?: string;
  aspectRatio: string;
  colorPalette: string[];
  tags: string[];
  coverSrc: string;
  coverAlt: string;
  gallery: ArtworkGalleryItem[];
  relatedWork: ArtworkPreviewModel[];
  previous: ArtworkNavigationLink | null;
  next: ArtworkNavigationLink | null;
  collectionHref: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    socialImage: string;
    canonicalPath: string;
  };
}

function toNavigationLink(artwork: Artwork): ArtworkNavigationLink {
  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    href: `/artwork/${artwork.slug}`,
    coverSrc: artwork.media.cover,
    category: artwork.creative.category,
    year: artwork.creative.yearCreated,
  };
}

function resolveSupportingGallery(artwork: Artwork): ArtworkGalleryItem[] {
  const cover = artwork.media.cover;
  const unique = artwork.media.gallery.filter(
    (src, index, list) => src !== cover && list.indexOf(src) === index,
  );

  return unique.map((src, index) => ({
    src,
    alt: resolveArtworkAlt(
      `${artwork.title} — study ${index + 1}`,
      artwork.summary,
    ),
  }));
}

function resolveRelatedWork(artwork: Artwork): ArtworkPreviewModel[] {
  return artwork.relatedArtworkIds
    .map((id) => loadArtworkById(id))
    .filter((related): related is Artwork => Boolean(related))
    .slice(0, 3)
    .map(toArtworkPreview);
}

function resolveNeighbors(artwork: Artwork): {
  previous: ArtworkNavigationLink | null;
  next: ArtworkNavigationLink | null;
} {
  const catalog = loadAllArtwork();
  const index = catalog.findIndex((item) => item.id === artwork.id);

  if (index < 0) {
    return { previous: null, next: null };
  }

  const previousArtwork = index > 0 ? catalog[index - 1] : undefined;
  const nextArtwork =
    index < catalog.length - 1 ? catalog[index + 1] : undefined;

  return {
    previous: previousArtwork ? toNavigationLink(previousArtwork) : null,
    next: nextArtwork ? toNavigationLink(nextArtwork) : null,
  };
}

/**
 * Transforms raw Artwork into an immutable detail presentation model.
 * Resolves related work and previous/next navigation centrally.
 */
export function toArtworkDetail(artwork: Artwork): ArtworkDetailModel {
  const neighbors = resolveNeighbors(artwork);
  const collectionSlug = artwork.creative.collectionSlug;

  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    href: `/artwork/${artwork.slug}`,
    summary: artwork.summary,
    overview: artwork.fullDescription ?? artwork.summary,
    narrative: artwork.narrative,
    story: artwork.story ?? {},
    category: artwork.creative.category,
    medium: artwork.creative.medium,
    year: artwork.creative.yearCreated,
    duration: artwork.creative.duration,
    role: artwork.creative.role,
    client: artwork.creative.client,
    software: artwork.technical?.software ?? [],
    dimensions: artwork.technical?.dimensions,
    aspectRatio: artwork.technical?.aspectRatio ?? "4 / 5",
    colorPalette: artwork.technical?.colorPalette ?? [],
    tags: artwork.tags,
    coverSrc: artwork.media.cover,
    coverAlt: resolveArtworkAlt(artwork.title, artwork.summary),
    gallery: resolveSupportingGallery(artwork),
    relatedWork: resolveRelatedWork(artwork),
    previous: neighbors.previous,
    next: neighbors.next,
    collectionHref: collectionSlug
      ? `/collection/${collectionSlug}`
      : "/collection",
    seo: {
      metaTitle: artwork.metadata.seo.metaTitle ?? artwork.title,
      metaDescription:
        artwork.metadata.seo.metaDescription ?? artwork.summary,
      socialImage: artwork.metadata.seo.socialImage ?? artwork.media.cover,
      canonicalPath:
        artwork.metadata.seo.canonicalPath ?? `/artwork/${artwork.slug}`,
    },
  };
}
