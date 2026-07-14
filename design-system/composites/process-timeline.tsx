import { Reveal } from "@/design-system/primitives/motion/reveal";
import { Text } from "@/design-system/primitives/typography/text";
import type { ArtworkProcessStep } from "@/types/content";

export interface ProcessTimelineProps {
  steps: ArtworkProcessStep[];
  "aria-label"?: string;
}

export function ProcessTimeline({
  steps,
  "aria-label": ariaLabel = "Creative process",
}: ProcessTimelineProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <ol
      aria-label={ariaLabel}
      className="relative flex flex-col border-t border-border-subtle"
    >
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="border-b border-border-subtle py-8 md:py-10"
        >
          <Reveal delay={Math.min(index * 0.04, 0.16)}>
            <div className="grid gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-2">
                <span className="font-sans text-metadata uppercase tabular-nums text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-3 md:col-span-10">
                <Text variant="subheading" as="h3">
                  {step.title}
                </Text>
                <Text
                  variant="body"
                  as="p"
                  className="max-w-prose text-text-secondary"
                >
                  {step.description}
                </Text>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
