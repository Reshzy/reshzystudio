import { SectionHeading, ValueCard } from "@/design-system/composites";
import { Grid, Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, ValueEntry } from "@/types/content";

export interface AboutValuesProps {
  values: ValueEntry[];
  content: AboutPageContent["values"];
}

export function AboutValues({ values, content }: AboutValuesProps) {
  if (values.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-values-heading"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Values"
            title={content.headline}
            titleId="about-values-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Grid as="ul" columns={2} gap="lg">
          {values.map((value, index) => (
            <li key={value.id}>
              <Reveal delay={index * 0.04}>
                <ValueCard
                  title={value.title}
                  description={value.description}
                />
              </Reveal>
            </li>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
