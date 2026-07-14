import type { Metadata } from "next";
import {
  CollectionArchive,
  CollectionCategories,
  CollectionFeatured,
  CollectionHero,
  CollectionTechnologies,
} from "@/features/gallery";
import {
  collectGalleryCategories,
  collectGalleryTechnologies,
  filterArtworkByCategory,
  loadAllArtwork,
  loadCollectionContent,
  loadFeaturedArtwork,
  loadSiteConfiguration,
  resolveCategoryParam,
  toArtworkPreview,
} from "@/lib/content";
import {
  buildCollectionPageStructuredData,
  buildSiteMetadata,
  JsonLd,
} from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/collection",
  overrides: {
    title: "Collection",
    description:
      "A curated collection of digital illustration, graphic design, and creative work.",
    keywords: [
      ...siteConfig.seo.defaultKeywords,
      "Collection",
      "Curated Work",
    ],
  },
});

interface CollectionPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function CollectionPage({
  searchParams,
}: CollectionPageProps) {
  const params = await searchParams;
  const activeCategory = resolveCategoryParam(params.category);
  const content = loadCollectionContent();

  const allArtworks = loadAllArtwork().map(toArtworkPreview);
  const featuredArtworks = loadFeaturedArtwork().map(toArtworkPreview);
  const categories = collectGalleryCategories(allArtworks);
  const technologies = collectGalleryTechnologies(allArtworks);

  const validCategory =
    activeCategory &&
    categories.some((category) => category.slug === activeCategory)
      ? activeCategory
      : undefined;

  const archiveArtworks = filterArtworkByCategory(
    allArtworks,
    validCategory,
  );

  const structuredData = buildCollectionPageStructuredData({
    config: siteConfig,
    path: "/collection",
    name: "Collection",
    description:
      "A curated collection of digital illustration, graphic design, and creative work.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Collection", path: "/collection" },
    ],
    items: allArtworks.map((artwork) => ({
      name: artwork.title,
      path: artwork.href,
    })),
  });

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="flex flex-1 flex-col">
        <CollectionHero
          content={content.hero}
          totalCount={allArtworks.length}
        />
        <CollectionFeatured
          artworks={featuredArtworks}
          content={content.featured}
        />
        <CollectionCategories
          categories={categories}
          content={content.categories}
          activeCategory={validCategory}
        />
        <CollectionArchive
          artworks={archiveArtworks}
          categories={categories}
          content={content.archive}
          activeCategory={validCategory}
        />
        <CollectionTechnologies
          technologies={technologies}
          content={content.technologies}
        />
      </div>
    </>
  );
}
