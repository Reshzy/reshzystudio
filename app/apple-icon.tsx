import { ImageResponse } from "next/og";
import { loadSiteConfiguration } from "@/lib/content";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  const config = loadSiteConfiguration();
  const initial = config.identity.siteName.trim().charAt(0).toUpperCase() || "R";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
          color: "#fafaf9",
          fontSize: 84,
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        {initial}
      </div>
    ),
    { ...size },
  );
}
