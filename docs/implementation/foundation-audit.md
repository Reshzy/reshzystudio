# Foundation Audit

**Project:** Rodge Andru Portfolio (`reshzystudio`)  
**Audit date:** 2026-07-14  
**Standard reference:** [`docs/ai/context.md`](../ai/context.md)  
**Codebase state:** P0 foundation implemented — architecture skeleton, tokens, types, metadata pipeline  
**Build status:** `pnpm run build` succeeds · `pnpm run lint` passes (single static route `/`)  
**Last updated:** 2026-07-14 — P0 foundation implementation complete

---

## Executive Summary

The repository is a clean, buildable Next.js 16 scaffold with the correct core toolchain (App Router, React 19, TypeScript strict mode, Tailwind CSS v4, ESLint). It is **not yet aligned** with the portfolio's architectural, visual, or experiential standards.

Most gaps are expected before implementation begins. `context.md` explicitly acknowledges the scaffold and instructs introducing architecture directories as work starts. This audit records **current state vs. target state** so foundation work can proceed in the right order.

| Status | Count | Meaning |
|--------|-------|---------|
| ✅ Correctly configured | 18 areas | Ready or implemented |
| ⚠ Needs improvement | 5 areas | Partially present; P1+ work remains |
| ❌ Missing | 2 areas | Deferred to P1+ (not P0 scope) |

### P0 Implementation Log

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | Architecture skeleton | ✅ Complete | `content/`, `design-system/`, `features/`, `lib/`, `types/`, `scripts/`, `tests/` with README contracts |
| 2 | TypeScript content contracts | ✅ Complete | `types/content.ts`, `types/index.ts` |
| 3 | Content source layer | ✅ Complete | `content/site/config.json`, content subdirs |
| 4 | Design token hierarchy | ✅ Complete | `design-system/tokens/{primitives,semantic,component}/` |
| 5 | Semantic color system (light/dark) | ✅ Complete | `semantic/light.css`, `semantic/dark.css` |
| 6 | Typography tokens | ✅ Complete | `primitives/typography.css` + `@theme` scale |
| 7 | 8-point spacing system | ✅ Complete | `primitives/spacing.css` + `@theme` spacing |
| 8 | Theme token maps | ✅ Complete | `data-theme` + `prefers-color-scheme` semantic maps |
| 9 | Editorial fonts | ✅ Complete | Cormorant + Source Sans 3 via `lib/fonts.ts` |
| 10 | Metadata pipeline | ✅ Complete | `lib/metadata/resolve-site-metadata.ts` |
| 11 | lib/ infrastructure | ✅ Complete | `lib/content/`, `lib/metadata/`, `lib/env.ts`, `lib/fonts.ts` |
| 12 | Scaffold cleanup | ✅ Complete | Token-based `page.tsx`, content-driven `layout.tsx`, stock SVGs removed |

**Recommended foundation sequence (before pages/features):**

1. **P0 — Architecture skeleton:** Create `content/`, `design-system/`, `features/`, `lib/`, `types/`, `scripts/`, `tests/` with minimal index/placeholder contracts (not feature UI).
2. **P0 — Design tokens & theme:** Implement primitive → semantic → component token hierarchy; replace scaffold CSS variables and hardcoded Tailwind values.
3. **P0 — Typography & fonts:** Replace Geist with editorial typefaces; wire `next/font` through token system.
4. **P0 — Metadata & SEO pipeline:** Remove hardcoded metadata; add `lib/metadata` generation stubs and `sitemap`/`robots` conventions.
5. **P1 — Motion foundation:** Install Motion; add `lib/animation` presets and `prefers-reduced-motion` utilities.
6. **P1 — Tooling:** Add Prettier, format scripts, `.env.example`, and stricter lint/format CI hooks.
7. **P1 — App Router shell:** Add route skeleton, nested layouts, `error.tsx`/`loading.tsx`, route groups — still without feature content.
8. **P2 — Accessibility & testing baselines:** Focus styles, skip link, a11y test harness, contrast validation against tokens.

---

## Audit Methodology

Each area was evaluated against `context.md` and corroborating implementation docs under `docs/06-implementation/`. Findings cite **observed repo state** (files, dependencies, configuration) and classify gaps by severity.

---

