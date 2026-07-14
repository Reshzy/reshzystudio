import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkOverviewProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["overview"];
}

export function ArtworkOverview({ artwork, content }: ArtworkOverviewProps) {
  return (
    <Section
      aria-labelledby="artwork-overview-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <Reveal>
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Overview"
            title={content.headline}
            titleId="artwork-overview-heading"
            supporting={content.supporting}
          />
          <Text
            variant="body"
            as="p"
            className="max-w-prose text-text-secondary"
          >
            {artwork.overview}
          </Text>
          {artwork.narrative ? (
            <Text
              variant="body"
              as="p"
              className="max-w-prose text-text-secondary"
            >
              {artwork.narrative}
            </Text>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
