# Content

Framework-independent content source for the portfolio exhibition.

## Responsibility

Owns structured data and narrative content. Does not contain UI, routing, or presentation logic.

## Structure

```
site/           Global site configuration
artwork/        Artwork records (JSON)
collections/    Collection records (JSON)
stories/        Narrative content (MDX + frontmatter)
```

## Dependency rule

Content may be imported by `lib/` loaders only. Never import from `app/`, `features/`, or `design-system/`.
