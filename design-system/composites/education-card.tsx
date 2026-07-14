import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface EducationCardProps {
  credential: string;
  institution: string;
  period: string;
  description?: string;
  className?: string;
}

export function EducationCard({
  credential,
  institution,
  period,
  description,
  className,
}: EducationCardProps) {
  return (
    <article className={cn("flex flex-col gap-3", className)}>
      <Text variant="metadata" as="p" tabular>
        {period}
      </Text>
      <Text variant="subheading" as="h3">
        {credential}
      </Text>
      <Text variant="body" as="p" className="text-text-primary">
        {institution}
      </Text>
      {description ? (
        <Text variant="body" as="p" className="text-text-secondary">
          {description}
        </Text>
      ) : null}
    </article>
  );
}
