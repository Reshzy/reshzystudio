# Primitives

Atomic, reusable UI elements. Each owns one responsibility.

## Typography

- `Text` — editorial type scale (display, heading, subheading, body, caption, metadata)

## Layout

- `Container` — max-width content wrapper with responsive gutters
- `Grid` — 12-column responsive grid system

## Interactive

- `Button` — primary, secondary, ghost variants
- `Input` — text input with validation state
- `Link` — internal (Next.js) and external anchor links

## Presentation

- `Card` — standard, featured, compact variants
- `Badge` — default, accent, success, warning, error variants

## Usage

```tsx
import { Button, Container, Text } from "@/design-system/primitives";
```

All primitives are Server Components. They consume semantic and component tokens only.
