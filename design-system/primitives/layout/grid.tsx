import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type GridGap = "sm" | "md" | "lg";

const gapStyles: Record<GridGap, string> = {
  sm: "gap-gutter-sm",
  md: "gap-gutter-md",
  lg: "gap-gutter-lg",
};

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: GridGap;
}

const columnStyles: Record<NonNullable<GridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-12",
};

export function Grid({
  as: Component = "div",
  columns = 12,
  gap = "md",
  className,
  children,
  ...props
}: GridProps) {
  return (
    <Component
      className={cn("grid", columnStyles[columns], gapStyles[gap], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
