import type { ElementType, ReactNode } from "react";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleId?: string;
  titleAs?: "h1" | "h2";
  supporting?: string;
  actions?: ReactNode;
  className?: string;
  align?: "start" | "between";
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  titleAs = "h2",
  supporting,
  actions,
  className,
  align = "start",
}: SectionHeadingProps) {
  const titleVariant: "display" | "heading" =
    titleAs === "h1" ? "display" : "heading";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "between" && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="flex max-w-xl flex-col gap-3">
        {eyebrow ? (
          <Text variant="metadata" as="p">
            {eyebrow}
          </Text>
        ) : null}
        <Text variant={titleVariant} as={titleAs as ElementType} id={titleId}>
          {title}
        </Text>
        {supporting ? (
          <Text variant="body" as="p" className="text-text-secondary">
            {supporting}
          </Text>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
