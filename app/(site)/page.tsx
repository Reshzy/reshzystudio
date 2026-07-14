import type { Metadata } from "next";
import {
  HomeCta,
  HomeDisciplines,
  HomeFeatured,
  HomeHero,
  HomeIntroduction,
} from "@/features/home";
import {
  loadFeaturedArtwork,
  loadHomeContent,
  loadSiteConfiguration,
  toArtworkPreview,
} from "@/lib/content";
import { buildSiteMetadata, buildWebPageStructuredData, JsonLd } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();
const home = loadHomeContent();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/",
  overrides: {
    title: siteConfig.seo.defaultTitle,
    description: home.hero.supporting || siteConfig.seo.defaultDescription,
  },
});

export default function HomePage() {
  const featuredArtworks = loadFeaturedArtwork().map(toArtworkPreview);
  const heroArtwork = featuredArtworks[0];
  const structuredData = buildWebPageStructuredData({
    config: siteConfig,
    path: "/",
    name: siteConfig.identity.siteName,
    description: home.hero.supporting || siteConfig.seo.defaultDescription,
    breadcrumbs: [{ name: "Home", path: "/" }],
  });

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="flex flex-1 flex-col">
        <HomeHero
          siteName={siteConfig.identity.siteName}
          content={home.hero}
          featuredArtwork={heroArtwork}
        />
        <HomeIntroduction content={home.introduction} />
        <HomeFeatured content={home.featured} artworks={featuredArtworks} />
        <HomeDisciplines content={home.disciplines} />
        <HomeCta content={home.cta} />
      </div>
    </>
  );
}
