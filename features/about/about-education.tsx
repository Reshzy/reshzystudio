import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
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

        <ul className="flex flex-col gap-0 border-t border-border-subtle">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className="border-b border-border-subtle py-8"
            >
              <Reveal delay={index * 0.04}>
                <div className="flex flex-col gap-3">
                  <Text variant="metadata" as="p" tabular>
                    {entry.period}
                  </Text>
                  <Text variant="subheading" as="h3">
                    {entry.credential}
                  </Text>
                  <Text variant="body" as="p" className="text-text-primary">
                    {entry.institution}
                  </Text>
                  {entry.description ? (
                    <Text
                      variant="body"
                      as="p"
                      className="text-text-secondary"
                    >
                      {entry.description}
                    </Text>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
