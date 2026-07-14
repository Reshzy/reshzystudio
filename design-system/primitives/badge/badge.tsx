import type { HTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "error";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-badge-default text-badge-default-foreground",
  accent: "bg-badge-accent text-badge-accent-foreground",
  success: "bg-badge-success text-badge-success-foreground",
  warning: "bg-badge-warning text-badge-warning-foreground",
  error: "bg-badge-error text-badge-error-foreground",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-caption font-medium",
        "transition-[background-color,color,transform,opacity] duration-small ease-standard",
        "motion-safe:hover:scale-[1.02]",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
