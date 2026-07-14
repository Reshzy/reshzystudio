import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/design-system/shared";
import { interactivePress } from "@/lib/animation";

export type ButtonLinkVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover",
  secondary:
    "border border-button-secondary-border bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover",
  ghost:
    "bg-button-ghost text-button-ghost-foreground hover:bg-button-ghost-hover",
};

export interface ButtonLinkProps {
  href: string;
  variant?: ButtonLinkVariant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-body font-medium",
        interactivePress,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
