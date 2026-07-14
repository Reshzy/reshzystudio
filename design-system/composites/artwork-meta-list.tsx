import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface ArtworkMetaItem {
  label: string;
  value: string;
}

export interface ArtworkMetaListProps {
  items: ArtworkMetaItem[];
  className?: string;
  "aria-label"?: string;
}

export function ArtworkMetaList({
  items,
  className,
  "aria-label": ariaLabel = "Artwork details",
}: ArtworkMetaListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <dl
      aria-label={ariaLabel}
      className={cn(
        "flex flex-col gap-5 border-t border-border-subtle pt-6",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <Text variant="metadata" as="dt">
            {item.label}
          </Text>
          <Text variant="body" as="dd" className="text-text-primary">
            {item.value}
          </Text>
        </div>
      ))}
    </dl>
  );
}
