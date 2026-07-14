/**
 * Environment access. Validates at read time without external dependencies.
 */

function readSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;

  if (url) {
    return url.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://reshzystudio.com";
}

export function getSiteUrl(): string {
  return readSiteUrl();
}
