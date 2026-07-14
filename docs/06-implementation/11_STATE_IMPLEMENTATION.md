# 11_STATE_IMPLEMENTATION.md

# State Implementation

> "Store only what cannot be derived."

---

# Purpose

This document defines how application state is implemented throughout the portfolio.

It translates the State Architecture into practical implementation guidelines while preserving the project's server-first philosophy.

The objective is to minimize state, localize ownership, and ensure that every piece of state has a clear purpose and lifecycle.

---

# Implementation Goals

The state system should be:

- Minimal
- Predictable
- Localized
- Type-safe
- Server-first
- Easy to reason about
- Easy to debug

State should support the application rather than define it.

---

# State Hierarchy

State follows the architectural hierarchy.

```
Server State

↓

URL State

↓

Application State

↓

Experience State

↓

Component State
```

Lower levels should never duplicate higher-level state.

---

# Server State

Server State is the default.

Examples include:

- Artwork
- Collections
- Stories
- Site configuration
- Navigation
- Metadata

Characteristics:

- Read-only
- Server-owned
- Cached
- Typed

Server State should never be copied into client state without a clear justification.

---

# URL State

State that affects navigation or discoverability belongs in the URL.

Examples include:

- Search query
- Active filters
- Sort order
- Current page

Benefits include:

- Shareable links
- Browser navigation
- Refresh persistence
- Deep linking

Only meaningful application state belongs in the URL.

---

# Application State

Application State affects the entire portfolio.

Examples include:

- Theme
- Reduced motion preference
- Navigation drawer
- Global search visibility

Application State should remain intentionally small.

Global state is not a convenience layer.

---

# Experience State

Experience State belongs to a specific route or experience.

Examples:

Artwork Experience

- Active gallery image
- Lightbox visibility
- Zoom level

Collection Experience

- Active category
- Current filter

Experience State should disappear when leaving the experience.

---

# Component State

Component State remains private.

Examples include:

Button

- Hover
- Focus

Accordion

- Expanded

Tooltip

- Visible

Component State should never become global.

---

# Derived State

Derived information should never be stored.

Examples:

Good

```
Collection Count

↓

Calculated
```

Poor

```
Collection Count

↓

Stored Separately
```

If a value can be computed reliably, it should remain derived.

---

# State Ownership

Every piece of state has one owner.

Examples:

Gallery

Owns:

- Active image

Search

Owns:

- Query

Theme

Owns:

- Current theme

Ownership should always be obvious.

---

# Data Flow

State flows downward.

```
Server

↓

Experience

↓

Component
```

Updates travel upward through explicit actions.

Components should not mutate external state directly.

---

# Client State

Client state should exist only when browser interaction requires it.

Examples include:

- Hover state
- Modal visibility
- Search input
- Gallery interaction

Avoid storing static content in client state.

---

# Context Usage

Context should be used sparingly.

Appropriate use cases include:

- Theme
- Accessibility preferences
- Global overlays

Context should not become a general-purpose state container.

---

# Synchronization

Duplicate state is prohibited.

Incorrect:

Gallery

↓

Current Image

Sidebar

↓

Current Image

Correct:

Gallery

↓

Current Image

Sidebar

↓

Reads Gallery State

Single ownership prevents inconsistencies.

---

# Persistence

Only persistent preferences should survive browser sessions.

Examples include:

- Theme
- Reduced motion preference
- Future language preference

Transient UI state should reset naturally.

---

# Server Actions

Server Actions should update server-owned information.

Client state should synchronize through rendering rather than manual duplication.

Server Actions should not become an alternative state management system.

---

# Performance

State updates should remain localized.

Avoid:

- Global updates
- Unnecessary re-renders
- Deep state trees
- Frequent synchronization

The smallest possible state boundary is usually the best one.

---

# Implementation Rules

The following rules are mandatory.

✓ Server State is the default.

✓ State has one owner.

✓ Derived values are not stored.

✓ URL State represents navigation.

✓ Component State remains local.

✓ Global state remains minimal.

---

# Prohibited Practices

The following are prohibited.

✗ Global state for convenience.

✗ Duplicated state.

✗ Derived state stored separately.

✗ Components mutating unrelated state.

✗ Server content copied into client state.

✗ Hidden synchronization logic.

---

# Future Evolution

The state implementation should naturally support future capabilities including:

- Authentication
- User preferences
- Dashboard features
- Personalized experiences

Future state should integrate into the existing hierarchy rather than introducing new patterns.

---

# Success Indicators

The State Implementation succeeds when:

- State ownership is always obvious.
- Server rendering remains the primary data source.
- Global state stays intentionally small.
- Components remain predictable.
- Derived values replace stored values.
- Debugging state changes is straightforward.

---

# Relationship to Other Documents

This document implements:

- State Architecture
- Rendering Implementation
- Component Implementation

It informs:

- Search Implementation
- Performance Implementation
- Coding Standards

---

# Guiding Statement

> Every piece of state should justify its existence, own a single responsibility, and disappear when it is no longer needed.