import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-2 border-t border-border-subtle pt-6",
        className,
      )}
    >
      <Text
        variant="heading"
        as="p"
        tabular
        className="text-text-primary"
      >
        {value}
      </Text>
      <Text variant="caption" as="p">
        {label}
      </Text>
    </article>
  );
}
