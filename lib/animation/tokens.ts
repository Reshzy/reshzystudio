/**
 * Motion token values mirrored from design-system primitives for JS consumers.
 * Keep synchronized with design-system/tokens/primitives/motion.css.
 */

export const duration = {
  micro: 0.15,
  small: 0.275,
  medium: 0.425,
  large: 0.65,
  hero: 1,
} as const;

export type DurationToken = keyof typeof duration;

export const ease = {
  standard: [0.4, 0, 0.2, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export type EaseToken = keyof typeof ease;
