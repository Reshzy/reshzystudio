import { Container, Link, Text } from "@/design-system/primitives";
import { cn } from "@/design-system/shared";
import type { FooterConfiguration } from "@/types/content";

export interface SiteFooterProps {
  owner: string;
  footer: FooterConfiguration;
  className?: string;
}

export function SiteFooter({ owner, footer, className }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const hasLinks = Boolean(footer.email) || footer.socialLinks.length > 0;

  return (
    <footer
      className={cn(
        "mt-auto border-t border-border-subtle bg-canvas",
        className,
      )}
    >
      <Container
        as="div"
        className="flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-2">
          <Text variant="caption" as="p">
            © {year} {owner}
          </Text>
          <Text variant="metadata" as="p">
            All rights reserved
          </Text>
        </div>

        {hasLinks ? (
          <nav aria-label="Secondary">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footer.email ? (
                <li>
                  <Link href={`mailto:${footer.email}`} variant="subtle">
                    Email
                  </Link>
                </li>
              ) : null}
              {footer.socialLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    variant="subtle"
                    external
                    target="_blank"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </footer>
  );
}
