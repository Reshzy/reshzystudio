import {
  SectionHeading,
  Timeline,
  TimelineItem,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import { staggerDelay } from "@/lib/animation";
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
    <Section
      aria-labelledby="about-timeline-heading"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title={content.headline}
            titleId="about-timeline-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Timeline aria-label="Career timeline">
          {entries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              year={entry.year}
              title={entry.title}
              description={entry.description}
              delay={staggerDelay(index, "default")}
            />
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
