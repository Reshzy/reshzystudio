import { SectionHeading } from "@/design-system/composites";
import { Grid, Reveal, Section, Text } from "@/design-system/primitives";
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
    <Section aria-labelledby="about-fun-facts-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Notes"
            title={content.headline}
            titleId="about-fun-facts-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Grid as="ul" columns={2} gap="lg">
          {facts.map((fact, index) => (
            <li key={fact.id}>
              <Reveal delay={index * 0.04}>
                <article className="flex flex-col gap-2 border-t border-border-subtle pt-6">
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
        </Grid>
      </div>
    </Section>
  );
}
