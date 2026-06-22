# Themes

Lithe ships one semantic default theme in core. It supports light, dark and system modes without an extra stylesheet.

```html
<html data-theme="light">
<html data-theme="dark">
<html> <!-- follows the operating system -->
```

Change the brand without rewriting components:

```css
:root {
  --primary: #7c3aed;
  --primary-hover: #6d28d9;
  --primary-active: #5b21b6;
  --primary-soft: #f3e8ff;
  --primary-text: #fff;
  --focus-ring-color: rgb(124 58 237 / 22%);
}
```

Buttons, focus states, switches, range controls, progress bars, active navigation, tabs and pagination consume semantic tokens. Override dark values under `[data-theme="dark"]` when a custom palette needs different dark-mode contrast.
