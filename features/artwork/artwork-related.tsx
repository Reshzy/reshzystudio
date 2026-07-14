import {
  ArtworkCard,
  ArtworkGrid,
  ArtworkGridItem,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkRelatedProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["related"];
}

export function ArtworkRelated({ artwork, content }: ArtworkRelatedProps) {
  if (artwork.relatedWork.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="artwork-related-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Continue exploring"
            title={content.headline}
            titleId="artwork-related-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ArtworkGrid columns={3}>
          {artwork.relatedWork.map((related, index) => (
            <ArtworkGridItem key={related.id}>
              <Reveal delay={Math.min(index * 0.04, 0.12)}>
                <ArtworkCard
                  artwork={related}
                  variant="compact"
                  headingLevel="h3"
                />
              </Reveal>
            </ArtworkGridItem>
          ))}
        </ArtworkGrid>
      </div>
    </Section>
  );
}
