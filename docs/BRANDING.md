# Lithe CSS brand guide

## Positioning

Lithe CSS is a lightweight, flexible and non-invasive UI framework for modern web interfaces.

## Name

Use **Lithe CSS** in prose. Use `lithe-css` for the npm package and repository slug.

Do not write `LitheCSS`, `Lithe Css`, or `LITHE CSS` as the primary product name.

## Tagline

**Flexible by design. Lightweight by default.**

Secondary description:

> A class-based UI framework that styles only what you opt into.

## Official wordmark

The approved wordmark uses `Lithe` in a light weight and `CSS` in a bold weight. Source assets are included in:

```text
assets/brand/lithecss-logo.svg
assets/brand/lithecss-wordmark.png
assets/brand/lithecss-social.png
```

Use the SVG whenever possible. A text fallback may be written as:

```html
<span class="brand-wordmark"><span>Lithe</span> <strong>CSS</strong></span>
```

Recommended treatment:

- `Lithe`: weight 300
- `CSS`: weight 750–800
- preserve the original proportions
- do not stretch, outline, rotate, recolor individual letters or add effects
- keep clear space around the wordmark
- compact spacing between the two parts
- sentence case for `Lithe`, uppercase for `CSS`

## Brand colors

The brand remains neutral and lets interface themes carry most of the visual weight.

```css
--brand-blue: #2563eb;
--brand-blue-hover: #1d4ed8;
--brand-ink: #17181b;
--brand-paper: #ffffff;
--brand-muted: #667085;
```

For dark surfaces:

```css
--brand-blue-dark: #60a5fa;
--brand-ink-dark: #f8fafc;
--brand-paper-dark: #17181b;
--brand-muted-dark: #a7adb7;
```

## Typography

The framework keeps a dependency-free system stack. Branding and documentation may use Geist or Manrope, with Inter as a fallback:

```css
font-family: "Geist", "Manrope", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Recommended weights:

- 300: wordmark `Lithe`
- 400: body copy
- 600: navigation and labels
- 750–800: wordmark `CSS` and strong display accents

## Voice

Use language that is direct, calm and technical.

Prefer:

- lightweight
- flexible
- class-based
- non-invasive
- modular
- explicit

Avoid exaggerated claims such as “zero-cost”, “the fastest”, or “perfect”.

## Project naming

```text
lithe-base.css
lithe-extended.css
lithe.css
lithe.js
```

Potential future packages:

```text
@lithe/core
@lithe/components
@lithe/icons
```

Do not split packages before the stable 1.0 API is established.
