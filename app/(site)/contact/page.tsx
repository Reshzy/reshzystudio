import type { Metadata } from "next";
import { ContactExperience } from "@/features/contact";
import {
  loadContactContent,
  loadProfile,
  loadSiteConfiguration,
} from "@/lib/content";
import {
  buildSiteMetadata,
  buildWebPageStructuredData,
  JsonLd,
} from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();
const profile = loadProfile();
const contact = loadContactContent();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/contact",
  overrides: {
    title: "Contact",
    description:
      contact.hero.supporting ??
      `Start a conversation with ${siteConfig.identity.owner}.`,
    keywords: [
      ...siteConfig.seo.defaultKeywords,
      "Contact",
      "Commission",
      "Collaboration",
    ],
  },
});

export default function ContactPage() {
  const structuredData = buildWebPageStructuredData({
    config: siteConfig,
    path: "/contact",
    name: "Contact",
    description:
      contact.hero.supporting ??
      `Start a conversation with ${siteConfig.identity.owner}.`,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    profile,
  });

  return (
    <>
      <JsonLd data={structuredData} />
      <ContactExperience content={contact} profile={profile} />
    </>
  );
}
