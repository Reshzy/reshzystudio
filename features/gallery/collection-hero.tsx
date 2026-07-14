import { HeroEntrance, Reveal, Section, Text } from "@/design-system/primitives";
import { staggerDelay } from "@/lib/animation";
import type { CollectionPageContent } from "@/types/content";

export interface CollectionHeroProps {
  content: CollectionPageContent["hero"];
  totalCount: number;
}

export function CollectionHero({ content, totalCount }: CollectionHeroProps) {
  return (
    <Section
      as="header"
      aria-labelledby="collection-hero-heading"
      className="pb-8 md:pb-12 lg:pb-16"
    >
      <div className="flex flex-col gap-8">
        <Reveal>
          <Text variant="metadata" as="p">
            Collection
          </Text>
        </Reveal>

        <HeroEntrance delay={staggerDelay(1, "relaxed")}>
          <Text
            variant="display"
            as="h1"
            id="collection-hero-heading"
            className="max-w-3xl text-text-primary"
          >
            {content.headline}
          </Text>
        </HeroEntrance>

        <Reveal delay={staggerDelay(2, "relaxed")}>
          <div className="flex max-w-xl flex-col gap-4">
            {content.supporting ? (
              <Text variant="body" as="p" className="text-text-secondary">
                {content.supporting}
              </Text>
            ) : null}
            <Text variant="metadata" as="p" tabular>
              {totalCount} {totalCount === 1 ? "work" : "works"} on view
            </Text>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
