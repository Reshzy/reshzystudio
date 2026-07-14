import { ImageResponse } from "next/og";
import { loadSiteConfiguration } from "@/lib/content";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        {initial}
      </div>
    ),
    { ...size },
  );
}
