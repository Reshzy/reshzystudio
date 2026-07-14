import { NavigationCard } from "@/design-system/composites";
import {
  ButtonLink,
  Reveal,
  Section,
  Text,
} from "@/design-system/primitives";
import type { ArtworkDetailModel } from "@/lib/content";

export interface ArtworkNavigationProps {
  artwork: ArtworkDetailModel;
}

export function ArtworkNavigation({ artwork }: ArtworkNavigationProps) {
  const hasNeighbors = Boolean(artwork.previous || artwork.next);

  return (
    <Section
      aria-labelledby="artwork-navigation-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-10">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <Text variant="metadata" as="p">
                Navigation
              </Text>
              <Text
                variant="heading"
                as="h2"
                id="artwork-navigation-heading"
              >
                Continue through the collection
              </Text>
            </div>
            <ButtonLink href={artwork.collectionHref} variant="secondary">
              Back to Collection
            </ButtonLink>
          </div>
        </Reveal>

        {hasNeighbors ? (
          <Reveal delay={0.06}>
            <nav
              aria-label="Previous and next artwork"
              className="grid gap-8 border-t border-border-subtle pt-8 md:grid-cols-2 md:gap-12"
            >
              {artwork.previous ? (
                <NavigationCard
                  href={artwork.previous.href}
                  direction="previous"
                  title={artwork.previous.title}
                  category={artwork.previous.category}
                  year={artwork.previous.year}
                  coverSrc={artwork.previous.coverSrc}
                />
              ) : (
                <div />
              )}
              {artwork.next ? (
                <NavigationCard
                  href={artwork.next.href}
                  direction="next"
                  title={artwork.next.title}
                  category={artwork.next.category}
                  year={artwork.next.year}
                  coverSrc={artwork.next.coverSrc}
                />
              ) : null}
            </nav>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
