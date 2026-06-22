# Public API

Lithe CSS 0.0.1 is the initial public alpha. The authoritative machine-readable inventory of the current public surface is [`public-api.json`](public-api.json).

## Distribution

- `dist/lithe-base.min.css`: tokens, reset, layout, grid, forms, buttons, tables and utilities.
- `dist/lithe-extended.min.css`: components that depend on Base.
- `dist/lithe.min.css`: Base and Extended together.
- `dist/lithe.js`: optional interactions with no runtime dependencies.

Extended must be loaded after Base. The Full bundle already contains both.

## Alpha compatibility policy

During the `0.0.x` series:

- public classes, tokens and `data-*` attributes may change as the API is refined;
- breaking changes must be documented in the changelog and migration notes;
- bug fixes may correct behavior without changing the documented API;
- internal selectors and private implementation variables are not public API;
- accessibility corrections take priority over preserving defective behavior.

## Canonical sizes

`sm`, `md`, `xl`, and `xxl`. The unmodified control is equivalent to `md`.

## Theme modes

```html
<html data-theme="light">
<html data-theme="dark">
<html> <!-- system -->
```

## Canonical interactive attributes

- `data-dropdown`
- `data-navbar-toggle`
- `data-sidebar` and `data-sidebar-backdrop`
- `data-drawer-open`, `data-drawer-close`, and `data-drawer-backdrop`
- `data-dialog-open` and `data-dialog-close`
- `data-tab`
- `data-tag-remove`
- `data-toast-close`

See [`JAVASCRIPT.md`](JAVASCRIPT.md) for markup contracts and keyboard behavior.
