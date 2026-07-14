"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/design-system/shared";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, children, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  return (
    <NextLink
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-body transition-colors duration-small ease-standard",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        active
          ? "font-medium text-text-primary"
          : "text-text-secondary hover:text-text-primary",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
