# Rodge Andru Portfolio

Premium online exhibition for **Rodge Andru P. Viloria** — curated digital illustration, graphic design, and poster work.

The site is an exhibition experience, not a traditional portfolio template. Artwork is the hero; the interface stays quiet.

**Version:** 1.0  
**Stack:** Next.js App Router · React 19 · TypeScript · Tailwind CSS v4 · Motion  
**Deploy target:** Vercel

---

## Documentation

Start here before changing code:

- [`docs/ai/context.md`](docs/ai/context.md) — permanent implementation handbook (source of truth)
- [`docs/`](docs/) — product, visual, motion, content, architecture, and operations docs
- [`docs/implementation/v1-status.md`](docs/implementation/v1-status.md) — Version 1.0 readiness status

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |

---

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL (no trailing slash) |
| `CONTACT_WEBHOOK_URL` | Production (for contact form) | JSON webhook for contact delivery |

Without `CONTACT_WEBHOOK_URL`, the contact form works in development (logged) and fails honestly in production.

---

## Project structure

```
app/              Routes, layouts, metadata, error boundaries
content/          Artwork, collections, profile, site copy (JSON)
design-system/    Tokens, primitives, composites
features/         Home, gallery, artwork, about, contact, navigation, theme
lib/              Content loaders, metadata, contact, animation, a11y, OG
types/            Shared TypeScript contracts
public/media/     Artwork media assets
docs/             Architecture and product documentation
```

Dependencies flow inward: `app → features → design-system → lib → types`.

---

## Content

v1 content is file-based JSON under `content/`.

- Artwork: `content/artwork/*.json`
- Collections: `content/collections/*.json`
- Profile: `content/profile/`
- Site copy & config: `content/site/`

Loaders live in `lib/content/`. Presentation models are immutable — components do not load content.

---

## Routes (v1)

| Route | Purpose |
|-------|---------|
| `/` | Home exhibition |
| `/collection` | Curated collection + filters |
| `/collection/[slug]` | Collection sequence |
| `/artwork` | Artwork archive |
| `/artwork/[slug]` | Artwork detail |
| `/about` | Artist story |
| `/contact` | Conversation |

Excluded from v1: projects, blog, CMS, stories routes.

---

## Production checklist

Before deploying:

1. Set `NEXT_PUBLIC_SITE_URL` to the live domain
2. Configure `CONTACT_WEBHOOK_URL` for contact delivery
3. Run `pnpm lint && pnpm typecheck && pnpm build`
4. Verify `/sitemap.xml`, `/robots.txt`, and a sample OG preview
5. Spot-check keyboard navigation and dark/light themes

Deploy on Vercel from the main branch. Keep the main branch releasable.
