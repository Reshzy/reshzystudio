# Lib

Shared infrastructure utilities. Framework-aware but feature-independent.

## Responsibility

Content loading, metadata generation, image utilities, search indexing, and animation helpers. No UI components.

## Structure

```
content/        Content loaders and validation
metadata/       SEO and metadata resolution
images/         Image pipeline utilities
animation/      Motion presets and helpers (P1)
env.ts          Environment access
fonts.ts        Font loading configuration
```

## Dependency rule

`lib/` may import from `types/` and `content/`. It must not import from `features/`, `design-system/`, or `app/`.
