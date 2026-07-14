# AI Implementation Context

> Permanent implementation handbook for all AI agents working on this project.
> This is a synthesized reference, not a summary of the docs. When it conflicts with
> implementation convenience, this document (and the philosophy behind it) wins.
> When in doubt, choose simplicity, clarity, timelessness, and restraint.

Read this fully before writing any code. Target read time: ~10 minutes.

---

## Project Overview

**Rodge Andru Portfolio** (repo: `reshzystudio`) — owner **Rodge Andru P. Viloria**. A premium
online **exhibition**, not a traditional portfolio, dashboard, or SaaS app. It should feel like
walking through a contemporary art museum: the artwork is the hero, the interface disappears, the
experience remains. The website itself is one of the showcased works.

- **Framework:** Next.js (App Router). **Deploy:** Vercel.
- **Version 1 scope:** artwork only — Digital Illustrations, Graphic Design, Posters, selected
  creative work.
- **Explicitly excluded from v1:** frontend projects, full-stack projects, blog, articles, client
  work, CMS. **Do not build placeholder pages for future content** unless explicitly instructed.
- **Designed to evolve without redesign.** Future versions add frontend/full-stack projects,
  UI/UX case studies, motion design, creative coding, articles, open source. Never make
  architectural decisions that block this growth.

---

## Product Goals

The finished site should make visitors first think *"This artist has exceptional taste,"* and only
later realize *"This artist also has exceptional technical ability."* That discovery order is
intentional — earn admiration through experience, not explanation.

Emotional arc every page should serve: **Wonder → Curiosity → Exploration → Admiration → Respect →
Inspiration.** Visitors should grasp the artist's identity within ~5 seconds of landing.

Success = a site that feels thoughtful, curated, and premium; excellent Core Web Vitals; fully
accessible; effortless to extend into future disciplines.

---

## Brand Identity

**Personality:** Elegant, Premium, Editorial, Minimal, Confident, Intentional, Thoughtful, Timeless.
**Never** loud, flashy, or trendy.

**Voice / copywriting:** Editorial, thoughtful, minimal, professional, confident, never arrogant.
Write less, say more. Every sentence must earn its place — if removing a sentence improves the page,
remove it.

- **Never write:** "I am passionate…", "I've always loved…", "Creative problem solver",
  "Results-driven", "Thinking outside the box", "Hardworking", "Dedicated", marketing clichés, or
  AI-sounding intros.
- **Instead describe:** the work, the process, the intention, the outcome.
- Paragraphs: 1–4 sentences. Prefer editorial headlines ("Selected Work", "Collection", "Studio",
  "Archive") over generic ones ("My Projects", "Gallery").
- CTAs: "Explore Collection", "View Artwork", "Read Story", "Start a Conversation" — not "Click
  Here", "Hire Me", "Learn More".

---

## UX Principles

Experience-driven, not page-driven — visitors explore a curated exhibition. Priority when making
any tradeoff (**never reorder**):

1. User experience
2. Design consistency
3. Performance
4. Accessibility
5. Developer convenience

- **Navigation** mirrors the conceptual hierarchy: Home → Collection → Artwork → Story → Contact.
  Every significant work is deep-linkable and shareable via a stable canonical URL.
- **Scroll** paces storytelling: reveal content progressively; motion connects sections and guides
  attention. Curation over volume — never dump every artwork on screen.
- **Interaction** is calm and physical: nothing teleports, everything enters/leaves naturally.
- Every element must justify its existence. If a feature doesn't improve the experience, it should
  not exist.

---

## Visual Design Principles

The interface frames the artwork and never competes with it. Less is more; whitespace is
intentional; typography and motion create hierarchy and rhythm.

**Avoid entirely:** glassmorphism, heavy gradients, neon aesthetics, gaming UI, dashboard layouts,
generic portfolio templates, Material Design look, Bootstrap look, excessive decoration, random
animations, shadow overuse.

