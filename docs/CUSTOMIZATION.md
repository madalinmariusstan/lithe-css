# Customization

Override semantic tokens after loading Lithe. Component markup does not need to change.

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

Use `data-theme="light"` or `data-theme="dark"` for explicit modes. Omit the attribute to follow the operating-system preference.
