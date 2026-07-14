import {
  SectionHeading,
  Timeline,
  TimelineItem,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, TimelineEntry } from "@/types/content";

export interface AboutTimelineProps {
  entries: TimelineEntry[];
  content: AboutPageContent["timeline"];
}

export function AboutTimeline({ entries, content }: AboutTimelineProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="about-timeline-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Journey"
            title={content.headline}
            titleId="about-timeline-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Timeline aria-label="Professional journey">
          {entries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              year={entry.year}
              title={entry.title}
              description={entry.description}
              delay={index * 0.04}
            />
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
