import { stagger, type StaggerToken } from "./tokens";

/**
 * Deterministic delay for sequential entrance animations.
 * Caps cumulative stagger so long lists stay responsive.
 */
export function staggerDelay(
  index: number,
  token: StaggerToken = "default",
  maxDelay = 0.4,
): number {
  return Math.min(index * stagger[token], maxDelay);
}