- **Color:** color frames the artwork, never competes. Both **dark and light themes are
  first-class**. Neutral background + neutral text + a single accent used sparingly (buttons,
  links, selections, cursor — never large backgrounds). Semantic states: success=green,
  warning=amber, error=red. **Never tint artwork or overlay gradients on it** — respect original
  colors. Meet **WCAG AA minimum, AAA where practical.**
- **Typography** is architecture. Editorial / museum / magazine feel. Large, bold, short, confident
  headlines. Hierarchy from scale, weight, spacing, alignment — **not color alone.** Left-align
  body; avoid centered body text and long paragraphs; comfortable reading width and line height;
  tabular numbers where appropriate.
- **Layout:** 12-column responsive grid, defined max content width, consistent gutters, whitespace
  as a layout element. Artwork pages may intentionally break the grid when it improves presentation.
- **Spacing:** 8-point system — `4, 8, 16, 24, 32, 48, 64, 96, 128`. No arbitrary spacing values.
- **Responsive:** desktop-first design, mobile-first implementation; tablet gets equal attention.
  Adapt layouts per breakpoint — never just shrink the desktop version.
- **Imagery:** artwork always high quality; respect original aspect ratios; never crop aggressively;
  seamless loading; no compression artifacts. Presentation quality > loading many images at once.

---

## Motion Principles

Motion is a defining characteristic but must **communicate, never decorate.** Every animation must
answer at least one: *What changed? Where should I look? What is connected? What happens next?* If
none apply, remove it.

- **Feel:** elegant, confident, physical, smooth, responsive, editorial. **Never** playful,
  cartoonish, chaotic, aggressive, or random.
- **Timing tiers:** Micro 100–200ms · Small 200–350ms · Medium 350–500ms · Large 500–800ms · Hero
  800–1200ms. Never exceed 1500ms without narrative purpose. Fast interactions, slow storytelling.
- **Easing:** prefer ease-out, ease-in-out, and a shared custom cubic-bezier; spring only when
  appropriate. Avoid linear (for UI), elastic, bounce, overshoot. Reuse curves — don't give every
  animation unique timing.
- **Hierarchy:** Primary (page changes, hero/gallery reveals) · Secondary (hover, cards, nav,
  cursor) · Micro (buttons, links, inputs, loading) · Background (grain/light/ambient — nearly
  invisible).
- Animate `transform`/`opacity`; avoid layout thrashing; limit simultaneous animations; **always
  honor `prefers-reduced-motion`** (simplify/remove non-essential movement, preserve function).

---

## Architecture Overview

**Server-first.** Server Components are the default; Client Components exist only where browser
interaction is genuinely required (interactive gallery, search, filters, cursor, gesture/scroll
motion, user input). Prefer static generation / build-time work; keep hydration minimal.

**Rendering pipeline** (one responsibility per stage, deterministic, side-effect-free):
`Content Source → Content Loader → Validation → Transformation → Presentation Model → Server
Component → (optional) Client Enhancement → Rendered Experience`.
Components **consume immutable presentation models** — they never load content, resolve
relationships, or run business logic. New data sources (JSON → DB → CMS → API) should replace only
the Content Loader stage; everything downstream stays unchanged.

**Content is structured, presentation-independent.** Five v1 schemas: **Artwork, Collection, Story,
Profile, Site Configuration.** Structured data (e.g. artwork metadata) stays structured (JSON/typed
data); **MDX is only for narrative/long-form content** (stories, articles, docs) — never the primary
store for structured metadata. Schemas describe *what content is*, not how it's displayed; they
carry no UI/layout/animation fields. Relationships reference rather than duplicate (Artwork ↔
Collection ↔ Story). Design for future capabilities (drafts, revisions, localization, scheduling)
without requiring them in v1.

**Artwork suggested fields:** identity (title, slug, id); description (summary, full, narrative);
creative info (medium, category, collection, year, status); media (cover, gallery, thumbnail,
optional video); technical (software, dimensions, aspect ratio, color palette); organization (tags,
featured flag, related); SEO (meta title, meta description, social image).

