# Tokens

Design token hierarchy for the visual system.

```
primitives/   Raw values (colors, spacing, typography, radii, shadows, motion, layout)
semantic/     Purpose-driven tokens (light and dark themes)
component/    Specialized tokens for primitives (button, input, card, badge, link)
```

## Primitive categories

| Category | File | Consumed by |
|----------|------|-------------|
| Colors | `primitives/colors.css` | Semantic tokens |
| Spacing | `primitives/spacing.css` | Layout, primitives |
| Typography | `primitives/typography.css` | Text primitive, `@theme` |
| Radii | `primitives/radii.css` | Primitives |
| Shadows | `primitives/shadows.css` | Card primitive |
| Motion | `primitives/motion.css` | Transitions (P1 animation) |
| Layout | `primitives/layout.css` | Container, Grid primitives |

Tokens are imported into `app/globals.css` and exposed to Tailwind via `@theme inline`.
