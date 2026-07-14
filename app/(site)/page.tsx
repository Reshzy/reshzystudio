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

export default function HomePage() {
  const siteConfig = loadSiteConfiguration();
  const home = loadHomeContent();
  const featuredArtworks = loadFeaturedArtwork().map(toArtworkPreview);
  const heroArtwork = featuredArtworks[0];
  const featuredForGrid = featuredArtworks;

  return (
    <div className="flex flex-1 flex-col">
      <HomeHero
        siteName={siteConfig.identity.siteName}
        content={home.hero}
        featuredArtwork={heroArtwork}
      />
      <HomeIntroduction content={home.introduction} />
      <HomeFeatured content={home.featured} artworks={featuredForGrid} />
      <HomeDisciplines content={home.disciplines} />
      <HomeCta content={home.cta} />
    </div>
  );
}
