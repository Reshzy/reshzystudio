# 14_STATE_ARCHITECTURE.md

# State Architecture

> "State should exist only where it is needed, for only as long as it is needed."

---

# Purpose

This document defines how application state is organized, owned, and managed throughout the portfolio.

The primary objective is to minimize unnecessary state while maintaining predictable behavior, high performance, and clear ownership.

Because the portfolio is primarily content-driven rather than application-driven, state management should remain intentionally lightweight.

---

# Architectural Philosophy

State is a cost.

Every piece of state introduces:

- Synchronization
- Re-rendering
- Complexity
- Debugging overhead

Therefore:

If something can be derived,
it should not be stored.

If something can remain local,
it should not become global.

If something can be server-rendered,
it should not become client state.

---

# Architectural Role

```
Content

↓

Rendering

↓

Interaction

↓

State

↓

UI Update
```

State responds to interaction.

It never owns content.

---

# State Categories

The application recognizes four categories of state.

```
Server State

↓

Application State

↓

Experience State

↓

Component State
```

Each category has a clearly defined responsibility.

---

# Server State

Server State represents information loaded from the content source.

Examples include:

- Artwork
- Collections
- Stories
- Profile
- Navigation
- Site configuration

Characteristics:

- Read-only during rendering
- Cached when appropriate
- Server-owned
- Source of truth

Server State should never be duplicated in client-side state unless necessary.

---

# Application State

Application State affects the entire application.

Examples include:

- Theme selection
- Search query
- Reduced motion preference
- Global overlays
- Navigation menu
- Current locale (future)

Characteristics:

- Shared
- Persistent during navigation
- Minimal in scope

Only truly global concerns belong here.

---

# Experience State

Experience State exists only within a specific experience.

Examples:

Artwork Experience:

- Current gallery image
- Zoom level
- Lightbox visibility

Collection Experience:

- Active filter
- Sort order
- Current page

Home Experience:

- Intro completed
- Featured section progress

Experience state should be discarded when leaving the experience.

---

# Component State

Component State belongs exclusively to a single component.

Examples:

Button

- Hover
- Pressed
- Focus

Accordion

- Expanded

Input

- Current value

Tooltip

- Visible

Component state should never escape its owning component.

---

# State Ownership

Every piece of state has exactly one owner.

Examples:

Gallery

Owns:

- Active image

Navigation

Owns:

- Open / Closed

Search

Owns:

- Current query

Artwork Card

Owns:

- Hover

Ownership should never be ambiguous.

---

# State Lifetime

Every state should have a defined lifetime.

```
Transient

↓

Experience

↓

Session

↓

Persistent
```

Examples:

Hover

↓

Transient

Gallery Position

↓

Experience

Theme

↓

Persistent

Understanding lifetime prevents unnecessary persistence.

---

# Derived State

Whenever possible, derive state instead of storing it.

Good:

Current Artwork Count

↓

Calculated from collection

Poor:

Store artwork count separately

↓

Requires synchronization

Derived state reduces bugs.

---

# State Flow

State should always flow downward.

```
Application

↓

Experience

↓

Component
```

Children may request updates.

They should never directly mutate parent state.

---

# Synchronization

Avoid duplicated state.

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

Only persistent information should survive page reloads.

Examples:

Theme

Accessibility preferences

Language (future)

Everything else should reset naturally.

---

# URL State

Some state belongs in the URL.

Examples:

Collection filters

Search query

Current page

This allows:

- Deep linking
- Browser navigation
- Sharing
- Refresh persistence

Ephemeral UI state should never be encoded into URLs.

---

# Animation State

Animation should consume state.

It should never become state.

Incorrect:

Animation owns navigation progress.

Correct:

Navigation owns progress.

Animation reacts to it.

---

# Performance

State updates should remain localized.

Avoid global updates that trigger unnecessary rendering.

State boundaries should align with ownership boundaries.

---

# Future Expansion

Future features may introduce additional state.

Examples:

- Reading progress
- Favorites
- Authentication
- Dashboard preferences

These should integrate into the existing categories rather than introducing new architectural concepts.

---

# Anti-Patterns

Avoid:

- Global state by default
- Duplicated state
- Storing derived values
- Component state leaking upward
- Long-lived transient state
- Unclear ownership
- Multiple sources of truth

Every state should have one owner.

---

# Success Indicators

The State Architecture succeeds when:

- State ownership is always obvious.
- Components remain predictable.
- Global state remains minimal.
- Derived state replaces stored state whenever possible.
- Rendering remains efficient.
- State naturally expires when no longer needed.

---

# Relationship to Other Documents

This document builds upon:

- Component Architecture
- Rendering Architecture
- Animation Architecture

It informs:

- Search Architecture
- Performance Architecture
- Implementation Guidelines

---

# Guiding Statement

> Store only what cannot be derived, own only what you control, and keep every piece of state as close as possible to where it is used.