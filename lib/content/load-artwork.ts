import bronzeSignal from "@/content/artwork/bronze-signal.json";
import paperTide from "@/content/artwork/paper-tide.json";
import quietHours from "@/content/artwork/quiet-hours.json";
import type { Artwork } from "@/types/content";

const artworkCatalog: Artwork[] = [
  quietHours as Artwork,
  bronzeSignal as Artwork,
  paperTide as Artwork,
];

function isPublicArtwork(artwork: Artwork): boolean {
  return (
    artwork.metadata.status === "published" &&
    artwork.metadata.visibility === "public"
  );
}

export function loadAllArtwork(): Artwork[] {
  return artworkCatalog.filter(isPublicArtwork);
}

export function loadFeaturedArtwork(): Artwork[] {
  return loadAllArtwork().filter((artwork) => artwork.featured);
}

export function loadArtworkBySlug(slug: string): Artwork | undefined {
  return loadAllArtwork().find((artwork) => artwork.slug === slug);
}

export function loadArtworkById(id: string): Artwork | undefined {
  return loadAllArtwork().find((artwork) => artwork.id === id);
}
