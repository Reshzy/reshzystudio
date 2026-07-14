import type { HTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type CardVariant = "standard" | "featured" | "compact";

const variantStyles: Record<CardVariant, string> = {
  standard: "border-card-standard-border bg-card-standard p-6 shadow-sm",
  featured:
    "border-card-featured-border bg-card-featured p-8 shadow-md ring-1 ring-card-featured-border",
  compact: "border-card-compact-border bg-card-compact p-4",
};

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
}

export function Card({
  variant = "standard",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border text-text-primary",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
