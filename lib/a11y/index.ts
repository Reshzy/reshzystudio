export { useFocusTrap } from "./use-focus-trap";

/**
 * Builds meaningful alternative text from artwork title and summary.
 * Prefers descriptive summary content over title-only labels.
 */
export function resolveArtworkAlt(title: string, summary?: string): string {
  const trimmedSummary = summary?.trim();

  if (!trimmedSummary) {
    return title;
  }

  if (trimmedSummary.toLowerCase().startsWith(title.toLowerCase())) {
    return trimmedSummary;
  }

  return `${title}. ${trimmedSummary}`;
}
