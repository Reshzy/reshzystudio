/**
 * Canonical public routes for sitemap generation.
 * Dynamic content routes are appended by content loaders when available.
 */

export interface PublicRoute {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export const PUBLIC_STATIC_ROUTES: PublicRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/collection", changeFrequency: "weekly", priority: 0.9 },
  { path: "/artwork", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];
