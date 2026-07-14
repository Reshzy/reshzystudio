export default function SiteLoading() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-24"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="size-2 rounded-full bg-accent-primary motion-safe:animate-pulse" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
