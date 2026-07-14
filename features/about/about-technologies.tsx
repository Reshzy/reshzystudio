import { SectionHeading, TechBadge } from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { AboutPageContent } from "@/types/content";

export interface AboutTechnologiesProps {
  tools: string[];
  content: AboutPageContent["technologies"];
}

export function AboutTechnologies({
  tools,
  content,
}: AboutTechnologiesProps) {
  if (tools.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="about-technologies-heading"
      width="prose"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Studio"
            title={content.headline}
            titleId="about-technologies-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul
            className="flex flex-wrap gap-3"
            aria-label="Tools and technologies"
          >
            {tools.map((tool) => (
              <li key={tool}>
                <TechBadge label={tool} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
