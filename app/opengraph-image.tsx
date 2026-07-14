import { ImageResponse } from "next/og";
import { loadSiteConfiguration } from "@/lib/content";

export const alt = "Rodge Andru — curated creative exhibition";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const config = loadSiteConfiguration();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0a09",
          color: "#fafaf9",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a8a29e",
          }}
        >
          Exhibition
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {config.identity.siteName}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 820,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#d6d3d1",
            }}
          >
            {config.identity.tagline}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
