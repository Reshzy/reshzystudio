# Providers

Cross-cutting UI providers required at the application boundary.

## Theme

- `ThemeProvider` — preference state, persistence, and `data-theme` application
- `theme-storage` — storage key, resolution helpers, and FOUC prevention script source

Feature UI such as `ThemeToggle` and `ThemeScript` lives in `features/theme/`.
