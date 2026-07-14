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
        "relative text-body transition-colors duration-small ease-standard",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-small after:ease-standard",
        active
          ? "font-medium text-text-primary after:scale-x-100"
          : "text-text-secondary after:scale-x-0 hover:text-text-primary hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
