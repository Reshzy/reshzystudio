# Design System

Reusable UI implementation and design tokens. The single source of visual truth for components.

## Responsibility

Implements the visual system through tokens and composable UI. Does not own business logic, content loading, or routing.

## Structure

```
tokens/         Primitive, semantic, and component design tokens
primitives/     Atomic UI elements — Text, Container, Grid, Button, Input, Card, Badge, Link
composites/     Combined primitives (added when needed)
patterns/       Reusable layout and interaction patterns (added when needed)
providers/      Cross-cutting UI providers (added when needed)
icons/          Icon assets and wrappers (added when needed)
shared/         Shared utilities (cn)
```

Import primitives from `@/design-system/primitives` or `@/design-system`.

## Rules

- Components consume semantic or component tokens only — never primitive values directly.
- Server Components are the default; client boundaries are explicit and minimal.
- Props describe intent, not implementation details.

## Dependency rule

`design-system/` may import from `lib/` and `types/`. It must not import from `features/` or `app/`.
