import { cn } from "@/design-system/shared";

export interface SkipLinkProps {
  href?: string;
  className?: string;
  children?: string;
}

export function SkipLink({
  href = "#main-content",
  className,
  children = "Skip to content",
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50",
        "focus:rounded-md focus:bg-surface-primary focus:px-4 focus:py-3",
        "focus:text-body focus:text-text-primary focus:shadow-md",
        "focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring",
        className,
      )}
    >
      {children}
    </a>
  );
}
