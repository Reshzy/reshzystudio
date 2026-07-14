import type { Metadata } from "next";
import { ArtworkTeaser } from "@/design-system/composites";
import { Section, Text } from "@/design-system/primitives";
import {
  loadAllArtwork,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/artwork",
  overrides: {
    title: "Artwork",
    description:
      "Selected artwork from the studio — digital illustration, posters, and graphic design.",
  },
});

export default function ArtworkIndexPage() {
  const artworks = loadAllArtwork().map(toArtworkPreview);

  return (
    <Section>
      <div className="flex flex-col gap-12 md:gap-16">
        <div className="flex max-w-xl flex-col gap-3">
          <Text variant="metadata" as="p">
            Archive
          </Text>
          <Text variant="heading" as="h1">
            Artwork
          </Text>
          <Text variant="body" as="p" className="text-text-secondary">
            Selected pieces from the current exhibition.
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
