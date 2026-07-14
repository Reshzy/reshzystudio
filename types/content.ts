/**
 * Shared content model contracts mirroring v1 schemas.
 * Schemas describe what content is — not how it is displayed.
 */

export type ContentStatus = "draft" | "published";

export type ContentVisibility = "public" | "unlisted" | "private";

export interface ContentIdentity {
  id: string;
  slug: string;
  title: string;
}

export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  socialImage?: string;
  canonicalPath?: string;
}

export interface ContentMetadata {
  status: ContentStatus;
  visibility: ContentVisibility;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  seo: SeoMetadata;
}

export interface ArtworkMedia {
  cover: string;
  gallery: string[];
  thumbnail: string;
  video?: string;
}

export interface ArtworkCreativeInfo {
  medium: string;
  category: string;
  collectionSlug?: string;
  yearCreated: number;
  status: ContentStatus;
}

export interface ArtworkTechnicalInfo {
  software?: string[];
  dimensions?: string;
  aspectRatio?: string;
  colorPalette?: string[];
}

export interface Artwork extends ContentIdentity {
  summary: string;
  fullDescription?: string;
  narrative?: string;
  creative: ArtworkCreativeInfo;
  media: ArtworkMedia;
  technical?: ArtworkTechnicalInfo;
  tags: string[];
  featured: boolean;
  relatedArtworkIds: string[];
  metadata: ContentMetadata;
}

export interface Collection extends ContentIdentity {
  description: string;
  coverImage?: string;
  featuredArtworkIds: string[];
  displayOrder: number;
  metadata: ContentMetadata;
}

export interface Story extends ContentIdentity {
  summary: string;
  bodyPath: string;
  featuredImage?: string;
  referencedArtworkIds: string[];
  referencedCollectionIds: string[];
  metadata: ContentMetadata;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Profile {
  name: string;
  shortBio: string;
  fullBiography?: string;
  location?: string;
  skills: string[];
  tools: string[];
  education?: string[];
  experience?: string[];
  socialLinks: SocialLink[];
  email?: string;
  profileImage?: string;
  currentFocus?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  order: number;
}

export interface FooterConfiguration {
  email?: string;
  socialLinks: SocialLink[];
}

export interface SiteSeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  locale: string;
  siteUrl: string;
}

export interface SiteSocialConfig {
  twitterHandle?: string;
  ogImage: string;
}

export interface SiteConfiguration {
  identity: {
    siteName: string;
    tagline: string;
    owner: string;
  };
  seo: SiteSeoConfig;
  social: SiteSocialConfig;
  navigation: NavigationItem[];
  footer: FooterConfiguration;
  featureFlags: Record<string, boolean>;
}

export interface ResolvedPageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraphImage?: string;
  noIndex: boolean;
}

export interface ContentLink {
  label: string;
  href: string;
}

export interface HomeHeroContent {
  headline: string;
  supporting: string;
  cta: ContentLink;
}

export interface HomeSectionContent {
  headline: string;
  supporting?: string;
  body?: string;
  cta?: ContentLink;
}

export interface DisciplinePreview {
  label: string;
  description: string;
  href: string;
}

export interface HomePageContent {
  hero: HomeHeroContent;
  introduction: HomeSectionContent;
  featured: HomeSectionContent;
  disciplines: HomeSectionContent & {
    items: DisciplinePreview[];
  };
  cta: HomeSectionContent;
}