**Routing** (v1 top-level): `/`, `/collection`, `/artwork`, `/about`, `/contact`. Dynamic:
`/collection/[slug]`, `/artwork/[slug]`, `/story/[slug]`. Slugs are readable, stable, URL-safe,
descriptive (`ghost-in-the-rain`, not `artwork-14`). URLs are a public interface — changing one is a
breaking change; redirect obsolete routes. Never put numeric IDs in public URLs. Future routes
(`/projects`, `/case-studies`, `/blog`, `/lab`, `/open-source`, and `/[locale]/...`) must slot in
without altering existing ones.

**Tech stack (each tool owns one responsibility):** Next.js (framework/routing/rendering/metadata/
build), React 19 (UI composition), TypeScript (type contracts), Tailwind CSS v4 (styling/token
implementation), **Motion** (animation), `next/image` (image pipeline), `next/font` (fonts), MDX
(rich narrative content), Vercel (deploy). Architecture stays portable and framework-independent;
business logic lives outside the framework. Small, deliberate dependency footprint.

> Repo currently ships a stock Next.js scaffold (Next 16.x, React 19.x, Tailwind v4, TypeScript,
> pnpm). Some docs say "Next.js 15"; treat the installed version as source of truth for APIs.

---

## Design System Overview

Single source of truth for visual decisions, implemented as **design tokens** consumed everywhere.
Token hierarchy (dependencies flow downward only):

`Primitive Tokens (raw values) → Semantic Tokens (meaning) → Component Tokens (usage) → Components`

- **Primitives** (base colors, type scale, font families, spacing, radii, shadows, opacity,
  breakpoints, motion values) are internal — components never reference them directly.
- **Semantic tokens** name purpose: `surface.primary`, `text.primary`, `text.secondary`,
  `accent.primary`, `border.default`, `background.canvas`.
- **Component tokens** specialize semantics: `button.primary.background`, `card.border`,
  `navigation.background`, `gallery.frame`.
- **Motion tokens** (duration, delay, easing, spring) are tokens too — animations consume them, not
  hardcoded values.
- **Theming** changes token *values* only; the same components render in both themes with no
  duplication. Components are unaware of the active theme.
- Token names describe intent and stay stable (`text.primary`, `spacing.section` — never `gray500`,
  `margin24`, `orangeHover`). Evolve by extension; deprecate gracefully.

**Styling architecture:** Tailwind v4 is utility-first and token-driven. Compose utilities *inside*
reusable components rather than scattering utility-heavy markup. Global CSS stays minimal (reset,
typography defaults, selection, scrollbar, theme variables). Custom CSS is exceptional. Variants are
finite and semantic (Button: primary/secondary/ghost; Card: standard/featured/compact).

---

## Component Philosophy

Components are **implementation units, not architectural units.** Each owns exactly one
responsibility; they render presentation models and never hold business logic.

Hierarchy (compose upward, depend downward): `Primitive → Composite → Pattern → Experience →
Template`. Compose via nesting/slots, not inheritance. Reusable UI lives in `design-system/`;
feature-specific UI lives in its feature module.

- **Server Components by default.** Wrap only the elements needing browser motion/interaction in
  small explicit Client boundaries ("motion wrappers"); the Server Component keeps owning rendering.
- **Props describe intent** (`artwork`, `collection`, `featured`, `orientation`) — never
  implementation (`marginTop`, `customWidth`, `colorHex`, `animationDuration`). Visual decisions
  belong to the design system.
- Local state only; small focused components; avoid deep trees, prop drilling, and duplication.
- Every component's contract includes its accessibility behavior. Consume tokens for all styling —
  never hardcode color/spacing/typography.

---

## Coding Standards

Code communicates intent before implementation; readable beats clever. Every implementation should
be simple, predictable, explicit, composable, typed, testable, accessible, performant.

- Before writing new code ask: does this already exist? can an existing system be extended? does it
  preserve architectural boundaries? does it add unnecessary complexity? **Reuse before creating.**
