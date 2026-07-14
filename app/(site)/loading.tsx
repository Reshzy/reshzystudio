export default function SiteLoading() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <p className="font-display text-subheading tracking-tight text-text-primary motion-safe:animate-pulse">
        Loading
      </p>
      <div
        className="h-px w-12 origin-center bg-accent-primary motion-safe:animate-pulse"
        aria-hidden="true"
      />
      <span className="sr-only">Loading page content</span>
    </div>
  );
}
