# 06_CONTENT_MODEL.md

# Content Model

> "Individual content creates value. Relationships create meaning."

---

# Purpose

This document defines how the portfolio's content entities relate to one another.

While the Content Schemas document defines each entity independently, this document describes how those entities collaborate to form a coherent domain model.

It establishes ownership, relationships, lifecycle rules, and invariants that every implementation should respect.

The Content Model serves as the conceptual foundation for future TypeScript interfaces, database schemas, CMS collections, search indexing, and API responses.

---

# Domain Overview

The portfolio is modeled as a connected network of content rather than isolated pages.

```
                    Site

                     │

      ┌──────────────┼──────────────┐

      │              │              │

 Profile      Collections      Stories

                    │

             contains Artwork

                    │

                 references

                    │

              Related Artwork
```

Content gains meaning through relationships rather than duplication.

---

# Domain Entities

Version 1 contains five primary entities.

```
Site Configuration

Profile

Collection

Artwork

Story
```

Each entity owns its own data.

Relationships connect entities without copying information.

---

# Entity Ownership

Ownership defines where information originates.

Every piece of information must have exactly one owner.

## Site Configuration owns

- Navigation
- Footer
- Global SEO
- Site Settings
- Theme Configuration

---

## Profile owns

- Biography
- Skills
- Experience
- Contact Information
- Social Links

---

## Collection owns

- Collection Identity
- Description
- Featured Artwork Reference
- Collection Metadata

---

## Artwork owns

- Creative Information
- Images
- Gallery
- Metadata
- Tags
- Technical Information

---

## Story owns

- Long-form Content
- Narrative
- Referenced Content

No entity should duplicate another entity's responsibilities.

---

# Relationship Model

## Collection → Artwork

Relationship

```
One Collection

↓

Many Artwork
```

A collection organizes multiple artwork.

An artwork belongs to one primary collection.

Future versions may support multiple collections if needed.

---

## Artwork → Artwork

Relationship

```
Artwork

↓

Related Artwork
```

Artwork may reference other artwork.

Examples include:

- Similar style
- Same project
- Sequential work
- Alternate version

These relationships improve exploration without creating hierarchy.

---

## Story → Artwork

Stories may reference multiple artwork.

Example:

```
Creative Process

↓

Artwork A

Artwork B

Artwork C
```

Stories enrich artwork.

Artwork remains independent.

---

## Story → Collection

Stories may reference collections.

Example:

```
Journey

↓

Illustration Collection

↓

Poster Collection
```

Again, the relationship is semantic rather than visual.

---

## Profile → Story

Profile content may reference stories describing:

- Personal philosophy
- Creative journey
- Process
- Experience

Profile should remain concise.

Stories provide depth.

---

# Cardinality

Current relationship rules:

```
Collection

1 → Many Artwork

Artwork

Many → Many Artwork (Related)

Story

Many → Many Artwork

Story

Many → Many Collection

Profile

1 → Many Story
```

Future implementations should preserve these relationships unless intentionally redesigned.

---

# Identity

Every entity requires a permanent identity.

Identity should never change.

Each entity should expose:

- ID
- Slug
- Human-readable Name

Slugs may evolve.

IDs should remain stable.

---

# Referential Integrity

Relationships should reference identities rather than duplicate data.

Correct:

```
Story

↓

Artwork ID
```

Incorrect:

```
Story

↓

Entire Artwork Object
```

Single sources of truth reduce inconsistency.

---

# Aggregates

Some entities naturally aggregate others.

Examples:

```
Collection

↓

Artwork
```

```
Homepage

↓

Featured Collection

↓

Featured Artwork
```

Aggregation creates experiences without transferring ownership.

---

# Domain Invariants

The following rules should always remain true.

## Artwork always belongs somewhere.

Every artwork should exist within a meaningful collection.

---

## Collections never duplicate artwork.

Collections organize.

Artwork owns content.

---

## Stories never replace artwork.

Stories provide context.

Artwork remains primary.

---

## Relationships are references.

Never duplicate another entity's information.

---

## Identity is permanent.

IDs remain stable.

Slugs may evolve.

---

# Lifecycle

Every entity follows a predictable lifecycle.

```
Create

↓

Validate

↓

Publish

↓

Update

↓

Archive
```

Future implementations may include:

- Drafts
- Scheduled Publishing
- Version History
- Soft Deletes
- Localization

The conceptual lifecycle remains unchanged.

---

# Extending the Model

Future entities should integrate naturally.

Example:

```
Project

↓

belongs to Collection

↓

references Story

↓

references Artwork
```

No architectural redesign should be required.

---

# Search Integration

Every entity should expose searchable information.

Examples:

Artwork

- Title
- Description
- Tags

Collection

- Name
- Description

Story

- Title
- Body

Profile

- Skills
- Biography

Search should operate across relationships rather than isolated entities.

---

# SEO Integration

Each entity owns its own metadata.

The application may derive higher-level metadata from relationships.

Example:

```
Collection

↓

Featured Artwork

↓

Social Preview
```

Relationships enrich metadata.

Ownership remains unchanged.

---

# Anti-Patterns

Avoid:

- Circular references
- Duplicate ownership
- Nested entity duplication
- UI-specific relationships
- Presentation-driven models
- Hardcoded content dependencies

The domain should remain independent of implementation.

---

# Success Indicators

The Content Model succeeds when:

- Every entity has clear ownership.
- Relationships are meaningful.
- No information is duplicated.
- Future content types integrate naturally.
- Search and SEO leverage relationships.
- The implementation mirrors the conceptual model.

---

# Relationship to Other Documents

This document builds upon:

- Content Architecture
- Content Schemas

It informs:

- Routing Architecture
- Search Architecture
- SEO Architecture
- TypeScript Interfaces
- CMS Modeling
- Database Design
- API Design

---

# Guiding Statement

> Strong content models create flexible applications. Strong relationships create meaningful experiences.