- One responsibility per file (one component / loader / schema / utility / preset). Large files
  signal mixed responsibilities.
- Functions do one task with clear inputs, predictable outputs, no hidden side effects; prefer pure
  logic. Decompose long functions.
- **TypeScript:** explicit interfaces, model domain concepts, share contracts, avoid needless `any`;
  types communicate intent.
- Errors fail early and loudly in development; degrade gracefully in production; no silent failures.
- Comment only for non-obvious intent/tradeoffs/constraints — never narrate what the code does.
- **Prohibited:** hidden side effects, duplicate implementations, arbitrary abstractions, business
  logic in UI, hardcoded design values, unreviewed architectural shortcuts, undocumented tech debt.

**AI-specific workflow:** understand architecture *before* implementing
(`Architecture → Requirements → Implementation → Review`); never jump straight to code. Reference
the relevant docs, preserve boundaries, generate small strongly-typed modular code, prefer extending
existing systems, keep docs synchronized. Documentation — not the AI — is the source of truth. AI
output follows the same review bar as human code.

---

## Accessibility Standards

Accessibility is not optional — it is part of "finished" and an expression of respect. Every
component/feature must preserve:

- Semantic HTML and logical heading order.
- Full keyboard navigation and visible, well-managed focus.
- Screen-reader compatibility; ARIA only where semantics fall short (meaningful labels, alt text).
- `prefers-reduced-motion` support on all motion.
- **Contrast: WCAG AA minimum, AAA where practical.**
- Responsive, touch-friendly layouts on every device.

Accessibility and SEO reinforce each other — good semantics improve both.

---

## Performance Standards

Performance is engineered continuously, not optimized at the end; it is part of the design language
(fast feels confident, smooth feels trustworthy). The core technique is **preventing unnecessary
work** — avoid rendering, downloading, hydrating, recalculating, and duplicating.

- Server Components + static generation + build-time computation are the defaults; every Client
  Component must justify itself. Ship JS intentionally; hydrate only interactive islands; prefer
  native browser capabilities; remove dead code.
- Route-based code splitting; lazy-load interactive features; avoid large shared bundles.
- Images via the `next/image` pipeline: responsive variants, modern formats, placeholders, no layout
  shift, efficient caching. Fonts via `next/font`: subset, prefer variable fonts, non-blocking.
- Animate `transform`/`opacity`; respect reduced motion; limit concurrent animations.
- **Measure before optimizing.** Track LCP, INP, CLS, TTFB. Every PR asks: does this add client JS?
  add unnecessary rendering? can it stay a Server Component? can work move to build time? can assets
  be reused?
- Aim for excellent Lighthouse / Core Web Vitals. Never trade performance for decorative effects.

---

## SEO Standards

Metadata is **generated from content, never manually synchronized.** Every public content object
runs the same automatic pipeline:
`Content → Schema Validation → Metadata Resolution → Structured Data → Canonical URL → Social
Metadata → Next.js Metadata API → Rendered HTML`.

- Use the Next.js Metadata API with dynamic generation; **no hardcoded page metadata.**
- Exactly one stable, human-readable canonical URL per content object.
- Structured data derived from content: Organization, Person, CreativeWork, Collection (Article
  later). Social/OG metadata (title, description, preview image, canonical URL, type) generated from
  a shared source.
- Sitemap and robots are **generated automatically** from content and visibility (public → index,
  draft → noindex). Manual sitemap maintenance is prohibited.
- Image alt text/dimensions/variants come from the image pipeline; SEO consumes, never invents them.

---

## Folder Structure

Folders express **responsibilities**, not technologies or file types. A contributor should
understand the architecture from the directory tree. Dependencies flow inward:
`app → features → design-system → lib → types`. Circular dependencies are prohibited.

