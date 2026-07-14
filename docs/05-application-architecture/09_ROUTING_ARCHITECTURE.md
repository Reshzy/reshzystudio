# 09_ROUTING_ARCHITECTURE.md

# Routing Architecture

> "Routes are addresses. Navigation is movement. Experiences are destinations."

---

# Purpose

This document defines how visitors access, navigate, and discover content throughout the portfolio.

Routing is responsible for exposing experiences through meaningful, stable, and predictable URLs while remaining independent of framework-specific implementation.

The routing architecture should support growth without requiring changes to the URL structure or breaking existing links.

---

# Routing Philosophy

The portfolio is experience-driven rather than page-driven.

Routes should represent meaningful destinations instead of implementation details.

Visitors should feel like they are exploring a curated exhibition rather than navigating a collection of web pages.

URLs should remain:

- Human-readable
- Predictable
- Stable
- Shareable
- Search-friendly
- Future-proof

---

# Architectural Responsibilities

The Routing Architecture is responsible for:

- URL design
- Route hierarchy
- Content discovery
- Canonical paths
- Deep linking
- Navigation relationships
- Route stability
- Route scalability

It is **not** responsible for:

- Rendering
- Layout
- Components
- Styling
- Data fetching
- Business logic

---

# Route Hierarchy

The portfolio is organized around experiences.

```
Home

↓

Collections

↓

Artwork

↓

Stories

↓

Contact
```

Each route represents a meaningful destination within the portfolio.

---

# Primary Routes

Version 1 consists of a deliberately small number of top-level routes.

```
/

/collection

/artwork

/about

/contact
```

Future versions may introduce additional routes without altering the existing hierarchy.

Examples include:

```
/projects

/case-studies

/blog

/lab

/open-source
```

---

# Route Identity

Every route should have a stable identity.

Routes should never depend on implementation details such as:

- File names
- Component names
- Internal IDs

Instead, routes should represent meaningful concepts that remain valid over time.

---

# Dynamic Content

Dynamic routes should be driven by content identity.

Examples:

```
/collection/digital-illustration

/artwork/neon-dreams

/story/my-creative-process
```

The routing system should derive paths from content rather than requiring manual configuration.

---

# Slug Strategy

Every public content object should expose a unique slug.

A slug should be:

- Readable
- Stable
- URL-safe
- Descriptive

Good examples:

```
digital-illustration

ghost-in-the-rain

creative-process
```

Poor examples:

```
artwork-14

page-final

untitled-2
```

Slugs may evolve if necessary.

Internal identities should remain permanent.

---

# Canonical URLs

Every piece of content should have a single canonical URL.

Duplicate URLs should never represent different versions of the same content.

Canonical paths improve:

- SEO
- Sharing
- Analytics
- Content consistency

---

# Navigation Hierarchy

Navigation should reflect the conceptual structure of the portfolio.

```
Home

↓

Collection

↓

Artwork
```

Rather than:

```
Home

↓

Gallery

↓

Random Page
```

Hierarchy should communicate meaning.

---

# Deep Linking

Every significant piece of content should be directly addressable.

Examples:

An artwork

A story

A collection

Future case studies

Visitors should never need to navigate through multiple pages to share a specific work.

---

# Route Stability

URLs are part of the public interface of the portfolio.

Changing URLs should be considered a breaking change.

When restructuring content:

- Preserve existing routes whenever possible.
- Redirect obsolete routes.
- Maintain canonical references.

Stable URLs build long-term trust.

---

# Route Independence

Routes should never dictate content structure.

For example:

A single artwork may appear in:

- Homepage
- Collection
- Related Work
- Search Results

Its canonical route remains unchanged.

Routes expose content.

They do not own it.

---

# Route Composition

Complex experiences may compose multiple content types.

Example:

```
Artwork Experience

↓

Artwork

↓

Related Artwork

↓

Artist Story

↓

Next Collection
```

The route exposes the experience.

The experience composes the content.

---

# Future Expansion

The routing architecture should naturally accommodate future disciplines.

Examples:

```
/projects

/projects/[slug]

/case-studies

/blog

/experiments

/open-source
```

These should integrate without requiring changes to existing routes.

---

# Internationalization

The routing system should remain compatible with future localization.

Examples:

```
/en/artwork/...

/ja/artwork/...

/fr/artwork/...
```

Localization should extend the routing system rather than replace it.

---

# Search Integration

Search should return canonical routes.

Regardless of where content appears, selecting a result should navigate to its primary destination.

---

# SEO Integration

Routes should support:

- Clean URLs
- Canonical metadata
- Open Graph metadata
- Structured data
- Sitemap generation

Routing should strengthen discoverability rather than simply expose content.

---

# Anti-Patterns

Avoid:

- Framework-dependent URLs
- Numeric identifiers in public URLs
- Deep nesting without purpose
- Duplicate routes
- Temporary route structures
- URLs derived from presentation

Routes should describe content, not implementation.

---

# Success Indicators

The Routing Architecture succeeds when:

- URLs remain stable over time.
- Every major content object has a canonical destination.
- Navigation feels intuitive.
- Search naturally integrates with routing.
- Future content types fit existing conventions.
- Visitors can easily share and revisit individual works.

---

# Relationship to Other Documents

This document builds upon:

- Content Architecture
- Content Model
- Rendering Architecture
- Layout Architecture

It informs:

- Component Architecture
- SEO Architecture
- Search Architecture
- Next.js App Router implementation

---

# Guiding Statement

> A route should describe where a visitor is going, not how the application is built.