import NextLink from "next/link";
import { cn } from "@/design-system/shared";
import type { GalleryCategory } from "@/lib/content";

export interface GalleryFilterProps {
  categories: GalleryCategory[];
  activeCategory?: string;
  resultCount: number;
}

export function GalleryFilter({
  categories,
  activeCategory,
  resultCount,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Filter collection by category">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterChip
              href="/collection"
              label="All"
              active={!activeCategory}
            />
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <FilterChip
                href={`/collection?category=${category.slug}`}
                label={category.label}
                active={activeCategory === category.slug}
              />
            </li>
          ))}
        </ul>
      </nav>

      <p
        className="font-sans text-caption text-text-muted"
        aria-live="polite"
      >
        Showing{" "}
        <span className="tabular-nums text-text-secondary">{resultCount}</span>{" "}
        {resultCount === 1 ? "work" : "works"}
        {activeCategory
          ? ` in ${categories.find((item) => item.slug === activeCategory)?.label ?? "this category"}`
          : ""}
      </p>
    </div>
  );
}

interface FilterChipProps {
  href: string;
  label: string;
  active: boolean;
}

function FilterChip({ href, label, active }: FilterChipProps) {
  return (
    <NextLink
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex items-center rounded-md px-4 py-2 text-caption font-medium",
        "border transition-colors duration-small ease-standard",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        active
          ? "border-accent-primary bg-accent-primary text-button-primary-foreground"
          : "border-border-default bg-transparent text-text-secondary hover:border-border-default hover:text-text-primary hover:bg-surface-secondary",
      )}
    >
      {label}
    </NextLink>
  );
}
