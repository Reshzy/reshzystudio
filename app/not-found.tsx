import { SkipLink, Container, Link, Text } from "@/design-system/primitives";
import { SiteFooter, SiteHeader } from "@/features/navigation";
import { loadSiteConfiguration } from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata = buildSiteMetadata(siteConfig, {
  path: "/",
  overrides: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    noIndex: true,
  },
});

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <SiteHeader
        siteName={siteConfig.identity.siteName}
        items={siteConfig.navigation}
      />
      <main
        id="main-content"
        className="flex flex-1 flex-col justify-center py-24"
      >
        <Container width="prose" className="flex flex-col gap-6">
          <Text variant="metadata" as="p">
            404
          </Text>
          <Text variant="heading" as="h1">
            Page not found
          </Text>
          <Text variant="body" as="p" className="text-text-secondary">
            The page you are looking for does not exist or has been moved.
          </Text>
          <div>
            <Link href="/" variant="accent">
              Return home
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter
        owner={siteConfig.identity.owner}
        footer={siteConfig.footer}
      />
    </>
  );
}
