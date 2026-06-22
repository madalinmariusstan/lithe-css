# Web Platform Baseline policy

Lithe CSS targets **Baseline Widely Available** for required production behavior. Baseline describes which web-platform features are interoperable in the core browser set.

## Rules

1. Required layout, controls, content, and interaction must work using Baseline Widely Available features.
2. Newer features may be used only as progressive enhancements behind `@supports` or feature detection.
3. A missing enhancement must not hide content, block input, or make navigation unusable.
4. Experimental and limited-availability features are excluded from production bundles.
5. The Browserslist target is provided by `browserslist-config-baseline`.

## Current progressive enhancements

| Feature | Fallback | Enhancement |
|---|---|---|
| `color-mix()` | Static focus and spinner colors | Theme-aware mixed colors |
| `100dvh` | `100vh` | Dynamic mobile viewport height |
| `backdrop-filter` | Solid translucent backdrop | Backdrop blur |
| `:has()` | Disabled native control remains styled and unusable | Parent label receives muted styling |
| `inert` | Focus management and hidden state in Lithe JavaScript | Native background interaction blocking |

## Baseline 2026

Features that become Baseline Newly available during 2026 are not automatically introduced into Lithe core. Examples such as `contrast-color()`, `:open`, container style queries, `shape()`, and active view transitions require a later compatibility review.

Run:

```bash
npm run baseline:targets
npm run baseline:check
```
