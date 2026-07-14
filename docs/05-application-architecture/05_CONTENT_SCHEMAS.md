# 05_CONTENT_SCHEMAS.md

# Content Schemas

> "A schema defines what something is, not how it is displayed."

---

# Purpose

This document defines the conceptual schemas used throughout the portfolio.

A schema describes the structure, purpose, identity, and responsibilities of a content type.

These schemas are implementation-independent.

They are not database tables, TypeScript interfaces, or CMS models.

Instead, they represent the canonical definition of every content object in the application.

All future implementations should map back to these schemas.

---

# Schema Design Principles

Every schema should be:

- Focused on a single responsibility
- Independent of presentation
- Stable over time
- Extensible without breaking existing content
- Easy to validate
- Easy to understand

Schemas should describe information—not user interfaces.

---

# Core Schemas

Version 1 defines five primary schemas.

```
Artwork

Collection

Story

Profile

Site Configuration
```

Future schemas should extend this system rather than replace it.

---

# Artwork

## Purpose

Represents a single creative work.

The Artwork schema is the foundation of the portfolio.

Everything visitors experience ultimately begins here.

---

## Responsibilities

Artwork owns:

- Identity
- Metadata
- Media
- Creative information
- Relationships

Artwork does **not** own:

- Layout
- Navigation
- Animation
- Presentation

---

## Suggested Fields

### Identity

- Title
- Slug
- ID

### Description

- Summary
- Full Description
- Narrative

### Creative Information

- Medium
- Category
- Collection
- Year Created
- Status

### Media

- Cover Image
- Gallery Images
- Thumbnail
- Optional Video

### Technical Information

- Software Used
- Dimensions
- Aspect Ratio
- Color Palette

### Organization

- Tags
- Featured Flag
- Related Artwork

### SEO

- Meta Title
- Meta Description
- Social Image

---

# Collection

## Purpose

Organizes artwork into meaningful groups.

Collections improve discovery without changing the Artwork schema.

Examples:

- Digital Illustration
- Posters
- Graphic Design
- Anime

Future examples:

- Frontend Projects
- UI Case Studies
- Motion Design

---

## Responsibilities

Collection owns:

- Identity
- Description
- Featured Artwork
- Collection Metadata

It never duplicates artwork information.

---

## Suggested Fields

- Name
- Slug
- Description
- Cover Image
- Featured Artwork
- Display Order
- SEO Metadata

---

# Story

## Purpose

Represents narrative content.

Stories communicate ideas rather than showcase artwork.

Examples:

- About
- Creative Philosophy
- Design Process
- Journey
- Manifestos

---

## Responsibilities

Story owns:

- Long-form writing
- Rich media references
- Artwork references

Stories should remain independent from presentation.

---

## Suggested Fields

- Title
- Slug
- Summary
- Body
- Featured Image
- Referenced Artwork
- Referenced Collections
- Published Date

---

# Profile

## Purpose

Represents the creator.

Centralizing profile information ensures consistency across the application.

---

## Responsibilities

Profile owns:

- Biography
- Skills
- Experience
- Social Links
- Contact Information
- Current Focus

The application should reference this schema rather than duplicate personal information.

---

## Suggested Fields

- Name
- Short Bio
- Full Biography
- Location
- Skills
- Tools
- Education
- Experience
- Social Links
- Email
- Profile Image

---

# Site Configuration

## Purpose

Stores global application content.

This schema represents information shared across the entire portfolio.

---

## Responsibilities

Examples include:

- Site Name
- Navigation
- Footer
- Default SEO
- Social Metadata
- Theme Settings
- Feature Flags

Application-wide configuration belongs here rather than being scattered throughout the codebase.

---

# Shared Schema Characteristics

All schemas should provide:

## Identity

Every content object requires a stable identifier.

Identity should remain permanent.

---

## Metadata

Every object should expose structured metadata for:

- Search
- SEO
- Sorting
- Filtering
- Analytics

---

## Relationships

Schemas should reference one another rather than duplicate information.

Examples:

Artwork references Collection.

Story references Artwork.

Collection references Artwork.

Relationships should always express meaning.

---

## Versionability

Schemas should support future capabilities such as:

- Drafts
- Revisions
- Localization
- Scheduled Publishing
- Multiple Authors

Version 1 may not implement these features, but the architecture should not prevent them.

---

# Future Schemas

Version 2 may introduce:

- Project
- Case Study
- Motion Piece
- Article
- Experiment
- Open Source Repository

These should follow the same principles established here.

No new schema should require architectural changes.

---

# Anti-Patterns

Avoid:

- UI-specific fields
- Component-specific data
- Layout instructions
- Animation settings
- Duplicate metadata
- Multiple sources of truth

Schemas should describe content—not implementation.

---

# Relationship to Other Documents

This document defines the individual content entities used by:

- Content Model
- Routing Architecture
- Search Architecture
- SEO Architecture
- Image Pipeline
- TypeScript Interfaces
- CMS Integration

---

# Guiding Statement

> Schemas define the language of the portfolio. Every future feature should speak this language rather than invent its own.