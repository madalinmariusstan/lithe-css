# Overlays

Modal dialogs use the native `<dialog>` element. Drawers and off-canvas sidebars use Lithe's optional JavaScript.

```html
<button class="button" data-dialog-open="#confirm">Open</button>
<dialog class="modal" id="confirm">
  <header class="modal-header">
    <h2 class="modal-title">Confirm</h2>
    <button class="modal-close" data-dialog-close aria-label="Close"></button>
  </header>
  <div class="modal-body">Continue?</div>
  <footer class="modal-footer">
    <button class="button secondary" data-dialog-close>Cancel</button>
    <button class="button primary">Confirm</button>
  </footer>
</dialog>
```

Safe-area insets, touch scrolling and backdrop fallbacks are included for iOS/Safari.
