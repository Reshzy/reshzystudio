import {
  ExperienceCard,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, ExperienceEntry } from "@/types/content";

export interface AboutExperienceProps {
  entries: ExperienceEntry[];
  content: AboutPageContent["experience"];
}

export function AboutExperience({ entries, content }: AboutExperienceProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-experience-heading"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Practice"
            title={content.headline}
            titleId="about-experience-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="flex flex-col border-t border-border-subtle">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className="border-b border-border-subtle py-8 md:py-10"
            >
              <Reveal delay={index * 0.04}>
                <ExperienceCard
                  role={entry.role}
                  organization={entry.organization}
                  period={entry.period}
                  summary={entry.summary}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