```
/
  app/              Application entry points only: routes, layouts, templates,
                    error/loading boundaries, metadata. Kept thin — no business logic.
  content/          Content source: artwork, collections, stories, site config, MDX.
                    Framework-independent.
  design-system/    Reusable UI + tokens:
                    primitives/ composites/ patterns/ providers/ icons/ tokens/ shared/
  features/         Application capabilities: gallery/ navigation/ search/ contact/
                    cursor/ theme/  (compose the design system; never redefine it)
  lib/              Shared infrastructure utilities: content loading, metadata
                    generation, image utils, search indexing, animation helpers.
  types/            Shared TypeScript contracts mirroring the content model.
  public/           Static assets: favicon, social images, robots, manifest, static media.
  scripts/          Dev automation (image optimization, metadata gen, content validation).
  tests/            Unit, integration, a11y, visual regression, e2e.
  docs/             Project documentation (this file lives in docs/ai/).
```

> The existing scaffold uses a flat `app/` at the repo root. Introduce the directories above as the
> real implementation begins; growth should be additive — new features = a new feature module, not a
> restructure.

---

## Naming Conventions

- **Directories** describe responsibilities: `gallery`, `navigation`, `tokens`, `search`. **Avoid**
  `helpers`, `utils`, `misc`, `common`, `stuff`, `new`, `v2`.
- **Components/services** name intent: `ArtworkCard`, `GalleryGrid`, `SearchService`,
  `ImagePipeline`, `ContentLoader`. **Avoid** `Helper`, `Utils`, `Manager`, `DataThing`,
  `TempComponent`, `FinalVersion2`.
- **Tokens** name purpose and stay stable: `text.primary`, `surface.default`, `spacing.section`,
  `shadow.medium`. **Avoid** `gray500`, `margin24`, `radius12`, `orangeHover`.
- **Slugs** readable/stable/descriptive: `digital-illustration`, `creative-process`. **Avoid**
  `artwork-14`, `page-final`, `untitled-2`.
- **Git branches:** `feature/…`, `fix/…`, `refactor/…`, `docs/…` (short-lived).
- **Commit messages:** concise, specific, action-oriented, project-perspective ("Add keyboard
  navigation support", "Optimize image loading strategy"). **Avoid** "Update", "Fix stuff", "Misc".

---

## Engineering Principles

Durable beliefs that outlive any framework and take precedence under uncertainty:

- **Build for people.** If a technical choice helps the implementation but hurts the experience,
  reconsider it.
- **Craftsmanship is visible** through consistency, clarity, responsiveness, accessibility,
  performance, and attention to detail.
- **Simplicity requires discipline.** Every addition must justify its complexity; subtraction is a
  first-class tool.
- **Design is communication** — typography, spacing, motion, color, and layout all carry meaning.
- **Architecture exists for change** — success is making tomorrow's changes cheaper.
- **Technology is temporary; principles endure.** Build on enduring ideas, keep the architecture
  portable and replaceable.
- **Consistency builds trust; document decisions; build systems, not moments.**
- **Curate relentlessly** — the portfolio is an editorial product, not an archive; every page and
  interaction justifies its existence.
- **Protect the identity** (craftsmanship, clarity, engineering discipline, design philosophy) even
  as everything else evolves. **Leave every version better.**

Operational cadence: main branch always releasable; small focused commits and PRs; review before
merge (architecture, correctness, simplicity, a11y, performance, consistency, docs); keep code and
docs in sync; every change reversible.

---

## Definition of Done

A task is complete only when **all** of the following hold:

- Requirements are satisfied and architectural boundaries are respected.
- Code is readable, single-responsibility, and reuses existing systems where possible.
- TypeScript types are correct and express intent; no stray `any`.
- Styling uses tokens only — no hardcoded colors, spacing, or typography.
- Server-first preserved; Client boundaries are minimal and justified.
- Accessibility verified: semantics, keyboard, focus, screen reader, reduced motion, AA contrast.
- Performance acceptable: no needless client JS/rendering; assets optimized; measured where relevant.
- SEO/metadata generated from content (where applicable), with a canonical URL.
- Tests pass; the project builds successfully.
- Documentation updated to match the change.

Completion is measured by quality, not code volume. If a change doesn't leave the project clearer,
more maintainable, or more expressive, it isn't done.
