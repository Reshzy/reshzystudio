# 06_COMPONENT_IMPLEMENTATION.md

# Component Implementation

> "Components are implementation units, not architectural units."

---

# Purpose

This document defines how the Component Architecture is implemented using React and the Next.js App Router.

It establishes the conventions, boundaries, composition patterns, and engineering standards used when building the component library.

Every component should express a single responsibility while remaining reusable, predictable, and easy to maintain.

---

# Implementation Goals

The component system should be:

- Composable
- Accessible
- Predictable
- Type-safe
- Performant
- Server-first
- AI-friendly

Components should become easier to compose as the application grows.

---

# Component Hierarchy

The implementation follows the architectural hierarchy.

```
Primitive

↓

Composite

↓

Pattern

↓

Experience

↓

Template
```

Higher layers compose lower layers.

Dependencies never flow upward.

---

# Directory Organization

The implementation mirrors the Design System.

Conceptually:

```
design-system/

├── primitives/
├── composites/
├── patterns/
├── providers/
├── icons/
└── shared/
```

Feature-specific components belong within their corresponding feature module.

The Design System should contain only reusable components.

---

# Component Responsibilities

Every component owns exactly one responsibility.

Examples:

Button

- Rendering
- Variants
- Accessibility

Gallery Grid

- Arrangement
- Layout
- Composition

Artwork Card

- Presentation
- Content display

Components should avoid combining unrelated concerns.

---

# Server Components

Server Components are the default implementation.

Suitable responsibilities include:

- Rendering content
- Composing layouts
- Displaying metadata
- Static presentation

Server Components should avoid browser-only APIs.

---

# Client Components

Client Components are introduced only when browser capabilities are required.

Examples include:

- Interactive gallery
- Search input
- Theme toggle
- Cursor interactions
- Drag gestures

Client boundaries should remain explicit and minimal.

---

# Component Composition

Components should compose through nesting rather than inheritance.

Example:

```
ArtworkCard

↓

MediaFrame

↓

Image

↓

Caption

↓

Tags
```

Composition should produce richer interfaces without increasing coupling.

---

# Component Contracts

Every public component should define a clear contract.

The contract includes:

- Purpose
- Expected inputs
- Expected outputs
- Variants
- Slots
- Accessibility behavior

Implementation details should remain private.

---

# Props

Props should describe intent rather than implementation.

Good examples:

- artwork
- collection
- featured
- orientation

Avoid implementation-driven props such as:

- marginTop
- customWidth
- colorHex
- animationDuration

Visual decisions belong to the Design System.

---

# Variants

Variants represent meaningful differences in presentation.

Examples:

Button

- Primary
- Secondary
- Ghost

Artwork Card

- Compact
- Standard
- Featured

Variants should communicate purpose rather than arbitrary styling combinations.

---

# Slots

Components should expose composition points through slots when appropriate.

Examples include:

- Header
- Footer
- Actions
- Media
- Caption

Slots provide flexibility while preserving ownership.

---

# State Ownership

Component state should remain local whenever possible.

Examples:

Button

- Hover
- Focus

Accordion

- Expanded

Tooltip

- Visibility

Components should not own state belonging to larger experiences.

---

# Data Flow

Components consume presentation models.

They should not:

- Load content
- Resolve relationships
- Perform business logic

The rendering pipeline provides prepared data.

Components render it.

---

# Styling

Components consume Design Tokens through the styling system.

Components should never:

- Hardcode colors
- Hardcode spacing
- Hardcode typography

Visual consistency should emerge from shared tokens.

---

# Accessibility

Every component must support:

- Keyboard interaction
- Focus management
- Screen readers
- Reduced motion preferences
- Semantic HTML

Accessibility is part of the component contract.

---

# Performance

Components should:

- Minimize client-side rendering
- Avoid unnecessary state
- Avoid excessive re-renders
- Prefer composition over duplication

Performance should be considered during implementation rather than after profiling.

---

# Testing

Every public component should be testable in isolation.

Tests should verify:

- Rendering
- Variants
- Accessibility
- Interaction
- Edge cases

Components should remain deterministic.

---

# Documentation

Public components should include:

- Purpose
- Usage
- Variants
- Accessibility notes
- Known constraints

Documentation should evolve alongside implementation.

---

# Future Evolution

The component system should naturally accommodate:

- New content types
- Additional themes
- Expanded design tokens
- Future interaction patterns

Growth should occur through composition rather than replacement.

---

# Anti-Patterns

Avoid:

- Monolithic components
- Components loading data
- Business logic in UI
- Excessive prop drilling
- Duplicate implementations
- Deep inheritance
- Hardcoded design values
- Implicit side effects

Components should remain predictable implementation units.

---

# Success Indicators

The Component Implementation succeeds when:

- Components compose naturally.
- Client Components remain intentionally limited.
- APIs are consistent.
- New interfaces reuse existing building blocks.
- Accessibility is built in.
- Components remain understandable in isolation.

---

# Relationship to Other Documents

This document implements:

- Component Architecture
- Design Token Architecture
- Rendering Implementation

It informs:

- Styling Architecture
- Animation Implementation
- Testing Strategy
- Coding Standards

---

# Guiding Statement

> Components should render, compose, and communicate clearly—never own responsibilities that belong elsewhere.