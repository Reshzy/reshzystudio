import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArtworkCard,
  ArtworkGrid,
  ArtworkGridItem,
  EmptyState,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import {
  loadAllCollections,
  loadArtworkById,
  loadCollectionBySlug,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return loadAllCollections().map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionDetailPageProps): Promise<Metadata> {
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
}: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = loadCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const artworks = collection.featuredArtworkIds
    .map((id) => loadArtworkById(id))
    .filter((artwork): artwork is NonNullable<typeof artwork> =>
      Boolean(artwork),
    )
    .map(toArtworkPreview);

  return (
    <Section aria-labelledby="collection-detail-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Collection"
            title={collection.title}
            titleId="collection-detail-heading"
            titleAs="h1"
            supporting={collection.description}
          />
        </Reveal>

        {artworks.length === 0 ? (
          <EmptyState
            title="No work in this collection"
            description="Pieces will appear here as they are curated into the sequence."
            action={{ label: "Back to Collection", href: "/collection" }}
          />
        ) : (
          <ArtworkGrid>
            {artworks.map((artwork, index) => (
              <ArtworkGridItem key={artwork.id}>
                <Reveal delay={Math.min(index * 0.04, 0.24)}>
                  <ArtworkCard
                    artwork={artwork}
                    variant="standard"
                    priority={index < 2}
                  />
                </Reveal>
              </ArtworkGridItem>
            ))}
          </ArtworkGrid>
        )}
      </div>
    </Section>
  );
}
