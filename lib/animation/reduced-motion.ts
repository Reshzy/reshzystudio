/**
 * Shared reduced-motion helpers for Motion presets and wrappers.
 */

export function getReducedMotionMediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)");
}

export function prefersReducedMotion(): boolean {
  return getReducedMotionMediaQuery()?.matches ?? false;
}
