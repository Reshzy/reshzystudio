# 03_APP_ROUTER_ARCHITECTURE.md

# App Router Architecture

> "The App Router is an implementation of the application's architecture, not the architecture itself."

---

# Purpose

This document defines how the Application Architecture is implemented using the Next.js App Router.

The App Router provides the structural framework for routing, layouts, rendering, metadata, and loading states.

Its implementation should faithfully express the architectural systems established throughout this project while remaining idiomatic to Next.js.

---

# Architectural Philosophy

The App Router is responsible for application structure.

It should remain thin.

Business logic, content ownership, and rendering decisions belong to other architectural systems.

The App Router connects those systems.

It does not replace them.

---

# Responsibilities

The App Router owns:

- Route hierarchy
- Nested layouts
- Templates
- Error boundaries
- Loading states
- Route metadata
- Route groups
- Server rendering entry points

The App Router does **not** own:

- Business logic
- Content models
- Components
- Design system
- Search logic
- Image processing

---

# Route Hierarchy

The application's route structure mirrors the Routing Architecture.

```
/

collection/

artwork/

about/

contact/
```

Future routes extend the hierarchy naturally.

```
projects/

case-studies/

writing/

lab/

open-source/
```

The route tree should remain stable as the portfolio evolves.

---

# Route Groups

Route Groups organize implementation without affecting public URLs.

Examples include:

```
(marketing)

(content)

(system)
```

Route Groups improve maintainability by separating concerns while preserving clean, user-facing paths.

They should be used to organize implementation rather than influence navigation.

---

# Layout Hierarchy

The App Router implements the Layout Architecture through nested layouts.

Conceptually:

```
Root Layout

↓

Experience Layout

↓

Section Layout

↓

Rendered Content
```

Each layout owns only the structure appropriate to its level.

Shared interface elements should live as high in the hierarchy as practical.

---

# Templates

Templates define route-specific rendering behavior.

They should coordinate:

- Content retrieval
- Presentation models
- Experience composition

Templates remain orchestration layers.

Business logic belongs elsewhere.

---

# Loading States

Every significant route should define an intentional loading experience.

Loading should:

- Preserve layout stability
- Communicate progress
- Maintain perceived responsiveness

Loading components should reflect the structure of the final experience.

---

# Error Boundaries

Failures should remain localized.

Each major experience should provide an appropriate recovery strategy.

Errors should:

- Preserve navigation
- Avoid blank screens
- Communicate clearly
- Encourage recovery

Application-wide failures should remain exceptional.

---

# Metadata

Metadata generation belongs at the route level but derives from the Content Model.

Routes should request metadata rather than construct it manually.

Metadata should remain synchronized with content.

---

# Rendering Strategy

The App Router follows a Server Component–first strategy.

General principles:

- Render on the server by default.
- Hydrate only interactive islands.
- Keep client boundaries explicit.
- Avoid unnecessary client rendering.

Client Components are an implementation detail, not a design pattern.

---

# Streaming

Streaming should improve perceived performance.

Appropriate use cases include:

- Large galleries
- Long-form stories
- Progressive content loading

Streaming should enhance responsiveness without changing content structure.

---

# Parallel Routes

Parallel Routes should be reserved for experiences that genuinely benefit from multiple simultaneous views.

Examples may include:

- Overlay experiences
- Future modal galleries
- Multi-panel interfaces

They should not become the default routing strategy.

---

# Intercepting Routes

Intercepting Routes may be used when an interaction should preserve context.

Examples:

- Artwork lightbox
- Modal detail views

The underlying content remains addressable through its canonical route.

---

# Server Actions

Server Actions should encapsulate server-side interactions when required.

Examples include:

- Contact form submission
- Future newsletter signup

Server Actions should not replace domain architecture.

---

# Caching Strategy

The App Router should leverage appropriate caching mechanisms while respecting content freshness.

Guiding principles:

- Cache static content aggressively.
- Revalidate intentionally.
- Avoid unnecessary dynamic rendering.
- Keep caching policies explicit.

---

# Dependency Boundaries

The App Router depends on:

- Content layer
- Rendering system
- Layout system
- Component system

These systems should never depend on the App Router.

Dependency direction always flows toward the framework entry point.

---

# Future Expansion

The App Router should accommodate future capabilities including:

- Internationalization
- Authentication (if introduced)
- Dashboard sections
- Experimental experiences

New routes should integrate into the existing hierarchy without restructuring the application.

---

# Anti-Patterns

Avoid:

- Business logic inside route files.
- Large page components.
- Deeply nested layouts without purpose.
- Client Components by default.
- Route-specific design systems.
- Metadata duplicated across routes.

The App Router should remain an orchestration layer.

---

# Success Indicators

The App Router Architecture succeeds when:

- Routes clearly reflect the application's information architecture.
- Layouts remain reusable.
- Server rendering is the default.
- Client boundaries are intentional.
- New routes integrate without architectural changes.
- Framework conventions reinforce, rather than dictate, the architecture.

---

# Relationship to Other Documents

This document builds upon:

- Routing Architecture
- Layout Architecture
- Rendering Architecture
- Project Structure
- Technology Stack

It informs:

- Rendering Implementation
- Content Implementation
- Component Implementation
- Deployment Architecture

---

# Guiding Statement

> The App Router should faithfully implement the architecture while remaining simple, predictable, and idiomatic to Next.js.