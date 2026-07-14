# 16_SEO_ARCHITECTURE.md

# SEO Architecture

> "SEO is the architecture of discoverability."

---

# Purpose

This document defines how the portfolio exposes structured, discoverable, and machine-readable information throughout the application.

SEO is treated as an architectural concern rather than a marketing feature.

Every content object should naturally produce accurate metadata, structured data, canonical URLs, and social previews without requiring manual implementation.

The objective is to make discoverability an inherent property of the system.

---

# Architectural Philosophy

SEO should emerge from content.

Not from pages.

Not from components.

Not from manually written metadata.

Content owns meaning.

The SEO Architecture transforms that meaning into machine-readable information.

---

# Architectural Role

```
Content

↓

Content Model

↓

SEO Model

↓

Metadata

↓

Structured Data

↓

Search Engines
```

SEO consumes content.

It never owns content.

---

# Responsibilities

The SEO Architecture is responsible for:

- Metadata generation
- Canonical URLs
- Structured data
- Open Graph metadata
- Social sharing metadata
- XML sitemaps
- Robots directives
- Discoverability

The SEO Architecture is **not** responsible for:

- Search ranking
- Marketing strategy
- Copywriting
- Page rendering
- Navigation

---

# SEO Hierarchy

SEO exists at multiple levels.

```
Site

↓

Collection

↓

Content

↓

Media
```

Each level contributes metadata.

Higher levels establish context.

Lower levels provide specificity.

---

# Site-Level SEO

The entire portfolio defines:

- Site title
- Site description
- Default metadata
- Default social image
- Organization metadata
- Author metadata

This information applies when lower levels do not override it.

---

# Collection-Level SEO

Collections define:

- Collection title
- Description
- Cover image
- Canonical URL
- Structured collection metadata

Collections inherit global metadata where appropriate.

---

# Content-Level SEO

Every content object should expose:

- Title
- Description
- Canonical URL
- Featured image
- Publication information
- Keywords
- Relationships

Content should own its metadata.

Pages should not duplicate it.

---

# Media-Level SEO

Images should contribute:

- Alternative text
- Dimensions
- MIME type
- Aspect ratio
- Preview image

Media metadata should originate from the Image Pipeline.

---

# Metadata Inheritance

Metadata flows downward.

```
Site

↓

Collection

↓

Artwork
```

Each level may extend or override inherited values.

Inheritance should reduce duplication while preserving specificity.

---

# Canonical URLs

Every public content object should have exactly one canonical URL.

Canonical URLs should remain:

- Stable
- Human-readable
- Predictable

Duplicate representations should reference the canonical destination.

---

# Structured Data

Structured data should accurately describe content relationships.

Examples include:

Site

↓

Organization

Artwork

↓

Creative Work

Story

↓

Article

Collection

↓

Collection

Structured data should reflect the Content Model rather than UI structure.

---

# Open Graph

Every shareable content object should provide:

- Title
- Description
- Preview image
- Canonical URL
- Content type

Social metadata should be generated automatically from content.

---

# Social Platforms

Metadata should support consistent previews across:

- Facebook
- X (Twitter)
- LinkedIn
- Discord
- Messenger
- Slack

Platform-specific differences should remain implementation details.

---

# XML Sitemap

The sitemap should be generated from the content model.

Every public content object should appear automatically.

Manual sitemap maintenance should never be required.

---

# Robots Directives

Search engine directives should be determined by content visibility.

Examples:

Public

↓

Index

Draft

↓

No Index

Archived

↓

Optional

Visibility belongs to content.

Robots metadata should derive from it.

---

# Future Compatibility

The architecture should support:

- Multiple languages
- AI search engines
- Rich search experiences
- Knowledge graphs
- Additional structured data standards

Future discoverability features should integrate into the existing architecture.

---

# Performance Considerations

SEO generation should:

- Avoid duplicate computation
- Reuse content metadata
- Generate static metadata when possible
- Scale efficiently as content grows

Metadata generation should never become a runtime bottleneck.

---

# Accessibility Relationship

Accessible content naturally improves discoverability.

Examples include:

- Meaningful headings
- Alternative text
- Semantic HTML
- Logical document structure

Accessibility and SEO should reinforce one another.

---

# Anti-Patterns

Avoid:

- Hardcoded metadata
- Duplicate metadata
- Component-owned SEO
- Missing canonical URLs
- Inconsistent titles
- Keyword stuffing
- Multiple metadata sources

Metadata should always originate from content.

---

# Success Indicators

The SEO Architecture succeeds when:

- Every content object automatically generates complete metadata.
- Canonical URLs remain consistent.
- Structured data reflects the Content Model.
- New content becomes discoverable without additional implementation.
- Social sharing previews remain consistent.
- Metadata remains synchronized with content.

---

# Relationship to Other Documents

This document builds upon:

- Content Architecture
- Content Model
- Routing Architecture
- Image Pipeline
- Search Architecture

It informs:

- Performance Architecture
- Implementation Guidelines

---

# Guiding Statement

> SEO should emerge naturally from well-structured content rather than being manually engineered page by page.