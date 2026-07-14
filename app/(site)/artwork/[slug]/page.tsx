import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkExperience } from "@/features/artwork";
import {
  loadAllArtwork,
  loadArtworkBySlug,
  loadArtworkContent,
  loadSiteConfiguration,
  toArtworkDetail,
} from "@/lib/content";
import {
  buildArtworkStructuredData,
  buildSiteMetadata,
  serializeJsonLd,
} from "@/lib/metadata";

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return loadAllArtwork().map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);

  if (!artwork) {
    return {};
  }

  const siteConfig = loadSiteConfiguration();
  const detail = toArtworkDetail(artwork);

  return buildSiteMetadata(siteConfig, {
    path: detail.seo.canonicalPath,
    overrides: {
      title: detail.seo.metaTitle,
      description: detail.seo.metaDescription,
      openGraphImage: detail.seo.socialImage,
    },
  });
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const siteConfig = loadSiteConfiguration();
  const content = loadArtworkContent();
  const detail = toArtworkDetail(artwork);
  const structuredData = buildArtworkStructuredData(artwork, siteConfig);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />
      <ArtworkExperience artwork={detail} content={content} />
    </>
  );
}
