import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArtworkCard,
  ArtworkGrid,
  ArtworkGridItem,
  EmptyState,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import {
  loadAllCollections,
  loadArtworkById,
  loadCollectionBySlug,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import {
  buildCollectionStructuredData,
  buildSiteMetadata,
  JsonLd,
} from "@/lib/metadata";

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
  const path =
    collection.metadata.seo.canonicalPath ?? `/collection/${collection.slug}`;

  return buildSiteMetadata(siteConfig, {
    path,
    overrides: {
      title: collection.metadata.seo.metaTitle ?? collection.title,
      description:
        collection.metadata.seo.metaDescription ?? collection.description,
      openGraphImage: collection.coverImage,
      keywords: [
        ...siteConfig.seo.defaultKeywords,
        collection.title,
        "Collection",
      ],
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

  const siteConfig = loadSiteConfiguration();
  const artworks = collection.featuredArtworkIds
    .map((id) => loadArtworkById(id))
    .filter((artwork): artwork is NonNullable<typeof artwork> =>
      Boolean(artwork),
    )
    .map(toArtworkPreview);

  const structuredData = buildCollectionStructuredData(
    collection,
    siteConfig,
    artworks.map((artwork) => ({
      name: artwork.title,
      path: artwork.href,
    })),
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <Section
        as="header"
        aria-labelledby="collection-detail-heading"
        className="pb-8 md:pb-12 lg:pb-16"
      >
        <div className="flex flex-col gap-12 md:gap-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              <SectionHeading
                eyebrow="Collection"
                title={collection.title}
                titleId="collection-detail-heading"
                titleAs="h1"
                supporting={collection.description}
              />
              <Text variant="metadata" as="p" tabular>
                {artworks.length}{" "}
                {artworks.length === 1 ? "work" : "works"} in this sequence
              </Text>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        aria-label="Works in this collection"
        className="pt-0 md:pt-0 lg:pt-0"
      >
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
      </Section>
    </>
  );
}
