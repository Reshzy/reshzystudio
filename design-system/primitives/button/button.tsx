import type { ButtonHTMLAttributes, Ref } from "react";
import { cn } from "@/design-system/shared";
import { interactivePress } from "@/lib/animation";

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
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  type = "button",
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-body font-medium",
        interactivePress,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        "motion-safe:disabled:hover:scale-100 motion-safe:disabled:active:scale-100",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
