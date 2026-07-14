import { SectionHeading, StatCard } from "@/design-system/composites";
import { Grid, Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent, ProfileStat } from "@/types/content";

export interface AboutHighlightsProps {
  highlights: ProfileStat[];
  content: AboutPageContent["highlights"];
}

export function AboutHighlights({
  highlights,
  content,
}: AboutHighlightsProps) {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="about-highlights-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Highlights"
            title={content.headline}
            titleId="about-highlights-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Grid as="ul" columns={4} gap="lg">
          {highlights.map((stat, index) => (
            <li key={stat.id}>
              <Reveal delay={index * 0.05}>
                <StatCard value={stat.value} label={stat.label} />
              </Reveal>
            </li>
          ))}
        </Grid>
      </div>
    </Section>
  );
}
