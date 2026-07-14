# 02_PROJECT_STRUCTURE.md

# Project Structure

> "Folder structures should express architecture, not implementation details."

---

# Purpose

This document defines the physical organization of the project repository.

The project structure is designed to reflect the architectural systems established throughout this documentation rather than the conventions of any particular framework.

A contributor should be able to understand the application's architecture simply by browsing the directory tree.

---

# Structural Philosophy

Folders represent responsibilities.

They do not represent technologies.

They do not represent file types.

They do not represent temporary implementation choices.

The directory structure should remain understandable even if individual technologies evolve.

---

# High-Level Repository Structure

```
/

app/

content/

design-system/

features/

lib/

types/

public/

docs/

scripts/

tests/
```

Each top-level directory owns a distinct architectural responsibility.

---

# app/

Purpose:

Application entry points.

Owns:

- Routes
- Layouts
- Templates
- Error boundaries
- Loading states
- Metadata entry points

The `app` directory should remain intentionally thin.

Business logic should not accumulate here.

---

# content/

Purpose:

Content source.

Contains:

- Artwork
- Collections
- Stories
- MDX
- Site configuration

This directory represents the application's content layer.

It should remain framework-independent whenever possible.

---

# design-system/

Purpose:

Implementation of the Design System.

Contains:

```
primitives/

composites/

patterns/

tokens/

icons/
```

Every reusable UI building block belongs here.

Feature-specific UI should not.

---

# features/

Purpose:

Application capabilities.

Examples:

```
gallery/

navigation/

search/

contact/

cursor/

theme/
```

Features compose the Design System.

They do not redefine it.

---

# lib/

Purpose:

Shared implementation utilities.

Examples:

- Content loading
- Metadata generation
- Image utilities
- Search indexing
- Animation helpers

Utilities should remain framework-aware but feature-independent.

---

# types/

Purpose:

Shared TypeScript definitions.

Examples:

- Content interfaces
- Utility types
- Shared contracts
- Public API types

Type definitions should mirror the Content Model.

---

# public/

Purpose:

Static assets.

Examples:

- Icons
- Favicon
- Static media
- Social images
- Robots
- Manifest

Large artwork should not be manually organized here if it is managed by the content pipeline.

---

# docs/

Purpose:

Project documentation.

Includes:

- Foundation
- Architecture
- Implementation
- Operations
- Future Roadmap

Documentation should evolve alongside the codebase.

---

# scripts/

Purpose:

Development automation.

Examples:

- Image optimization
- Metadata generation
- Content validation
- Build helpers

Scripts should automate repetitive work rather than contain application logic.

---

# tests/

Purpose:

Project-wide testing.

Examples:

- Unit tests
- Integration tests
- Accessibility tests
- Visual regression
- End-to-end tests

Testing should mirror architectural systems rather than implementation details.

---

# Folder Ownership

Each folder owns a single responsibility.

```
app

↓

Application

content

↓

Content

design-system

↓

UI

features

↓

Capabilities

lib

↓

Infrastructure

types

↓

Contracts
```

Responsibilities should not overlap.

---

# Dependency Direction

Dependencies should flow inward.

```
app

↓

features

↓

design-system

↓

lib

↓

types
```

Lower-level systems should never depend on higher-level systems.

Circular dependencies should be prevented by design.

---

# Naming Principles

Directory names should describe responsibilities.

Good:

```
gallery

navigation

content

tokens

search
```

Avoid:

```
helpers

misc

common

stuff

new

v2
```

Names should remain meaningful as the project evolves.

---

# Scalability

Adding new features should require:

- A new feature module
- Optional new content
- Optional new components

Existing architecture should remain unchanged.

Growth should be additive.

---

# Anti-Patterns

Avoid:

- Technology-driven folders
- Generic utility folders
- Duplicate component locations
- Business logic inside `app`
- Feature-specific design systems
- Circular dependencies

The folder structure should reinforce architectural boundaries.

---

# Success Indicators

The Project Structure succeeds when:

- Contributors understand the architecture from the directory tree.
- New features integrate without restructuring.
- Responsibilities remain clearly separated.
- Components remain reusable.
- Business logic stays outside framework entry points.
- The repository scales without becoming disorganized.

---

# Relationship to Other Documents

This document builds upon:

- Application Architecture
- Component Architecture
- Content Architecture
- Implementation Philosophy

It informs:

- App Router Architecture
- Component Implementation
- Content Implementation
- Coding Standards

---

# Guiding Statement

> Every directory should communicate a responsibility. If a folder cannot explain why it exists, it should not exist.