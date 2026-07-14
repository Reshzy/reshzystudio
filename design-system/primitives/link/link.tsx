import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/design-system/shared";

export type LinkVariant = "default" | "subtle" | "accent";

const variantStyles: Record<LinkVariant, string> = {
  default: "text-link-default hover:text-link-hover",
  subtle: "text-link-subtle hover:text-link-default",
  accent: "text-link-accent hover:text-link-hover",
};

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
  children: ReactNode;
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Link({
  href,
  variant = "default",
  external,
  className,
  children,
  ...props
}: LinkProps) {
  const isExternal = external ?? isExternalHref(href);
  const linkClassName = cn(
    "inline-flex items-center text-body underline-offset-4 transition-colors duration-small ease-standard hover:underline",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    variantStyles[variant],
    className,
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClassName}
        rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClassName} {...props}>
      {children}
    </NextLink>
  );
}
