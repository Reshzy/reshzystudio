import { ImageResponse } from "next/og";
import {
  loadAllArtwork,
  loadArtworkBySlug,
  loadSiteConfiguration,
} from "@/lib/content";

export const alt = "Artwork preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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

  const title = artwork?.title ?? "Artwork";
  const category = artwork?.creative.category ?? "Selected Work";
  const year = artwork?.creative.yearCreated
    ? String(artwork.creative.yearCreated)
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0a09",
          color: "#fafaf9",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#a8a29e",
          }}
        >
          <span>{category}</span>
          <span>{year}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#d6d3d1",
            }}
          >
            {config.identity.siteName}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
