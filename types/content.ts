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
  duration?: string;
  role?: string;
  client?: string;
}

export interface ArtworkTechnicalInfo {
  software?: string[];
  dimensions?: string;
  aspectRatio?: string;
  colorPalette?: string[];
}

export interface ArtworkProcessStep {
  id: string;
  title: string;
  description: string;
}

/**
 * Structured creative story for artwork detail pages.
 * Maps to ARTWORK.md: Idea → Inspiration → Process → Challenges → Reflection.
 */
export interface ArtworkStory {
  idea?: string;
  inspiration?: string;
  process?: string;
  processSteps?: ArtworkProcessStep[];
  challenges?: string;
  reflection?: string;
}

export interface Artwork extends ContentIdentity {
  summary: string;
  fullDescription?: string;
  narrative?: string;
  story?: ArtworkStory;
  creative: ArtworkCreativeInfo;
  media: ArtworkMedia;
  technical?: ArtworkTechnicalInfo;
  tags: string[];
  featured: boolean;
  relatedArtworkIds: string[];
  metadata: ContentMetadata;
}

export interface ArtworkPageContent {
  overview: HomeSectionContent;
  story: HomeSectionContent;
  process: HomeSectionContent;
  tools: HomeSectionContent;
  gallery: HomeSectionContent;
  related: HomeSectionContent;
  cta: HomeSectionContent;
}

export interface ContactMethodContent {
  id: string;
  label: string;
  description: string;
  href?: string;
}

export interface ContactFormContent {
  headline: string;
  supporting?: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
}

export interface ContactPageContent {
  hero: HomeSectionContent;
  introduction: HomeSectionContent;
  methods: HomeSectionContent;
  form: ContactFormContent;
  social: HomeSectionContent;
  methodsItems: ContactMethodContent[];
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

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  period: string;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  summary: string;
}

export interface SkillEntry {
  id: string;
  label: string;
  description: string;
}

export interface ValueEntry {
  id: string;
  title: string;
  description: string;
}

export interface FunFactEntry {
  id: string;
  label: string;
  detail: string;
}

export interface ProfileStat {
  id: string;
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  shortBio: string;
  fullBiography?: string;
  introduction?: string;
  philosophy?: string;
  location?: string;
  skills: SkillEntry[];
  tools: string[];
  timeline?: TimelineEntry[];
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  values?: ValueEntry[];
  funFacts?: FunFactEntry[];
  highlights?: ProfileStat[];
  socialLinks: SocialLink[];
  email?: string;
  profileImage?: string;
  currentFocus?: string;
}

export interface AboutPageContent {
  hero: HomeSectionContent;
  introduction: HomeSectionContent;
  philosophy: HomeSectionContent;
  story: HomeSectionContent;
  timeline: HomeSectionContent;
  education: HomeSectionContent;
  experience: HomeSectionContent;
  skills: HomeSectionContent;
  technologies: HomeSectionContent;
  values: HomeSectionContent;
  funFacts: HomeSectionContent;
  highlights: HomeSectionContent;
  cta: HomeSectionContent;
}

export interface CollectionPageContent {
  hero: HomeSectionContent;
  featured: HomeSectionContent;
  categories: HomeSectionContent;
  archive: HomeSectionContent;
  technologies: HomeSectionContent;
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
  defaultKeywords: string[];
  locale: string;
  siteUrl: string;
}

export interface SiteSocialConfig {
  twitterHandle?: string;
  /** Raster social preview image. SVG paths are ignored for OG/Twitter cards. */
  ogImage?: string;
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
  keywords?: string[];
  noIndex: boolean;
  openGraphType?: "website" | "article" | "profile";
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
