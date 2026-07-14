import { ImageResponse } from "next/og";
import {
  loadAllCollections,
  loadCollectionBySlug,
  loadSiteConfiguration,
} from "@/lib/content";
import { OgFrame, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "Collection preview";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

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

  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Collection"
        title={collection?.title ?? "Collection"}
        titleSize={72}
        description={
          collection?.description ??
          "A curated sequence from the exhibition."
        }
        footer={config.identity.siteName}
      />
    ),
    { ...size },
  );
}
