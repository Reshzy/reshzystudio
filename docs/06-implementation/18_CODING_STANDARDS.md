# 18_CODING_STANDARDS.md

# Coding Standards

> "Code should communicate intent before implementation."

---

# Purpose

This document defines the engineering standards that govern every line of code written for the portfolio.

The Coding Standards ensure that the implementation remains consistent with the project's architecture, design philosophy, and long-term maintainability goals.

These standards complement automated tooling such as TypeScript, ESLint, and Prettier by defining principles that cannot be enforced through automation alone.

---

# Engineering Philosophy

Code is a form of communication.

It should first explain:

- Why it exists
- What responsibility it owns
- How it fits into the architecture

Implementation details should be secondary.

Readable code outlives clever code.

---

# Core Principles

Every implementation should strive to be:

- Simple
- Predictable
- Explicit
- Composable
- Typed
- Testable
- Accessible
- Performant

Code should reinforce the architecture rather than compete with it.

---

# Architectural Alignment

Every file should have a clearly defined responsibility.

Before creating new code, ask:

- Does this already exist?
- Can an existing system be extended?
- Does this preserve architectural boundaries?
- Does this introduce unnecessary complexity?

Architecture should always take precedence over convenience.

---

# Naming

Names should communicate intent rather than implementation.

Good examples:

- ArtworkCard
- GalleryGrid
- SearchService
- ImagePipeline
- ContentLoader

Avoid:

- Helper
- Utils
- Manager
- DataThing
- TempComponent
- FinalVersion2

Names should remain meaningful as the application evolves.

---

# File Responsibilities

Each file should own one responsibility.

Examples include:

- One component
- One content loader
- One schema
- One utility
- One animation preset

Large files should usually indicate multiple responsibilities.

---

# Function Design

Functions should:

- Perform one task
- Have clear inputs
- Produce predictable outputs
- Avoid hidden side effects
- Prefer pure logic where practical

Long functions should be decomposed into smaller units.

---

# Component Standards

Components should:

- Consume presentation models
- Compose existing primitives
- Remain Server Components by default
- Minimize client-side state
- Respect accessibility requirements

Components should never own business logic.

---

# TypeScript Standards

TypeScript should describe the architecture.

Guidelines include:

- Prefer explicit interfaces
- Avoid unnecessary `any`
- Model domain concepts
- Share contracts across systems
- Use types to communicate intent

Types should reduce ambiguity rather than add complexity.

---

# Error Handling

Errors should:

- Fail early during development
- Communicate clearly
- Preserve application stability
- Avoid silent failures

Recover gracefully when possible.

Hide nothing during development.

---

# Documentation

Public systems should explain:

- Purpose
- Responsibilities
- Constraints
- Extension points

Documentation should remain synchronized with implementation.

Outdated documentation is considered technical debt.

---

# Performance

Every implementation should consider:

- Rendering cost
- Hydration cost
- Bundle size
- Network requests
- Memory usage

Performance should influence implementation decisions from the beginning.

---

# Accessibility

Every implementation should preserve:

- Semantic HTML
- Keyboard navigation
- Focus management
- Reduced motion support
- Screen reader compatibility

Accessibility should be part of the definition of "finished."

---

# Refactoring

Refactoring should:

- Improve clarity
- Reduce duplication
- Preserve behavior
- Maintain architectural integrity

Refactoring is encouraged when it increases long-term maintainability.

---

# Dependencies

Every dependency must answer:

- What problem does it solve?
- Can existing tools solve this?
- Is the maintenance cost justified?
- Does it align with the architecture?

Adding dependencies should require deliberate evaluation.

---

# Code Reviews

Every review should consider:

- Architecture
- Correctness
- Simplicity
- Accessibility
- Performance
- Consistency
- Documentation

Code quality is measured by long-term maintainability rather than short-term convenience.

---

# Continuous Improvement

The standards should evolve with the project.

When recurring problems appear:

- Improve the architecture.
- Improve the documentation.
- Improve the standards.

Avoid solving systemic problems with one-off exceptions.

---

# Implementation Rules

The following rules are mandatory.

✓ Preserve architectural boundaries.

✓ Prefer Server Components.

✓ Reuse before creating.

✓ Keep functions focused.

✓ Keep files purposeful.

✓ Maintain strong typing.

✓ Respect accessibility.

✓ Optimize only after measurement.

✓ Keep documentation current.

---

# Prohibited Practices

The following are prohibited.

✗ Hidden side effects.

✗ Duplicate implementations.

✗ Arbitrary abstractions.

✗ Business logic inside UI.

✗ Hardcoded design values.

✗ Unreviewed architectural shortcuts.

✗ Undocumented technical debt.

---

# Definition of Done

A task is complete only when:

- Requirements are satisfied.
- Architecture is respected.
- Code is readable.
- Types are correct.
- Tests pass.
- Accessibility is verified.
- Performance remains acceptable.
- Documentation is updated.

Completion is measured by quality rather than code volume.

---

# Success Indicators

The Coding Standards succeed when:

- New contributors quickly understand the codebase.
- Architectural consistency is preserved.
- Refactoring becomes easier over time.
- AI-generated code matches human-written code.
- The project remains maintainable as it grows.

---

# Relationship to Other Documents

This document concludes the Implementation phase.

It reinforces every architectural and implementation document in the repository and serves as the engineering standard for all future development.

---

# Closing Statement

The purpose of these standards is not to restrict creativity.

They exist to create consistency.

Consistency creates confidence.

Confidence enables experimentation.

Experimentation produces exceptional work.

The portfolio should evolve continuously without sacrificing the clarity, craftsmanship, and engineering discipline established by its foundation.

Write code that future contributors will appreciate.

Build systems that future versions will extend.

Create experiences that visitors will remember.