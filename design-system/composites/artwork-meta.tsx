import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface ArtworkMetaProps {
  category: string;
  year: number;
  className?: string;
}

export function ArtworkMeta({ category, year, className }: ArtworkMetaProps) {
  return (
    <Text
      variant="metadata"
      as="p"
      tabular
      className={cn(className)}
    >
      {category} · {year}
    </Text>
  );
}
