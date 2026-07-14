# 04_CONTENT_ARCHITECTURE.md

# Content Architecture

> "Content is the product. Everything else exists to present it."

---

# Purpose

This document defines how content is organized throughout the portfolio.

It establishes the architecture for creating, storing, transforming, and presenting content independently of implementation details.

The objective is to ensure that every piece of content—from a single illustration to a future case study—can integrate into the application without requiring architectural changes.

This architecture should remain stable as the portfolio evolves over time.

---

# Content Philosophy

The portfolio is fundamentally a content platform.

Visitors do not come to experience components.

They come to experience creative work.

Therefore:

- Content should be independent.
- Presentation should be reusable.
- Experiences should be composable.
- Technology should remain replaceable.

Every architectural decision should reinforce this separation.

---

# Content Hierarchy

The application organizes content using a hierarchical model.

```
Site

│

├── Collections

│      ├── Artwork

│      ├── Artwork

│      └── Artwork

│

├── Stories

│

├── Profile

│

└── Site Configuration
```

Every content type belongs somewhere within this hierarchy.

---

# Core Content Types

Version 1 introduces a deliberately small set of content types.

## Artwork

The primary content object.

Represents:

- Digital Illustration
- Graphic Design
- Posters
- Anime Artwork

Everything displayed throughout the portfolio ultimately originates from an Artwork.

---

## Collection

Groups related artwork.

Examples:

- Digital Illustration
- Posters
- Anime
- Graphic Design

Collections organize content without changing the underlying artwork model.

---

## Story

Narrative content.

Examples:

- About
- Philosophy
- Creative Process
- Journey

Stories support long-form content while remaining independent from artwork.

---

## Profile

Personal information.

Includes:

- Biography
- Skills
- Experience
- Social Links
- Contact Information

Profile content should remain centralized.

---

## Site Configuration

Global content.

Examples:

- Navigation
- Footer
- SEO defaults
- Social metadata
- Feature flags

Configuration should never be scattered across the application.

---

# Content Lifecycle

Every piece of content follows the same lifecycle.

```
Author

↓

Validate

↓

Store

↓

Transform

↓

Present

↓

Experience

↓

Archive
```

Regardless of content type, this lifecycle should remain consistent.

---

# Content Independence

Content should never depend on:

- Layouts
- Components
- Routes
- Animations
- Framework APIs

Instead:

Content should describe itself.

The application decides how to present it.

This separation allows the same content to appear in multiple contexts without duplication.

Examples:

An artwork may appear:

- On the homepage
- Inside a collection
- In related work
- In search results
- In featured content

The artwork exists only once.

---

# Content Relationships

Relationships should describe meaning rather than presentation.

Examples include:

Artwork

- belongs to Collection
- has many Tags
- has related Artwork

Collection

- contains Artwork
- has featured Artwork

Story

- references Artwork
- references Collections

Relationships should never describe UI.

Avoid concepts such as:

- Homepage Artwork
- Sidebar Artwork
- Gallery Card

Those are presentation concerns.

---

# Metadata Strategy

Every content object should include structured metadata.

Metadata enables:

- Search
- Filtering
- SEO
- Sorting
- Analytics
- Future CMS integration

Metadata should remain descriptive rather than presentational.

Good examples:

- Title
- Description
- Year
- Medium
- Software
- Tags

Poor examples:

- Hero Position
- Left Card
- Homepage Slot

---

# Content Composition

Complex experiences should emerge by composing content.

For example:

```
Homepage

↓

Featured Collection

↓

Featured Artwork

↓

Related Artwork

↓

Artist Story
```

The homepage owns composition.

Content remains independent.

---

# Future Content Types

The architecture should naturally support additional content.

Examples include:

- Frontend Projects
- Full Stack Applications
- UI/UX Case Studies
- Motion Design
- Creative Coding
- Articles
- Open Source Projects

Adding these should require:

- A new content schema.
- Optional presentation models.
- Optional experience templates.

No architectural redesign should be necessary.

---

# Content Source Abstraction

The application should never assume where content originates.

Possible sources include:

- Local files
- MDX
- JSON
- Database
- Headless CMS
- External APIs

Presentation should consume content through a common interface.

Changing the content source should not require rewriting experiences.

---

# Versioning

Content should be versionable.

Future improvements may include:

- Drafts
- Scheduled publishing
- Revision history
- Localization
- Multi-language content

The architecture should accommodate these without structural changes.

---

# Content Ownership

Every content object should have a single source of truth.

Avoid duplicate information.

If information appears in multiple places, it should be referenced rather than copied.

Consistency is more valuable than convenience.

---

# Anti-Patterns

Avoid:

- Content coupled to layouts.
- Hardcoded presentation values.
- Duplicate metadata.
- UI-specific content structures.
- Multiple representations of the same information.
- Components acting as content stores.

---

# Success Indicators

The content architecture succeeds when:

- New artwork can be published without code changes.
- Existing content can appear in multiple contexts.
- Future content types integrate naturally.
- Search and filtering work consistently.
- Presentation evolves without rewriting content.
- CMS migration remains straightforward.

---

# Relationship to Other Documents

This document provides the foundation for:

- Content Model
- Routing Architecture
- Search Architecture
- SEO Architecture
- Image Pipeline
- Implementation Strategy

Every content-related decision should align with this architecture.

---

# Guiding Statement

> Content should be created once, understood everywhere, and presented differently depending on the experience—not the implementation.