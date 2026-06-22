# Browser support

Lithe CSS targets the browser versions resolved by **Baseline Widely Available** through Browserslist. The exact version list changes as Baseline data advances, so published releases lock their dependency versions in `package-lock.json`.

## Support contract

- CSS Base remains usable without JavaScript.
- Extended interactive components use `lithe.js` and fail safely when an enhancement is unavailable.
- Safari and iOS receive explicit fallbacks for viewport height, backdrop effects, scrolling, and loading indicators.
- Reduced Motion keeps status indicators visible while avoiding continuous animation.

## Verify the current release target

```bash
npm install
npm run baseline:targets
```

## Test matrix before 1.0

- Chromium desktop and Android
- Edge desktop
- Firefox desktop and Android
- Safari macOS
- Safari iOS on a physical device
- Light, dark, RTL, keyboard-only, touch, and Reduce Motion

Baseline is a compatibility floor, not a substitute for testing actual component behavior.
