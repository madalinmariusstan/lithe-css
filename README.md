# Lithe CSS

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/brand/lithecss-logo.svg">
  <img src="assets/brand/lithecss-logo.svg" alt="Lithe CSS" width="460">
</picture>

**Flexible by design. Lightweight by default.**

Lithe CSS is a lightweight, modular, class-based CSS framework.

Lithe styles components only when their classes are present. It does not globally restyle `button`, `input`, `textarea`, `article`, `section` or `table`, so unrelated markup remains unaffected.

## Included in 0.0.1

- Semantic default theme with light, dark and system modes
- Responsive 12-column grid
- Forms, buttons and tables
- Cards, alerts, badges and native dialogs
- Navbar, sidebar and app shell
- Dropdown, tabs, pagination, switch and toast
- Breadcrumb and toolbar
- Drawer with backdrop
- Native details-based accordion
- Tags with removable controls
- File upload area
- Empty state
- Small optional JavaScript using `data-*` attributes


## Repository setup

```bash
npm ci
npm test
```

Open `demo/index.html` to view the local showcase. The included Pages workflow deploys it from `main`.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) and [SUPPORT.md](SUPPORT.md).

## Modular bundles

Lithe CSS ships as Base, Extended and Full bundles:

```html
<!-- Foundation: tokens, reset, layout, grid, forms, buttons, tables and utilities -->
<link rel="stylesheet" href="dist/lithe-base.min.css">

<!-- Optional components: content, feedback, navigation, overlays, disclosure and app layout -->
<link rel="stylesheet" href="dist/lithe-extended.min.css">
<script src="dist/lithe.js" defer></script>
```

Or load the complete bundle:

```html
<link rel="stylesheet" href="dist/lithe.min.css">
<script src="dist/lithe.js" defer></script>
```

`lithe-extended.css` depends on Base tokens and reset. Load Base before Extended, or use the complete bundle.

Source structure:

```text
src/
├── base/
├── extended/
├── js/lithe.js
├── lithe-base.css
├── lithe-extended.css
└── lithe.css
```

### Switch sizes

The default switch uses the medium size. Explicit sizes are available with `sm`, `md`, `xl`, and `xxl` modifiers:

```html
<label class="switch sm">...</label>
<label class="switch md">...</label>
<label class="switch xl">...</label>
<label class="switch xxl">...</label>
```


## Usage

```html
<link rel="stylesheet" href="dist/lithe.min.css">

<form class="form">
  <div class="form-group">
    <label class="label" for="title">Title</label>
    <input class="input" id="title">
  </div>
  <button class="button primary" type="submit">Save</button>
</form>

<script src="dist/lithe.js"></script>
```

The JavaScript is only needed for interactive dropdowns, tabs, drawers, dialog triggers, removable tags, file-name display, sidebars and toast dismissal.

## Alpha status

Version 0.0.1 is the initial public alpha. The current class, token, bundle and `data-*` API is documented in [`docs/public-api.json`](docs/public-api.json), but may still change before a stable release. Breaking changes will be documented in the changelog.

Run the complete contract audit with:

```bash
npm run build
npm run check
```

## Development

```bash
npm install
npm run build
```

Open `demo/index.html` after building. Use `demo/theme-system.html` to test theme switching and primary-color overrides.

## Design rule

Use component classes:

```css
.button {}
.input {}
.card {}
```

Avoid global component styling:

```css
button {}
input {}
article {}
```

## Branding

Lithe CSS uses the official user-provided wordmark: `Lithe` in a light weight and `CSS` in a bold weight. Brand assets are stored in [`assets/brand`](assets/brand), and usage guidance is documented in [`docs/BRANDING.md`](docs/BRANDING.md).

## License

MIT.


## Stability

Run the build and non-invasive selector check:

```bash
npm install
npm run build
npm run check
```

Open `demo/stability.html` to test keyboard behavior, mobile layout, dark mode and foreign controls.


### Optional shadows

Cards are flat by default. Use `.shadow` for the balanced default elevation:

```html
<div class="card shadow">...</div>
```


## Shadows

Cards have no shadow by default. Add the desired utility explicitly:

```html
<div class="card shadow">Default balanced shadow</div>
<div class="card shadow-sm">Subtle shadow</div>
<div class="card shadow-md">Medium shadow</div>
<div class="card shadow-lg">Large shadow</div>
```

## Form control sizes

```html
<input class="input sm" placeholder="Small">
<input class="input md" placeholder="Medium">
<input class="input xl" placeholder="Extra large">
<input class="input xxl" placeholder="Double extra large">

<select class="select sm">...</select>
<select class="select md">...</select>
<select class="select xl">...</select>
<select class="select xxl">...</select>
<input class="input clean" placeholder="Soft background">
```

