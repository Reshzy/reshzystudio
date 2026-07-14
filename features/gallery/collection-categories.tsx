import NextLink from "next/link";
import {
  CategoryBadge,
  SectionHeading,
} from "@/design-system/composites";
import { Reveal, Section } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import type { GalleryCategory } from "@/lib/content";
import type { CollectionPageContent } from "@/types/content";

export interface CollectionCategoriesProps {
  categories: GalleryCategory[];
  content: CollectionPageContent["categories"];
  activeCategory?: string;
}

export function CollectionCategories({
  categories,
  content,
  activeCategory,
}: CollectionCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="collection-categories-heading"
      className="border-y border-border-subtle bg-surface-primary"
    >
      <div className="flex flex-col gap-12 md:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Categories"
            title={content.headline}
            titleId="collection-categories-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <ul className="grid gap-0 border-t border-border-subtle md:grid-cols-2">
          {categories.map((category, index) => {
            const isActive = activeCategory === category.slug;

            return (
              <li
                key={category.slug}
                className={cn(
                  "border-b border-border-subtle",
                  index % 2 === 0 && "md:border-r",
                )}
              >
                <Reveal delay={index * 0.04}>
                  <NextLink
                    href={`/collection?category=${category.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex h-full flex-col gap-4 px-0 py-8 md:px-8 md:py-10",
                      "transition-colors duration-small ease-standard",
                      "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus-ring",
                      index % 2 === 0 && "md:pl-0",
                      index % 2 === 1 && "md:pr-0",
                      isActive && "bg-surface-secondary/40",
                    )}
                  >
                    <CategoryBadge
                      label={category.label}
                      count={category.count}
                    />
                    <span
                      className={cn(
                        "font-sans text-subheading text-text-primary",
                        "transition-colors duration-small ease-standard",
                        "group-hover:text-accent-primary",
                      )}
                    >
                      View {category.label}
                    </span>
                  </NextLink>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
