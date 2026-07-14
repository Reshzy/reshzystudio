import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkTeaser } from "@/design-system/composites";
import { Section, Text } from "@/design-system/primitives";
import {
  loadAllArtwork,
  loadAllCollections,
  loadCollectionBySlug,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return loadAllCollections().map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = loadCollectionBySlug(slug);

  if (!collection) {
    return {};
  }

  const siteConfig = loadSiteConfiguration();

  return buildSiteMetadata(siteConfig, {
    path: `/collection/${collection.slug}`,
    overrides: {
      title: collection.metadata.seo.metaTitle ?? collection.title,
      description:
        collection.metadata.seo.metaDescription ?? collection.description,
    },
  });
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = loadCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const artworks = loadAllArtwork()
    .filter((artwork) => collection.featuredArtworkIds.includes(artwork.id))
    .map(toArtworkPreview);

  return (
    <Section>
      <div className="flex flex-col gap-12 md:gap-16">
        <div className="flex max-w-xl flex-col gap-3">
          <Text variant="metadata" as="p">
            Collection
          </Text>
          <Text variant="heading" as="h1">
            {collection.title}
          </Text>
          <Text variant="body" as="p" className="text-text-secondary">
            {collection.description}
          </Text>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <ArtworkTeaser key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </Section>
  );
}