## Showcase demo

Open `demo/showcase.html` for the complete component showcase.

## Selection controls

```html
<input class="range" type="range" value="50" style="--range-progress: 50%">

<label class="check">
  <input class="check-input" type="checkbox" checked>
  Email notifications
</label>

<label class="radio">
  <input class="radio-input" type="radio" name="status" checked>
  Published
</label>
```

Lithe styles these controls only when their classes are present, so unrelated elements remain unaffected.


### Modern controls

Use `.range`, `.file-input`, `.check-input`, `.radio-input`, and `.switch` for opt-in styled controls.

## Button variants

```html
<button class="button primary">Primary</button>
<button class="button secondary">Secondary</button>
<button class="button contrast">Contrast</button>
<button class="button primary outline">Outline</button>
```

The contrast button follows the active theme: dark in the light theme and white in the dark theme.

## Input groups, progress and loading

```html
<div class="input-group">
  <input class="input" type="email" placeholder="Email">
  <button class="button primary">Subscribe</button>
</div>

<progress class="progress" value="50" max="100">50%</progress>
<span class="spinner" aria-label="Loading"></span>
```

## Switch

```html
<label class="switch">
  <input class="switch-input" type="checkbox">
  <span class="switch-control" aria-hidden="true"></span>
  <span class="switch-label">Notifications</span>
</label>
```

## Unified control sizes

Use `sm`, `md`, `xl`, or `xxl` on buttons, inputs, selects, textareas, file inputs, switches, checkboxes, radios and input groups. The default size is equivalent to `md`.

```html
<input class="input sm">
<select class="select md"></select>
<textarea class="textarea xl"></textarea>
<button class="button primary xxl">Save</button>
```

### Modal section backgrounds

Modal header, body and footer use the same background by default:

```html
<dialog class="modal">...</dialog>
```

Use `.modal-toned` (or the composable `.toned` modifier) when the header and footer should use the secondary surface color:

```html
<dialog class="modal modal-toned">
  <header class="modal-header">...</header>
  <div class="modal-body">...</div>
  <footer class="modal-footer">...</footer>
</dialog>
```

## Navigation and interaction

Lithe includes responsive navbar, mobile sidebar, accessible dropdowns and horizontal or vertical tabs.

```html
<nav class="navbar sticky">
  <a class="navbar-brand" href="#">Lithe</a>
  <button class="button icon navbar-toggle" data-navbar-toggle="#main-menu" aria-expanded="false">Menu</button>
  <div class="navbar-menu" id="main-menu">
    <div class="navbar-start"><a class="navbar-link" href="#">Dashboard</a></div>
    <div class="navbar-end">...</div>
  </div>
</nav>
```

Dropdowns support `ArrowUp`, `ArrowDown`, `Home`, `End`, `Escape` and focus restoration. Use `.dropdown-menu.start` or `.dropdown-menu.end` for alignment.

The mobile sidebar uses a backdrop and focus trap:

```html
<button data-sidebar="#sidebar" aria-expanded="false">Open</button>
<aside class="sidebar" id="sidebar" aria-hidden="true">...</aside>
<button class="sidebar-backdrop" data-sidebar-backdrop="#sidebar" aria-label="Close sidebar"></button>
```

See `demo/navigation.html` for the complete interaction matrix.


### Mobile sidebar
Use `<aside class="sidebar offcanvas mobile">` for a standalone off-canvas sidebar that remains hidden on desktop.

## Mobile loading indicators

The spinner includes a Safari/iOS fallback and does not require JavaScript:

```html
<span class="spinner" role="status" aria-label="Loading"></span>
```

Available sizes are `.sm`, `.md`, `.xl`, and `.xxl`. When Reduce Motion is enabled, the spinner becomes a static partial ring instead of running a rotation animation.

## Documentation and visual tests

Component documentation is available in `docs/`. Browser-oriented visual pages are available in `demo/visual-*.html`.

Recommended pre-release checks:

- `demo/visual-forms.html` for native controls and sizing;
- `demo/visual-overlays.html` for dialog, drawer, focus and iOS scrolling;
- `demo/visual-dark.html` for dark-theme contrast;
- `demo/visual-rtl.html` for bidirectional layouts.

Lithe CSS 0.0.1 is an initial public alpha intended for testing and feedback.

## Theme system

Lithe includes a semantic default theme in core. Use `data-theme="light"`, `data-theme="dark"`, or omit the attribute to follow the operating system. Change `--primary` and its related tokens once; all interactive components update automatically. See `demo/theme-system.html` and `docs/themes.md`.

## Mobile and accessibility

See `docs/MOBILE.md` and `docs/ACCESSIBILITY.md` for iOS, Android, keyboard and safe-area guidance.
