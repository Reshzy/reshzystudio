import type { ReactNode } from "react";
import { Reveal } from "@/design-system/primitives/motion/reveal";
import { Text } from "@/design-system/primitives/typography/text";
import { cn } from "@/design-system/shared";

export interface TimelineProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Timeline({
  children,
  className,
  "aria-label": ariaLabel = "Timeline",
}: TimelineProps) {
  return (
    <ol
      aria-label={ariaLabel}
      className={cn(
        "relative flex flex-col border-t border-border-subtle",
        className,
      )}
    >
      {children}
    </ol>
  );
}

export interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function TimelineItem({
  year,
  title,
  description,
  delay = 0,
  className,
}: TimelineItemProps) {
  return (
    <li
      className={cn(
        "border-b border-border-subtle py-8 md:py-10",
        className,
      )}
    >
      <Reveal delay={delay}>
        <div className="grid gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <time
              dateTime={year}
              className="font-sans text-metadata uppercase tabular-nums text-text-muted"
            >
              {year}
            </time>
          </div>
          <div className="flex flex-col gap-3 md:col-span-10">
            <Text variant="subheading" as="h3">
              {title}
            </Text>
            <Text
              variant="body"
              as="p"
              className="max-w-prose text-text-secondary"
            >
              {description}
            </Text>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
