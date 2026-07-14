import {
  SectionHeading,
  TechBadge,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import type { GalleryTechnology } from "@/lib/content";
import type { CollectionPageContent } from "@/types/content";

export interface CollectionTechnologiesProps {
  technologies: GalleryTechnology[];
  content: CollectionPageContent["technologies"];
}

export function CollectionTechnologies({
  technologies,
  content,
}: CollectionTechnologiesProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="collection-technologies-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Tools"
            title={content.headline}
            titleId="collection-technologies-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="flex flex-wrap gap-3" aria-label="Exhibition tools">
            {technologies.map((technology) => (
              <li key={technology.label}>
                <TechBadge label={technology.label} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
