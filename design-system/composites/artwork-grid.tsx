import type { ReactNode } from "react";
import { cn } from "@/design-system/shared";

export type ArtworkGridColumns = 2 | 3;

export interface ArtworkGridProps {
  children: ReactNode;
  columns?: ArtworkGridColumns;
  className?: string;
}

const columnStyles: Record<ArtworkGridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

export function ArtworkGrid({
  children,
  columns = 3,
  className,
}: ArtworkGridProps) {
  return (
    <ul
      className={cn(
        "grid list-none gap-10 md:gap-12",
        columnStyles[columns],
        className,
      )}
    >
      {children}
    </ul>
  );
}

export interface ArtworkGridItemProps {
  children: ReactNode;
  className?: string;
}

export function ArtworkGridItem({
  children,
  className,
}: ArtworkGridItemProps) {
  return <li className={cn("min-w-0", className)}>{children}</li>;
}
