import {
  ArtworkCard,
  ArtworkGrid,
  ArtworkGridItem,
  EmptyState,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import { GalleryFilter } from "./gallery-filter";
import type {
  ArtworkPreviewModel,
  GalleryCategory,
} from "@/lib/content";
import type { CollectionPageContent } from "@/types/content";

export interface CollectionArchiveProps {
  artworks: ArtworkPreviewModel[];
  categories: GalleryCategory[];
  content: CollectionPageContent["archive"];
  activeCategory?: string;
}

export function CollectionArchive({
  artworks,
  categories,
  content,
  activeCategory,
}: CollectionArchiveProps) {
  const activeLabel = categories.find(
    (category) => category.slug === activeCategory,
  )?.label;

  return (
    <Section aria-labelledby="collection-archive-heading">
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Archive"
            title={content.headline}
            titleId="collection-archive-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.04}>
          <GalleryFilter
            categories={categories}
            activeCategory={activeCategory}
            resultCount={artworks.length}
          />
        </Reveal>

        {artworks.length === 0 ? (
          <EmptyState
            title="No work in this category"
            description={
              activeLabel
                ? `Nothing is currently on view under ${activeLabel}. Choose another category or view the full archive.`
                : "The archive is empty for this selection."
            }
            action={{ label: "View all work", href: "/collection" }}
          />
        ) : (
          <ArtworkGrid>
            {artworks.map((artwork, index) => (
              <ArtworkGridItem key={artwork.id}>
                <Reveal delay={Math.min(index * 0.04, 0.24)}>
                  <ArtworkCard
                    artwork={artwork}
                    variant="standard"
                    priority={index < 3}
                    headingLevel="h3"
                  />
                </Reveal>
              </ArtworkGridItem>
            ))}
          </ArtworkGrid>
        )}
      </div>
    </Section>
  );
}
