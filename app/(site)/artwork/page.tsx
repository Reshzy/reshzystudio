import type { Metadata } from "next";
import {
  ArtworkCard,
  ArtworkGrid,
  ArtworkGridItem,
  EmptyState,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
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
    <Section aria-labelledby="artwork-index-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Archive"
            title="Artwork"
            titleId="artwork-index-heading"
            titleAs="h1"
            supporting="Selected pieces from the current exhibition."
          />
        </Reveal>

        {artworks.length === 0 ? (
          <EmptyState
            title="No artwork on view"
            description="The archive will fill as work is published to the exhibition."
            action={{ label: "Explore Collection", href: "/collection" }}
          />
        ) : (
          <ArtworkGrid>
            {artworks.map((artwork, index) => (
              <ArtworkGridItem key={artwork.id}>
                <Reveal delay={Math.min(index * 0.04, 0.24)}>
                  <ArtworkCard
                    artwork={artwork}
                    variant="standard"
                    priority={index < 3}
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
