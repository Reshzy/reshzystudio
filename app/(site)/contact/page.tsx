import type { Metadata } from "next";
import { ContactExperience } from "@/features/contact";
import {
  loadContactContent,
  loadProfile,
  loadSiteConfiguration,
} from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

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
  },
});

export default function ContactPage() {
  return <ContactExperience content={contact} profile={profile} />;
}
