# Component reference

## Base

Base contains layout primitives, grid, forms, buttons, tables and utilities. It does not require JavaScript.

Canonical control markup:

```html
<label class="label" for="email">Email</label>
<input class="input" id="email" type="email">
<button class="button primary" type="submit">Save</button>
```

Canonical switch markup:

```html
<label class="switch">
  <input class="switch-input" type="checkbox">
  <span class="switch-control" aria-hidden="true"></span>
  <span>Allow comments</span>
</label>
```

## Extended

Extended contains content, feedback, navigation, overlays, disclosure and app-shell components. Interactive components use the optional `lithe.js` contract.

Canonical modal markup:

```html
<dialog class="modal" id="confirm-dialog">
  <header class="modal-header">
    <h2 class="modal-title">Confirm</h2>
    <button class="modal-close" type="button" data-dialog-close aria-label="Close"></button>
  </header>
  <div class="modal-body">Continue with this action?</div>
  <footer class="modal-footer">
    <button class="button secondary" type="button" data-dialog-close>Cancel</button>
    <button class="button primary" type="button">Continue</button>
  </footer>
</dialog>
```

The supported alpha surface is listed in [`public-api.json`](public-api.json). Unlisted implementation details may change as the framework develops.
