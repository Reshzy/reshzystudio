import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/design-system/shared";

export type TextVariant =
  | "display"
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "metadata";

const variantStyles: Record<TextVariant, string> = {
  display: "font-display text-display",
  heading: "font-display text-heading",
  subheading: "font-sans text-subheading",
  body: "font-sans text-body",
  caption: "font-sans text-caption text-text-secondary",
  metadata:
    "font-sans text-metadata uppercase text-text-muted",
};

const defaultElements: Record<TextVariant, ElementType> = {
  display: "h1",
  heading: "h2",
  subheading: "h3",
  body: "p",
  caption: "span",
  metadata: "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant: TextVariant;
  as?: ElementType;
  tabular?: boolean;
}

export function Text({
  variant,
  as,
  tabular = false,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as ?? defaultElements[variant];

  return (
    <Component
      className={cn(
        variantStyles[variant],
        tabular && "tabular-nums",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
