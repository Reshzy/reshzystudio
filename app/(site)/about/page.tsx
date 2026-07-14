import type { Metadata } from "next";
import { AboutPageExperience } from "@/features/about";
import {
  loadAboutContent,
  loadProfile,
  loadSiteConfiguration,
} from "@/lib/content";
import {
  buildAboutStructuredData,
  buildSiteMetadata,
  serializeJsonLd,
} from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();
const profile = loadProfile();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/about",
  overrides: {
    title: "About",
    description:
      profile.shortBio ||
      `Meet ${siteConfig.identity.owner} — the artist behind the exhibition.`,
  },
});

export default function AboutPage() {
  const about = loadAboutContent();
  const structuredData = buildAboutStructuredData(profile, siteConfig);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />
      <AboutPageExperience profile={profile} content={about} />
    </>
  );
}
