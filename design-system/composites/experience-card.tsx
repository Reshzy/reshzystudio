import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface ExperienceCardProps {
  role: string;
  organization: string;
  period: string;
  summary: string;
  className?: string;
}

export function ExperienceCard({
  role,
  organization,
  period,
  summary,
  className,
}: ExperienceCardProps) {
  return (
    <article
      className={cn(
        "grid gap-4 md:grid-cols-12 md:gap-8",
        className,
      )}
    >
      <div className="md:col-span-3">
        <Text variant="metadata" as="p" tabular>
          {period}
        </Text>
      </div>
      <div className="flex flex-col gap-3 md:col-span-9">
        <Text variant="subheading" as="h3">
          {role}
        </Text>
        <Text variant="body" as="p" className="text-text-primary">
          {organization}
        </Text>
        <Text
          variant="body"
          as="p"
          className="max-w-prose text-text-secondary"
        >
          {summary}
        </Text>
      </div>
    </article>
  );
}
