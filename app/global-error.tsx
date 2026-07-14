"use client";

import { useEffect } from "react";

/**
 * Root-level error UI when the root layout fails.
 * Must define its own html/body — it replaces the root layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
          color: "#fafaf9",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "2rem",
        }}
      >
        <main
          style={{
            maxWidth: "28rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#a8a29e",
            }}
          >
            Error
          </p>
          <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ margin: 0, lineHeight: 1.6, color: "#d6d3d1" }}>
            An unexpected error occurred. You can try again, or return later.
          </p>
          <div>
            <button
              type="button"
              onClick={reset}
              style={{
                appearance: "none",
                border: "1px solid #a8a29e",
                background: "transparent",
                color: "#fafaf9",
                padding: "0.75rem 1.25rem",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
