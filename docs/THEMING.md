# Theming

Lithe ships one semantic theme system in Core. It supports explicit light, explicit dark and automatic system mode without duplicating component CSS.

## Change the primary palette

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

All primary buttons, selected controls, switches, ranges, progress indicators and active navigation inherit these tokens.

## Theme mode

Use `data-theme="light"` or `data-theme="dark"`. Omit the attribute to follow `prefers-color-scheme`.

## Scoped application themes

Tokens inherit, so a section can use a different palette without rebuilding Lithe:

```css
.brand-area {
  --primary: #0f766e;
  --primary-hover: #115e59;
  --primary-active: #134e4a;
  --primary-soft: #ccfbf1;
}
```

Customize components through the public tokens listed in [`TOKENS.md`](TOKENS.md).
