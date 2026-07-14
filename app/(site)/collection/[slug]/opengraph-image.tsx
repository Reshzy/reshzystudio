import { ImageResponse } from "next/og";
import {
  loadAllCollections,
  loadCollectionBySlug,
  loadSiteConfiguration,
} from "@/lib/content";

export const alt = "Collection preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface CollectionOpenGraphProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return loadAllCollections().map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionOpenGraphImage({
  params,
}: CollectionOpenGraphProps) {
  const { slug } = await params;
  const collection = loadCollectionBySlug(slug);
  const config = loadSiteConfiguration();

  const title = collection?.title ?? "Collection";
  const description =
    collection?.description ?? "A curated sequence from the exhibition.";

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
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#a8a29e",
          }}
        >
          Collection
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
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
              maxWidth: 860,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#d6d3d1",
            }}
          >
            {description}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 24,
              color: "#a8a29e",
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
