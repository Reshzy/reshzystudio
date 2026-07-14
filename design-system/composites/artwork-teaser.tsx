import Image from "next/image";
import NextLink from "next/link";
import { Text } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import type { ArtworkPreviewModel } from "@/lib/content";

export interface ArtworkTeaserProps {
  artwork: ArtworkPreviewModel;
  priority?: boolean;
  className?: string;
}

export function ArtworkTeaser({
  artwork,
  priority = false,
  className,
}: ArtworkTeaserProps) {
  return (
    <NextLink
      href={artwork.href}
      className={cn(
        "group relative block outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring",
        className,
      )}
    >
      <figure className="flex flex-col gap-4">
        <div
          className="relative overflow-hidden bg-surface-secondary"
          style={{ aspectRatio: artwork.aspectRatio }}
        >
          <Image
            src={artwork.coverSrc}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            variant="subheading"
            as="h3"
            className="text-text-primary transition-colors duration-small ease-standard group-hover:text-accent-primary"
          >
            {artwork.title}
          </Text>
          <Text variant="metadata" as="p" tabular>
            {artwork.category} · {artwork.year}
          </Text>
        </figcaption>
      </figure>
    </NextLink>
  );
}
