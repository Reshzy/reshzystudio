import {
  EducationCard,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, EducationEntry } from "@/types/content";

export interface AboutEducationProps {
  entries: EducationEntry[];
  content: AboutPageContent["education"];
}

export function AboutEducation({ entries, content }: AboutEducationProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="about-education-heading" width="prose">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title={content.headline}
            titleId="about-education-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="flex flex-col border-t border-border-subtle">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className="border-b border-border-subtle py-8"
            >
              <Reveal delay={index * 0.04}>
                <EducationCard
                  credential={entry.credential}
                  institution={entry.institution}
                  period={entry.period}
                  description={entry.description}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
