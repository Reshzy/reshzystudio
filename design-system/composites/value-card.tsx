import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface ValueCardProps {
  title: string;
  description: string;
  className?: string;
}

export function ValueCard({ title, description, className }: ValueCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 border-t border-border-subtle pt-6",
        className,
      )}
    >
      <Text variant="subheading" as="h3">
        {title}
      </Text>
      <Text variant="body" as="p" className="text-text-secondary">
        {description}
      </Text>
    </article>
  );
}
