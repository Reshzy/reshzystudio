import type { ArtworkPreviewModel } from "./to-artwork-preview";

export interface GalleryCategory {
  label: string;
  slug: string;
  count: number;
}

export interface GalleryTechnology {
  label: string;
  count: number;
}

/** v1 categories from information architecture — only expose those with works. */
export const CURATED_CATEGORY_ORDER = [
  "Digital Illustration",
  "Graphic Design",
  "Poster Design",
  "Anime",
] as const;

export function collectGalleryCategories(
  artworks: ArtworkPreviewModel[],
): GalleryCategory[] {
  const counts = new Map<string, GalleryCategory>();

  for (const artwork of artworks) {
    const existing = counts.get(artwork.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(artwork.categorySlug, {
        label: artwork.category,
        slug: artwork.categorySlug,
        count: 1,
      });
    }
  }

  return CURATED_CATEGORY_ORDER.map((label) => {
    const slug = label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return counts.get(slug);
  }).filter((category): category is GalleryCategory => Boolean(category));
}

export function collectGalleryTechnologies(
  artworks: ArtworkPreviewModel[],
): GalleryTechnology[] {
  const counts = new Map<string, number>();

  for (const artwork of artworks) {
    for (const tool of artwork.software) {
      counts.set(tool, (counts.get(tool) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function filterArtworkByCategory(
  artworks: ArtworkPreviewModel[],
  categorySlug?: string | null,
): ArtworkPreviewModel[] {
  if (!categorySlug) {
    return artworks;
  }

  return artworks.filter((artwork) => artwork.categorySlug === categorySlug);
}

export function resolveCategoryParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();
  return normalized.length > 0 ? normalized : undefined;
}
