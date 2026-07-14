import type { Metadata } from "next";
import { ArtworkTeaser } from "@/design-system/composites";
import { Section, Text } from "@/design-system/primitives";
import {
  loadAllArtwork,
  loadAllCollections,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/collection",
  overrides: {
    title: "Collection",
    description:
      "A curated collection of digital illustration, graphic design, and creative work.",
  },
});

export default function CollectionPage() {
  const collections = loadAllCollections();
  const primary = collections[0];
  const artworks = loadAllArtwork().map(toArtworkPreview);

  return (
    <Section>
      <div className="flex flex-col gap-12 md:gap-16">
        <div className="flex max-w-xl flex-col gap-3">
          <Text variant="metadata" as="p">
            Collection
          </Text>
          <Text variant="heading" as="h1">
            {primary?.title ?? "Collection"}
          </Text>
          <Text variant="body" as="p" className="text-text-secondary">
            {primary?.description ??
              "A curated exhibition of selected creative work."}
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
