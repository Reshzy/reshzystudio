import type { MetadataRoute } from "next";
import { loadSiteConfiguration } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  const config = loadSiteConfiguration();

  return {
    name: config.identity.siteName,
    short_name: config.identity.siteName,
    description: config.seo.defaultDescription,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf9",
    theme_color: "#0c0a09",
    lang: config.seo.locale,
    categories: ["portfolio", "art", "design"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