## 1. Project Structure

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| `app/` at repo root | Present — matches documented scaffold convention |
| `public/` for static assets | Present |
| `docs/` for project documentation | Present (comprehensive doc set) |
| Dependency flow is unblocked | No circular or mis-placed code yet — greenfield |
| Scaffold debt removed | Token-based `app/page.tsx`, content-driven layout, stock SVGs removed |

### ⚠ Needs improvement

**`README.md` is generic**

- **Observed:** Default create-next-app README; does not describe the exhibition product or architecture.
- **Why it matters:** First touchpoint for contributors; misaligns with documentation-as-source-of-truth principle.
- **Recommended solution:** Replace with project-specific README linking to `docs/ai/context.md` and foundation setup steps.
- **Priority:** P2

### ❌ Missing

_None — P0 resolved._

**Architectural directories** — ✅ **Complete (P0)**

- **Implemented:** `content/`, `design-system/`, `features/`, `lib/`, `types/`, `scripts/`, `tests/` with README contracts documenting single responsibilities. Feature and design-system subdirectories created with README-only stubs (no placeholder components).
- **Evidence:** See P0 Implementation Log #1.

---

## 2. App Router Structure

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| App Router in use | `app/layout.tsx`, `app/page.tsx` |
| Root layout is a Server Component | No `"use client"` directive |
| `lang="en"` on `<html>` | `app/layout.tsx` line 27 |
| Static generation works | Build output: `○ /` (Static) |

### ⚠ Needs improvement

**Root layout is minimal but not exhibition-ready**

- **Observed:** Layout provides fonts and body wrapper only — no providers, no shared chrome shell, no metadata pipeline hook.
- **Why it matters:** Layout hierarchy should be `Root → Experience → Section` per App Router architecture docs. Missing intermediate layouts will cause duplication when navigation, theme, and motion providers are added.
- **Recommended solution:** Plan nested layout files (`(marketing)`, `(content)`, `(system)` route groups) and a thin Experience layout — structure only, no feature UI.
- **Priority:** P1

### ❌ Missing

**v1 route skeleton**

- **Observed:** Only `/` exists. No `/collection`, `/artwork`, `/about`, `/contact`, or dynamic `[slug]` routes.
- **Why it matters:** Routing is a public interface; URLs must be stable. Establishing route files early validates layout nesting, metadata entry points, and loading/error boundaries before content arrives.
- **Recommended solution:** Add empty route segments with `generateMetadata` stubs wired to future content loaders — no artwork UI.
- **Priority:** P1

**Error, loading, and not-found boundaries**

- **Observed:** No `error.tsx`, `loading.tsx`, or custom `not-found.tsx` in `app/`. Build shows only `/_not-found` default.
- **Why it matters:** Failures and loading states are part of the experience arc. Without boundaries, layout shift and blank screens undermine the premium feel.
- **Recommended solution:** Add route-level and root-level `loading.tsx` / `error.tsx` / `not-found.tsx` using token-based skeletons.
- **Priority:** P1

**Route groups**

- **Observed:** No `(marketing)`, `(content)`, or `(system)` groups.
- **Why it matters:** Separates concerns without affecting public URLs; keeps `app/` thin.
- **Recommended solution:** Introduce route groups when adding v1 routes.
- **Priority:** P2

---

## 3. TypeScript Configuration

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| `strict: true` | `tsconfig.json` |
| `moduleResolution: "bundler"` | Correct for Next.js 16 |
| Next.js TypeScript plugin | `plugins: [{ "name": "next" }]` |
| `noEmit: true` | Standard App Router setup |
| Build-time type checking passes | `pnpm run build` — TypeScript finished without errors |

### ⚠ Needs improvement

**Path alias is a single catch-all** — deferred P2

**No shared type contracts** — ✅ **Complete (P0)**

- **Implemented:** `types/content.ts` defines Artwork, Collection, Story, Profile, SiteConfiguration, and supporting contracts. `types/index.ts` re-exports public types.
- **Evidence:** See P0 Implementation Log #2.

**Optional strictness flags not enabled**

