import { ImageResponse } from "next/og";
import { loadSiteConfiguration } from "@/lib/content";
import { OgFrame, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "Rodge Andru — curated creative exhibition";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  const config = loadSiteConfiguration();

  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Exhibition"
        title={config.identity.siteName}
        titleSize={88}
        description={config.identity.tagline}
      />
    ),
    { ...size },
  );
}
