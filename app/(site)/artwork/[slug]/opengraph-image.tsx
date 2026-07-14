import { ImageResponse } from "next/og";
import {
  loadAllArtwork,
  loadArtworkBySlug,
  loadSiteConfiguration,
} from "@/lib/content";
import { OgFrame, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "Artwork preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ArtworkOpenGraphProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return loadAllArtwork().map((artwork) => ({ slug: artwork.slug }));
}

export default async function ArtworkOpenGraphImage({
  params,
}: ArtworkOpenGraphProps) {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);
  const config = loadSiteConfiguration();

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={artwork?.creative.category ?? "Selected Work"}
        eyebrowTrailing={
          artwork?.creative.yearCreated
            ? String(artwork.creative.yearCreated)
            : undefined
        }
        title={artwork?.title ?? "Artwork"}
        footer={config.identity.siteName}
      />
    ),
    { ...size },
  );
}
