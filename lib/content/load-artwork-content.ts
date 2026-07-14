import artworkContent from "@/content/site/artwork.json";
import type { ArtworkPageContent } from "@/types/content";

export function loadArtworkContent(): ArtworkPageContent {
  return artworkContent as ArtworkPageContent;
}
