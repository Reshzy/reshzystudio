import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export type FormStatusTone = "success" | "error" | "neutral";

export interface FormStatusProps {
  title: string;
  body?: string;
  tone?: FormStatusTone;
  className?: string;
  titleId?: string;
}

const toneStyles: Record<FormStatusTone, string> = {
  success: "border-border-subtle bg-surface-secondary",
  error: "border-input-border-error bg-surface-secondary",
  neutral: "border-border-subtle bg-surface-secondary",
};

export function FormStatus({
  title,
  body,
  tone = "neutral",
  className,
  titleId,
}: FormStatusProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col gap-3 border px-6 py-8 md:px-8 md:py-10",
        toneStyles[tone],
        className,
      )}
    >
      <Text
        variant="subheading"
        as="h3"
        id={titleId}
        className="text-text-primary"
      >
        {title}
      </Text>
      {body ? (
        <Text variant="body" as="p" className="max-w-prose text-text-secondary">
          {body}
        </Text>
      ) : null}
    </div>
  );
}
