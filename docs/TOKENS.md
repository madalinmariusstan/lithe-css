# Public tokens

Public tokens are the supported customization surface. Override them after loading Lithe; do not copy component rules.

## Semantic colors

```css
:root {
  --background: #fff;
  --surface: #f7f8fa;
  --surface-raised: #fff;
  --text: #20242c;
  --text-muted: #667085;
  --border: #d9dee7;

  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-active: #1e40af;
  --primary-soft: #eff6ff;
  --primary-text: #fff;
}
```

State tokens include `--success`, `--warning`, `--danger`, plus `--success-on-color`, `--warning-on-color`, `--danger-on-color`, and `--danger-text`.

## Shape and elevation

- `--radius`, `--radius-lg`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Spacing and control sizes

- `--space-1` through `--space-5`
- `--control-height-sm`, `--control-height-md`, `--control-height-xl`, `--control-height-xxl`

## Focus

Override `--focus-ring-color` together with the primary palette when a custom fallback color is required.

The complete stable token list is in [`public-api.json`](public-api.json).