- **Observed:** No `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.
- **Why it matters:** Portfolio content pipelines benefit from stricter null/undefined handling; reduces runtime surprises in loaders.
- **Recommended solution:** Evaluate adding `noUncheckedIndexedAccess` after `types/` exists.
- **Priority:** P3

---

## 4. Tailwind CSS Configuration

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Tailwind CSS v4 | `tailwindcss: ^4` in `package.json` |
| PostCSS integration | `postcss.config.mjs` with `@tailwindcss/postcss` |
| CSS entry uses v4 syntax | `@import "tailwindcss"` and `@theme inline` in `app/globals.css` |
| Utility-first approach available | Tailwind classes used in `page.tsx` |

### ⚠ Needs improvement

_None — P0 styling issues resolved._

### ❌ Missing

_None — P0 resolved._

**Token-driven Tailwind theme** — ✅ **Complete (P0)**

- **Implemented:** `design-system/tokens/` hierarchy imported into `app/globals.css` via `@theme inline`. Semantic colors, typography scale, spacing, radii, shadows, and motion values exposed as Tailwind utilities.
- **Evidence:** See P0 Implementation Log #4, #6, #7.

**8-point spacing system** — ✅ **Complete (P0)** — `primitives/spacing.css`

---

## 5. Design Token Setup

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Tailwind v4 `@theme` mechanism in place | Foundation for token injection exists |
| CSS custom properties pattern started | `:root { --background; --foreground }` |

### ❌ Missing

_None — P0 resolved._

**Full token hierarchy** — ✅ **Complete (P0)** — `design-system/tokens/{primitives,semantic,component}/`

**Semantic color system** — ✅ **Complete (P0)** — accent, success, warning, error + light/dark semantic maps

**Typography tokens** — ✅ **Complete (P0)** — display through metadata scale in `primitives/typography.css`

**Motion tokens**

- **Observed:** No duration tiers (100–200ms micro through 800–1200ms hero), easing curves, or delay tokens.
- **Why it matters:** Motion is token-driven; hardcoded animation values create inconsistent, inaccessible motion.
- **Recommended solution:** Add motion primitives aligned with `docs/03-motion/TIMING_SYSTEM.md` and `EASING_CURVES.md`.
- **Priority:** P1

---

## 6. Theme Architecture

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Dark/light values exist at CSS level | `@media (prefers-color-scheme: dark)` toggles `:root` variables |

### ⚠ Needs improvement

**Theme follows system preference only**

- **Observed:** No explicit theme provider, no `data-theme` / class strategy, no `features/theme/` module.
- **Why it matters:** Both themes are first-class citizens. Relying solely on `prefers-color-scheme` prevents intentional theme control, persistence, and flash-free hydration strategies.
- **Recommended solution:** Add `features/theme/` with a minimal provider that sets token values via `data-theme` attribute; default to system preference with optional override storage.
- **Priority:** P1

**Components will become theme-aware if not corrected** — ✅ **Complete (P0)**

- **Resolved:** `app/page.tsx` uses semantic token utilities (`bg-canvas`, `text-text-primary`). No `dark:` variant utilities remain.

### ❌ Missing

_None — P0 resolved._

**Theme token files for light and dark** — ✅ **Complete (P0)** — `semantic/light.css`, `semantic/dark.css`, `data-theme` + `prefers-color-scheme`

**Flash-of-incorrect-theme (FOIT) prevention**

- **Observed:** No blocking script or `color-scheme` meta strategy.
- **Why it matters:** Premium experience requires invisible theme transitions on first paint.
- **Recommended solution:** Add inline theme initialization in root layout (pattern from Next.js docs on preventing flash) once theme provider exists.
- **Priority:** P2

---

## 7. Font Setup

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| `next/font/google` integration | Cormorant (display) + Source Sans 3 (body) in `lib/fonts.ts` |
| CSS variables exposed | `--font-display-family`, `--font-body-family` |
| Subset configuration | `subsets: ["latin"]`, `display: "swap"` |
| Variables applied to `<html>` | `fontVariables` in `app/layout.tsx` |
| Font stack connected to body | `font-sans` + token `--font-sans` in `globals.css` |
| Editorial typeface selection | Cormorant + Source Sans 3 replace Geist |
| Typography scale in tokens | `primitives/typography.css` + `@theme` text utilities |

### ⚠ Needs improvement

_None — P0 font issues resolved._

### ❌ Missing

**Tabular numbers utility**

- **Observed:** Not configured.
- **Why it matters:** Required for metadata/year displays per typography rules.
- **Recommended solution:** Add `font-variant-numeric: tabular-nums` utility via token or Tailwind plugin config.
- **Priority:** P2

---

## 8. Metadata Setup

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Next.js Metadata API imported and used | `export const metadata` in `app/layout.tsx` |
| Type-safe Metadata export | `import type { Metadata } from "next"` |

### ❌ Missing

_None — P0 resolved._

**Content-driven metadata pipeline** — ✅ **Complete (P0)** — `lib/metadata/resolve-site-metadata.ts` + `buildSiteMetadata()` wired in `app/layout.tsx` from `content/site/config.json`

**Open Graph, Twitter, and canonical URLs** — ✅ **Complete (P0)** — `metadataBase`, `openGraph`, `twitter`, `alternates.canonical` generated from site config

**Structured data (JSON-LD)**

- **Observed:** No Organization, Person, or CreativeWork schema generation.
- **Why it matters:** Structured data must be derived from content schemas, not hand-written per page.
- **Recommended solution:** Add `lib/metadata/structured-data.ts` stubs for v1 entity types.
- **Priority:** P1

**Automatic sitemap and robots**

- **Observed:** No `app/sitemap.ts`, `app/robots.ts`, or generated equivalents.
- **Why it matters:** Manual sitemap maintenance is prohibited; visibility must follow content state (public → index, draft → noindex).
- **Recommended solution:** Add `sitemap.ts` and `robots.ts` wired to future content index — static site config minimum for launch.
- **Priority:** P1

**Web app manifest and icons**

- **Observed:** Only default `favicon.ico`. No `app/manifest.ts`, no `apple-icon`, no social preview images in `public/`.
- **Why it matters:** PWA polish and social sharing depend on manifest and icon conventions.
- **Recommended solution:** Add `app/manifest.ts` and icon metadata per Next.js file conventions.
- **Priority:** P2

---

## 9. ESLint / Prettier Configuration

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| ESLint 9 flat config | `eslint.config.mjs` |
| Next.js core-web-vitals rules | `eslint-config-next/core-web-vitals` |
| TypeScript ESLint rules | `eslint-config-next/typescript` |
| Lint script defined | `"lint": "eslint"` in `package.json` |
| Sensible ignore patterns | `.next/`, `out/`, `build/`, `next-env.d.ts` |

### ❌ Missing

**Prettier**

- **Observed:** No Prettier dependency, config, or format script. `18_CODING_STANDARDS.md` and development workflow expect consistent formatting alongside ESLint.
- **Why it matters:** ESLint does not enforce formatting. Without Prettier, multi-contributor and AI-generated code will drift in style, increasing review friction.
- **Recommended solution:** Add `prettier`, `prettier-plugin-tailwindcss`, `.prettierrc`, `format` script, and optional `eslint-config-prettier` to avoid rule conflicts.
- **Priority:** P1

**Lint in CI / pre-commit**

- **Observed:** No `.gitlab-ci.yml`, husky, or lint-staged configuration in repo.
- **Why it matters:** Definition of Done requires tests and build success; lint/format gates prevent scaffold violations from spreading.
- **Recommended solution:** Add CI job running `pnpm lint` and `pnpm format:check` on merge requests.
- **Priority:** P2

**Accessibility linting beyond defaults**

- **Observed:** Relies on `eslint-config-next` jsx-a11y subset only.
- **Why it matters:** Accessibility is a finish criterion; explicit a11y lint rules catch issues earlier.
- **Recommended solution:** Evaluate `eslint-plugin-jsx-a11y` extended rules or dedicated a11y test suite in `tests/`.
- **Priority:** P2

---

## 10. Accessibility Foundations

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Document language | `<html lang="en">` |
| Semantic heading on home page | `<h1>` present (scaffold) |
| Image alt text on scaffold images | `alt` attributes provided |
| External links use `rel="noopener noreferrer"` | Deploy/Docs links |

### ⚠ Needs improvement

**Scaffold uses non-semantic patterns**

- **Observed:** CTA elements are `<a>` styled as buttons without clear role distinction; centered body copy.
- **Why it matters:** Sets poor patterns before design system exists; links vs. buttons affect keyboard and screen reader behavior.
- **Recommended solution:** Replace with semantic patterns from future `design-system/primitives/` (Button, Link components).
- **Priority:** P1 (when components are introduced)

### ❌ Missing

**Focus management and visible focus styles**

- **Observed:** No `:focus-visible` token styles in global CSS; no focus ring utilities in theme.
- **Why it matters:** Full keyboard navigation requires visible, consistent focus indicators (WCAG 2.4.7).
- **Recommended solution:** Add focus ring tokens (`ring-focus`, offset, color) in global styles / tokens.
- **Priority:** P1

**Skip navigation link**

- **Observed:** Not present in root layout.
- **Why it matters:** Exhibition sites with future navigation need skip-to-content for keyboard users.
- **Recommended solution:** Add visually hidden skip link as first focusable element in root layout.
- **Priority:** P2

**Reduced motion support**

- **Observed:** No `prefers-reduced-motion` CSS or motion utility wrappers.
- **Why it matters:** Motion is a defining characteristic but must honor user preferences — non-negotiable per `context.md`.
- **Recommended solution:** Add global `@media (prefers-reduced-motion: reduce)` overrides and motion preset guards in `lib/animation/`.
- **Priority:** P1

**Color contrast validation**

- **Observed:** Scaffold colors not validated against WCAG AA; token system absent.
- **Why it matters:** AA minimum (AAA where practical) is a brand and accessibility requirement.
- **Recommended solution:** Document contrast pairs in token files; add automated contrast check in `scripts/` or tests.
- **Priority:** P1

**Accessibility test infrastructure**

- **Observed:** No `tests/` directory, no axe/playwright a11y setup.
- **Why it matters:** Accessibility must be verified, not assumed.
- **Recommended solution:** Add minimal a11y test harness per `15_TESTING_STRATEGY.md`.
- **Priority:** P2

---

## 11. Motion Foundation

### ❌ Missing

**Motion library**

- **Observed:** `motion` (formerly Framer Motion) is not in `package.json`. No animation code in repo.
- **Why it matters:** Motion is a defined stack responsibility for all animation. Without it, there is no shared preset system, reduced-motion handling, or motion token consumption.
- **Recommended solution:** Install `motion` package; create `lib/animation/` with presets (fade, reveal, stagger) consuming motion tokens.
- **Priority:** P1

**Motion wrapper pattern**

- **Observed:** No client boundary wrappers for animation; no `design-system/` motion primitives.
- **Why it matters:** Server Components are default; animation must live in small explicit client "motion wrappers" per component philosophy.
- **Recommended solution:** Add `design-system/primitives/motion/` (e.g., `FadeIn`, `Reveal`) as thin client wrappers around presets.
- **Priority:** P1

**Scroll / page transition architecture**

- **Observed:** No hooks into View Transitions API or scroll choreography utilities.
- **Why it matters:** UX principles depend on scroll-paced storytelling and calm page transitions.
- **Recommended solution:** Defer to P2; stub `features/` integration points after core presets exist.
- **Priority:** P2

---

## 12. Component Organization

### ❌ Missing

_None — P0 structure resolved._

**Entire design system directory** — ✅ **Complete (P0 structure)** — `design-system/{tokens,primitives,composites,patterns,providers,icons,shared}/` with README contracts. No placeholder components added per scope constraints.

**Feature modules**

- **Observed:** No `features/gallery/`, `navigation/`, `search/`, `contact/`, `cursor/`, `theme/`.
- **Why it matters:** Features compose the design system for application capabilities. Missing modules mean logic will leak into pages.
- **Recommended solution:** Create feature directories with README defining capability boundaries; implement `theme/` first.
- **Priority:** P1

**Server/Client boundary conventions**

- **Observed:** No `"use client"` files exist; no documented pattern for client islands.
- **Why it matters:** Hydration must be minimal and intentional.
- **Recommended solution:** Document client boundary rules in `design-system/README.md`; enforce via code review and lint where possible.
- **Priority:** P1

---

## 13. Import Aliases

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| Base alias configured | `@/*` → `./*` in `tsconfig.json` |
| Architecture-explicit aliases | `@/content/*`, `@/design-system/*`, `@/features/*`, `@/lib/*`, `@/types/*` added (P0) |

### ⚠ Needs improvement

**No enforced import boundaries**

- **Observed:** No ESLint `import/no-restricted-paths` or similar.
- **Why it matters:** `lib` must not import from `features`; circular dependencies are prohibited.
- **Recommended solution:** Add boundary lint rules when directory structure exists.
- **Priority:** P2

---

## 14. Utility Structure

### ❌ Missing

_None — P0 resolved._

**`lib/` shared infrastructure** — ✅ **Complete (P0)** — `lib/content/`, `lib/metadata/`, `lib/env.ts`, `lib/fonts.ts`; `lib/images/` and `lib/animation/` README stubs for P1

**Content source layer** — ✅ **Complete (P0)** — `content/site/config.json`, `lib/content/load-site-config.ts`

---

## 15. Environment Configuration

### ✅ Correctly configured

| Item | Evidence |
|------|----------|
| `.env*` gitignored | `.gitignore` line 34 |
| No secrets committed | No `.env` files in repo |
| Vercel-compatible defaults | Standard Next.js env conventions apply |

### ⚠ Needs improvement

**No environment documentation**

- **Observed:** No `.env.example`, no env var documentation in repo.
- **Why it matters:** `metadataBase`, analytics, contact form endpoints, and image CDN URLs will need documented, typed configuration.
- **Recommended solution:** Add `.env.example` with `NEXT_PUBLIC_SITE_URL`, placeholder keys, and comments; document in README or `docs/07-operations/`.
- **Priority:** P1

**No runtime env validation**

- **Observed:** No `lib/env.ts` with schema validation (e.g., Zod).
- **Why it matters:** Fail early in development on missing/invalid env; degrade gracefully in production per coding standards.
- **Recommended solution:** Add typed env module validating required vars at build time.
- **Priority:** P2

### ❌ Missing

**Deployment configuration**

- **Observed:** Empty `next.config.ts` (comment placeholder only). No `headers`, `images` remote patterns, or security headers.
- **Why it matters:** Image pipeline, CSP, and caching headers are part of production architecture.
- **Recommended solution:** Extend `next.config.ts` as image hosts and security requirements become known.
- **Priority:** P2

---

## Dependency Alignment

| Expected (`context.md`) | Installed | Status |
|-------------------------|-----------|--------|
| Next.js (App Router) | `next@16.2.10` | ✅ |
| React 19 | `react@19.2.4` | ✅ |
| TypeScript | `typescript@^5` | ✅ |
| Tailwind CSS v4 | `tailwindcss@^4` | ✅ |
| Motion | — | ❌ Not installed |
| MDX | — | ❌ Not installed (needed for stories/narrative content) |
| `next/image` | Used in scaffold | ✅ |
| `next/font` | Cormorant + Source Sans 3 via `lib/fonts.ts` | ✅ |
| pnpm | `pnpm-lock.yaml` | ✅ |

---

## Scaffold Debt Register

| File | Status |
|------|--------|
| `app/page.tsx` | ✅ Resolved — minimal token-based shell, no marketing content |
| `app/layout.tsx` | ✅ Resolved — content-driven metadata, editorial fonts |
| `app/globals.css` | ✅ Resolved — full token system, semantic theme, focus styles |
| `public/next.svg`, `vercel.svg`, etc. | ✅ Removed |
| `README.md` | ⚠ P2 — still generic template |

---

## Priority Matrix

| Priority | Definition | Items |
|----------|------------|-------|
| **P0** | Blocks all implementation; architectural integrity | ~~Directory skeleton, types, tokens, semantic theme, fonts, metadata pipeline, remove scaffold violations~~ **Complete** |
| **P1** | Needed before first real page ships | Motion, Prettier, route skeleton, error/loading boundaries, theme provider, sitemap/robots, a11y focus/motion |
| **P2** | Important for polish and maintainability | Import boundaries, env validation, manifest, skip link, README, CI lint/format |
| **P3** | Nice-to-have strictness | Extra TypeScript flags, tabular nums |

---

## Conclusion

P0 foundation work is **complete**. The project now has:

- Architectural directory skeleton with documented responsibilities
- v1 content type contracts and site configuration source
- Full design token hierarchy (primitive → semantic → component) with light/dark themes
- Editorial typography (Cormorant + Source Sans 3) wired through tokens
- Content-driven metadata pipeline with OG/Twitter/canonical generation
- Scaffold debt removed from `app/` and `public/`

**Remaining work is P1+:** motion library, Prettier, route skeleton, error/loading boundaries, theme provider, sitemap/robots, first design-system primitives, and accessibility test harness.

**Next document to produce:** `docs/implementation/foundation-plan.md` (P1 implementation checklist).

---

*P0 foundation implemented 2026-07-14. No feature pages or placeholder components were added.*
