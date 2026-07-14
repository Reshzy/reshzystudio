import Image from "next/image";
import NextLink from "next/link";
import { ArtworkMeta } from "./artwork-meta";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";
import type { ArtworkPreviewModel } from "@/lib/content";

export type ArtworkCardVariant = "standard" | "featured" | "compact";

export interface ArtworkCardProps {
  artwork: ArtworkPreviewModel;
  variant?: ArtworkCardVariant;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}

const sizeStyles: Record<ArtworkCardVariant, string> = {
  standard: "gap-4",
  featured: "gap-5 md:gap-6",
  compact: "gap-3",
};

const titleVariant: Record<
  ArtworkCardVariant,
  "subheading" | "heading"
> = {
  standard: "subheading",
  featured: "heading",
  compact: "subheading",
};

const imageSizes: Record<ArtworkCardVariant, string> = {
  standard: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  featured: "(max-width: 1024px) 100vw, 66vw",
  compact: "(max-width: 768px) 50vw, 25vw",
};

export function ArtworkCard({
  artwork,
  variant = "standard",
  priority = false,
  headingLevel = "h3",
  className,
}: ArtworkCardProps) {
  return (
    <NextLink
      href={artwork.href}
      className={cn(
        "group relative block outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
        className,
      )}
    >
      <figure className={cn("flex flex-col", sizeStyles[variant])}>
        <div
          className="relative overflow-hidden bg-surface-secondary"
          style={{ aspectRatio: artwork.aspectRatio }}
        >
          <Image
            src={artwork.coverSrc}
            alt={artwork.title}
            fill
            sizes={imageSizes[variant]}
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-large ease-standard",
              "motion-safe:group-hover:scale-[1.02]",
            )}
            unoptimized={artwork.coverSrc.endsWith(".svg")}
          />
        </div>
        <figcaption className="flex flex-col gap-1">
          <Text
            variant={titleVariant[variant]}
            as={headingLevel}
            className={cn(
              "text-text-primary transition-colors duration-small ease-standard",
              "group-hover:text-accent-primary",
              variant === "compact" && "text-subheading",
            )}
          >
            {artwork.title}
          </Text>
          <ArtworkMeta category={artwork.category} year={artwork.year} />
          {variant === "featured" ? (
            <Text
              variant="body"
              as="p"
              className="mt-2 max-w-prose text-text-secondary"
            >
              {artwork.summary}
            </Text>
          ) : null}
        </figcaption>
      </figure>
    </NextLink>
  );
}
