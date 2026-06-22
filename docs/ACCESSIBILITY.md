# Accessibility

Lithe components expose visible focus states and support keyboard interaction when `lithe.js` is loaded.

- Dropdowns: arrows, Home, End, Escape and Tab.
- Tabs: arrow navigation and correct `aria-selected` state.
- Drawers and off-canvas sidebars: focus trap, Escape and focus restoration.
- Modal: use the native `dialog` element and an accessible label.
- Loading indicators: add `role="status"` and an accessible label unless nested inside a labelled loading button.

Do not disable zoom in the viewport meta tag. Keep labels associated with all controls.
