import type { ReactElement } from "react";

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_CONTENT_TYPE = "image/png";

const frameStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  background: "#0c0a09",
  color: "#fafaf9",
  padding: "72px 80px",
};

const eyebrowStyle = {
  display: "flex",
  fontSize: 24,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "#a8a29e",
};

interface OgFrameProps {
  eyebrow?: string;
  eyebrowTrailing?: string;
  title: string;
  titleSize?: number;
  description?: string;
  footer?: string;
}

/**
 * Shared Open Graph card layout — editorial dark frame used by all OG routes.
 */
export function OgFrame({
  eyebrow,
  eyebrowTrailing,
  title,
  titleSize = 76,
  description,
  footer,
}: OgFrameProps): ReactElement {
  return (
    <div style={frameStyle}>
      {(eyebrow || eyebrowTrailing) && (
        <div
          style={{
            ...eyebrowStyle,
            justifyContent: "space-between",
          }}
        >
          <span>{eyebrow ?? ""}</span>
          {eyebrowTrailing ? <span>{eyebrowTrailing}</span> : null}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              maxWidth: 860,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#d6d3d1",
            }}
          >
            {description}
          </div>
        ) : null}
        {footer ? (
          <div
            style={{
              display: "flex",
              marginTop: description ? 12 : 0,
              fontSize: 28,
              color: description ? "#a8a29e" : "#d6d3d1",
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
