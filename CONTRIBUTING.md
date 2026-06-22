# Contributing to Lithe CSS

Thank you for helping improve Lithe CSS.

## Before opening a pull request

1. Open or locate an issue for non-trivial changes.
2. Keep changes class-based and non-invasive.
3. Do not introduce breaking public API changes without a documented deprecation path.
4. Preserve Base / Extended separation.
5. Test light, dark and system themes.

## Local development

```bash
npm ci
npm test
```

Open `demo/index.html` for the main demo and the `demo/visual-*.html` files for focused QA.

## CSS principles

- Style components through explicit classes such as `.button`, `.input` and `.card`.
- Avoid global component selectors such as `button {}`, `input {}` or `article {}`.
- Use semantic tokens instead of hard-coded theme colors.
- Prefer progressive enhancement for newer web-platform features.
- Keep JavaScript optional and dependency-free.

## Pull requests

Keep each pull request focused. Include:

- a clear explanation;
- a minimal reproduction for bug fixes;
- documentation or demo updates;
- browser/device notes for interaction or mobile changes.

The public API contract is in `docs/public-api.json` and is checked by CI.
