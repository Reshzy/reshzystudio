# AI_DECISION_FRAMEWORK.md

Version: 1.0

Last Updated: July 2026

---

# Purpose

This document teaches AI assistants **how to think** while contributing to this project.

Unlike the Design System or AI Context, this document is not a specification.

It is a decision-making framework.

When requirements are incomplete, ambiguous, or multiple solutions appear equally valid, follow this framework to make decisions that remain consistent with the vision of the project.

This document takes precedence whenever subjective design decisions must be made.

---

# Core Principle

Do not optimize for writing code.

Optimize for creating an experience.

Every decision should improve the visitor's emotional experience rather than simply completing a feature.

---

# The North Star

Every implementation should support one goal:

> Create a digital exhibition where the artwork is the hero and the interface quietly disappears.

If a decision makes the interface more noticeable than the artwork,

it is probably the wrong decision.

---

# The Priority Pyramid

Whenever multiple priorities conflict, resolve them in this order.

1. User Experience
2. Artwork Presentation
3. Accessibility
4. Performance
5. Maintainability
6. Visual Enhancement
7. Developer Convenience

Never reverse this order.

---

# The Simplicity Rule

Whenever two solutions achieve the same goal:

Choose the simpler one.

Whenever two simple solutions exist:

Choose the one that creates a more memorable experience.

Never introduce complexity simply because it appears more impressive.

---

# The "Why?" Test

Before introducing any feature, ask:

Why does this exist?

If no meaningful answer exists,

do not implement it.

---

# The "Remove" Test

Whenever adding something new:

Ask first:

Can something existing be removed instead?

The project values reduction over accumulation.

---

# The Five Second Test

Imagine a first-time visitor opening the homepage.

Within five seconds they should immediately understand:

• This is a premium experience.

• This person is an exceptional artist.

If any feature delays that understanding,

reconsider it.

---

# Motion Decision Framework

Every animation must satisfy at least one of the following:

Guide attention

Reveal content

Provide feedback

Create continuity

Improve orientation

Support storytelling

If none apply,

remove the animation.

Never animate for decoration alone.

---

# Scroll Decision Framework

Scrolling should feel like turning the pages of an exhibition catalogue.

Not like navigating a dashboard.

Every section should naturally encourage visitors to continue.

Avoid abrupt transitions.

Allow breathing room between moments.

---

# Typography Decision Framework

Typography creates hierarchy before color does.

When uncertain:

Increase spacing before increasing font size.

Improve hierarchy before adding decoration.

Never rely on bold text alone.

Use rhythm.

Use whitespace.

Use alignment.

---

# Layout Decision Framework

Before introducing additional columns, cards, or containers:

Ask:

Can this layout become simpler?

The layout should feel intentional rather than dense.

Whitespace is an active design element.

Empty space is never considered wasted space.

---

# Color Decision Framework

Color exists to support the artwork.

Never compete with it.

If introducing a new color,

justify its purpose.

Accent colors should communicate,

not decorate.

---

# Component Decision Framework

Before creating a new component:

Ask:

Can an existing component be adapted?

If yes,

reuse.

If no,

create something flexible enough for future use.

Avoid one-off components unless absolutely necessary.

---

# Interaction Decision Framework

Every interaction should answer:

What happens?

Why did it happen?

What should the visitor do next?

Interactions should never confuse.

The visitor should never wonder whether something is clickable.

---

# Performance Decision Framework

When forced to choose between:

Beautiful animation

or

Smooth performance

Choose smooth performance.

A beautiful animation running at 20 FPS is not beautiful.

---

# Accessibility Decision Framework

Accessibility is never optional.

If a visual decision reduces accessibility,

find another solution.

Never sacrifice usability for aesthetics.

Beautiful interfaces should be usable by everyone.

---

# Mobile Decision Framework

Never shrink desktop.

Redesign mobile.

Mobile deserves intentional layouts.

Spacing.

Typography.

Interactions.

Navigation.

Everything should feel designed specifically for touch.

---

# Image Decision Framework

Artwork always takes priority.

Never crop important details simply to fit a layout.

Respect the artist's composition.

Allow images room to breathe.

Large artwork is preferred over many small thumbnails.

---

# Copywriting Decision Framework

Write less.

Say more.

Avoid explaining obvious things.

Avoid buzzwords.

Avoid self-praise.

Show confidence through clarity.

The artwork should carry the narrative.

---

# Expansion Decision Framework

Every new feature should answer:

Will this still make sense when frontend projects are added?

If not,

rethink the architecture.

The project should grow naturally.

Never build temporary structures that future versions must replace.

---

# AI Behavior

When implementing features:

Think like:

Creative Director

↓

UX Designer

↓

Visual Designer

↓

Frontend Engineer

↓

Developer

Not the other way around.

Technology exists to serve the experience.

---

# Final Checklist

Before completing any task, ask:

✓ Is the artwork still the hero?

✓ Is the solution simpler than before?

✓ Does every animation have purpose?

✓ Does this improve the visitor experience?

✓ Is accessibility preserved?

✓ Is performance maintained?

✓ Will this scale into future versions?

✓ Does this feel premium?

✓ Does this feel timeless?

✓ Would I proudly showcase this on an Awwwards stage?

If any answer is "no",

continue refining.

---

# Final Instruction

Do not ask:

"Can this be built?"

Ask:

"Should this exist?"

That question should guide every implementation decision made throughout this project.