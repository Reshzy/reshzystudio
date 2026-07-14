import { SkipLink, PageFade } from "@/design-system/primitives";
import { SiteFooter, SiteHeader } from "@/features/navigation";
import { loadSiteConfiguration } from "@/lib/content";

const siteConfig = loadSiteConfiguration();

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader
        siteName={siteConfig.identity.siteName}
        items={siteConfig.navigation}
      />
      <main id="main-content" className="flex flex-1 flex-col">
        <PageFade>{children}</PageFade>
      </main>
      <SiteFooter
        owner={siteConfig.identity.owner}
        footer={siteConfig.footer}
      />
    </>
  );
}
