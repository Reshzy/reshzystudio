import {
  ArtworkCard,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { ArtworkPreviewModel } from "@/lib/content";
import type { CollectionPageContent } from "@/types/content";

export interface CollectionFeaturedProps {
  artworks: ArtworkPreviewModel[];
  content: CollectionPageContent["featured"];
}

export function CollectionFeatured({
  artworks,
  content,
}: CollectionFeaturedProps) {
  if (artworks.length === 0) {
    return null;
  }

  const [primary, ...rest] = artworks;

  return (
    <Section aria-labelledby="collection-featured-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title={content.headline}
            titleId="collection-featured-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {primary ? (
            <Reveal className="md:col-span-7" delay={0.04}>
              <ArtworkCard
                artwork={primary}
                variant="featured"
                priority
                headingLevel="h3"
              />
            </Reveal>
          ) : null}

          {rest.length > 0 ? (
            <div className="flex flex-col gap-10 md:col-span-5 md:gap-8 md:pt-16">
              {rest.map((artwork, index) => (
                <Reveal key={artwork.id} delay={0.08 + index * 0.06}>
                  <ArtworkCard
                    artwork={artwork}
                    variant="compact"
                    headingLevel="h3"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
