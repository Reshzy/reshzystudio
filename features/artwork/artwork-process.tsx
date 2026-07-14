import {
  ProcessTimeline,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";
import type { ArtworkPageContent } from "@/types/content";

export interface ArtworkProcessProps {
  artwork: ArtworkDetailModel;
  content: ArtworkPageContent["process"];
}

export function ArtworkProcess({ artwork, content }: ArtworkProcessProps) {
  const steps = artwork.story.processSteps ?? [];

  if (steps.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="artwork-process-heading" width="prose">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Craft"
            title={content.headline}
            titleId="artwork-process-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ProcessTimeline steps={steps} />
      </div>
    </Section>
  );
}
