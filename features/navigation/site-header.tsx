import NextLink from "next/link";
import { Container } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import { ThemeToggle } from "@/features/theme";
import type { NavigationItem } from "@/types/content";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export interface SiteHeaderProps {
  siteName: string;
  items: NavigationItem[];
  className?: string;
}

export function SiteHeader({ siteName, items, className }: SiteHeaderProps) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border-subtle/60",
        "bg-navigation-background/85 text-navigation-foreground backdrop-blur-sm",
        className,
      )}
    >
      <Container
        as="div"
        className="flex h-16 items-center justify-between gap-6"
      >
        <NextLink
          href="/"
          className={cn(
            "font-display text-subheading tracking-tight text-text-primary",
            "transition-[opacity,transform] duration-small ease-standard",
            "hover:opacity-80 motion-safe:active:scale-[0.98]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          )}
        >
          {siteName}
        </NextLink>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {sortedItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav items={sortedItems} />
        </div>
      </Container>
    </header>
  );
}
