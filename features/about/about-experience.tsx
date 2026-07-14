import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
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
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-3">
                    <Text variant="metadata" as="p" tabular>
                      {entry.period}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-9">
                    <Text variant="subheading" as="h3">
                      {entry.role}
                    </Text>
                    <Text variant="body" as="p" className="text-text-primary">
                      {entry.organization}
                    </Text>
                    <Text
                      variant="body"
                      as="p"
                      className="max-w-prose text-text-secondary"
                    >
                      {entry.summary}
                    </Text>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
