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

  // Production fallback aligned with content/site/config.json seo.siteUrl.
  return "https://reshzystudio.com";
}

export function getSiteUrl(): string {
  return readSiteUrl();
}

export function isContactDeliveryConfigured(): boolean {
  return Boolean(process.env.CONTACT_WEBHOOK_URL?.trim());
}
