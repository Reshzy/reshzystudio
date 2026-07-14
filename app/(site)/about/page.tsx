import type { Metadata } from "next";
import { loadSiteConfiguration } from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/about",
  overrides: {
    title: "About",
    description: `Meet ${siteConfig.identity.owner} — the artist behind the exhibition.`,
  },
});

export default function AboutPage() {
  return <div className="flex flex-1 flex-col" />;
}
