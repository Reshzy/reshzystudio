# Features

Application capabilities that compose the design system into exhibition experiences.

## Responsibility

Owns feature-specific orchestration and UI that is not reusable across the design system. Does not redefine tokens or primitives.

## Modules

```
gallery/        Artwork browsing and presentation
navigation/     Site navigation and wayfinding
search/         Content discovery
contact/        Contact and conversation flows
cursor/         Custom cursor interactions
theme/          Theme preference and persistence
```

## Dependency rule

`features/` may import from `design-system/`, `lib/`, and `types/`. It must not import from `app/`.
