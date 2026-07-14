import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ButtonLink,
  Container,
  Section,
  Text,
} from "@/design-system/primitives";
import {
  loadAllArtwork,
  loadArtworkBySlug,
  loadSiteConfiguration,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

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

  return buildSiteMetadata(siteConfig, {
    path: `/artwork/${artwork.slug}`,
    overrides: {
      title: artwork.metadata.seo.metaTitle ?? artwork.title,
      description:
        artwork.metadata.seo.metaDescription ?? artwork.summary,
      openGraphImage: artwork.metadata.seo.socialImage ?? artwork.media.cover,
    },
  });
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Section className="pt-8 md:pt-12">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden bg-surface-secondary"
              style={{
                aspectRatio: artwork.technical?.aspectRatio ?? "4 / 5",
              }}
            >
              <Image
                src={artwork.media.cover}
                alt={artwork.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
                unoptimized={artwork.media.cover.endsWith(".svg")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-8">
            <Text variant="metadata" as="p" tabular>
              {artwork.creative.category} · {artwork.creative.yearCreated}
            </Text>
            <Text variant="heading" as="h1">
              {artwork.title}
            </Text>
            <Text variant="body" as="p" className="text-text-secondary">
              {artwork.summary}
            </Text>
            {artwork.fullDescription ? (
              <Text variant="body" as="p" className="text-text-secondary">
                {artwork.fullDescription}
              </Text>
            ) : null}
            <div className="pt-4">
              <ButtonLink href="/collection" variant="secondary">
                Explore Collection
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Container className="pb-16 md:pb-24">
        <ButtonLink href="/artwork" variant="ghost">
          View Artwork
        </ButtonLink>
      </Container>
    </div>
  );
}
