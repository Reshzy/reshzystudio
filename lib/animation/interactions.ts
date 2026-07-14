/**
 * Shared Tailwind class recipes for microinteractions.
 * Prefer these over one-off hover/active rules so motion stays consistent.
 * All transform effects are gated with motion-safe: for prefers-reduced-motion.
 */

/** Buttons and button-styled links — slight grow on hover, press on active. */
export const interactivePress =
  "transition-[color,background-color,border-color,opacity,transform,box-shadow] duration-small ease-standard motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]";

/** Icon / ghost controls — color + soft press without growth. */
export const interactiveControl =
  "transition-[color,background-color,opacity,transform] duration-small ease-standard motion-safe:active:scale-[0.96]";

/** Cards and media links — soft lift + shadow. */
export const interactiveLift =
  "transition-[transform,box-shadow,opacity] duration-medium ease-standard motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

/** Text links — underline grows in. */
export const interactiveLink =
  "underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-small ease-standard hover:decoration-current";

/** Filter chips and selectable pills. */
export const interactiveChip =
  "transition-[color,background-color,border-color,transform] duration-small ease-standard motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]";

/** Form fields — border/shadow feedback on focus. */
export const interactiveField =
  "transition-[color,background-color,border-color,box-shadow] duration-small ease-standard focus:shadow-sm";
