import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover",
  secondary:
    "border border-button-secondary-border bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover",
  ghost:
    "bg-button-ghost text-button-ghost-foreground hover:bg-button-ghost-hover",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-body font-medium",
        "transition-colors duration-small ease-standard",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
