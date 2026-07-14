import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface SkillCardProps {
  label: string;
  description: string;
  className?: string;
}

export function SkillCard({ label, description, className }: SkillCardProps) {
  return (
    <article className={cn("flex h-full flex-col gap-3", className)}>
      <Text variant="subheading" as="h3">
        {label}
      </Text>
      <Text variant="body" as="p" className="text-text-secondary">
        {description}
      </Text>
    </article>
  );
}
