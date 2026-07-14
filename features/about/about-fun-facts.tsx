import { SectionHeading } from "@/design-system/composites";
import { Reveal, Section, Text } from "@/design-system/primitives";
import type { AboutPageContent, FunFactEntry } from "@/types/content";

export interface AboutFunFactsProps {
  facts: FunFactEntry[];
  content: AboutPageContent["funFacts"];
}

export function AboutFunFacts({ facts, content }: AboutFunFactsProps) {
  if (facts.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-fun-facts-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Notes"
            title={content.headline}
            titleId="about-fun-facts-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="grid gap-0 border-t border-border-subtle sm:grid-cols-2">
          {facts.map((fact, index) => (
            <li
              key={fact.id}
              className="border-b border-border-subtle py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
            >
              <Reveal delay={index * 0.04}>
                <article className="flex flex-col gap-2">
                  <Text variant="subheading" as="h3">
                    {fact.label}
                  </Text>
                  <Text variant="body" as="p" className="text-text-secondary">
                    {fact.detail}
                  </Text>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
