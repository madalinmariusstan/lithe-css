# Mobile and iOS

Lithe CSS keeps mobile behavior class-based and progressively enhanced.

## Viewport

Use this viewport declaration on application pages:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

The root canvas inherits the active theme during iOS overscroll. `vh`, `svh` and `dvh` fallbacks are provided where viewport height matters.

## Form controls

On compact screens, text controls use at least 16px text to prevent Safari auto-zoom. The JavaScript helper also performs a conservative viewport recovery after the iOS keyboard closes.

## Dropdowns

Open dropdowns are clamped to `visualViewport`, repositioned on resize and scroll, and given an available-height limit. Avoid placing dropdown roots inside containers with `overflow: hidden`.

## Overlays

Drawers, sidebars, modals and toasts account for safe-area insets. Body scroll lock preserves and restores the original scroll position.

## Real-device checklist

- iPhone Safari: input focus and blur, dropdown edges, modal fields, drawer scroll.
- iPad Safari: split view and orientation changes.
- Android Chrome: keyboard resize and back navigation.
- Reduced Motion: spinner remains visible and animated slowly.
