"use client";

import { MoonIcon, SunIcon } from "@/design-system/icons";
import { useTheme } from "@/design-system/providers";
import { cn } from "@/design-system/shared";
import { interactiveControl } from "@/lib/animation";

const LABELS = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { preference, resolvedTheme, cyclePreference } = useTheme();

  return (
    <button
      type="button"
      onClick={cyclePreference}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full",
        "text-text-secondary hover:bg-surface-secondary hover:text-text-primary",
        interactiveControl,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        className,
      )}
      aria-label={`Theme: ${LABELS[preference]}. Activate to change.`}
      title={LABELS[preference]}
    >
      <span className="inline-flex transition-transform duration-small ease-standard motion-safe:active:rotate-12">
        {resolvedTheme === "dark" ? (
          <MoonIcon className="size-5" />
        ) : (
          <SunIcon className="size-5" />
        )}
      </span>
    </button>
  );
}
