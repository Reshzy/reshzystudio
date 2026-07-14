import type { Metadata } from "next";
import { loadSiteConfiguration } from "@/lib/content";
import { buildSiteMetadata } from "@/lib/metadata";

const siteConfig = loadSiteConfiguration();

export const metadata: Metadata = buildSiteMetadata(siteConfig, {
  path: "/contact",
  overrides: {
    title: "Contact",
    description: "Start a conversation about creative work and collaboration.",
  },
});

export default function ContactPage() {
  return <div className="flex flex-1 flex-col" />;
}
