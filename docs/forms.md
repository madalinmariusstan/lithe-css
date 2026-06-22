# Forms

```html
<div class="form-group">
  <label class="label required" for="email">Email</label>
  <input class="input md" id="email" type="email">
  <span class="form-message">We will not share your address.</span>
</div>
```

Supported sizes are `sm`, `md`, `xl` and `xxl`. The default size is `md`.

Validation may be applied to the control or the group with `valid`, `invalid` and `warning`.

Use `.check-input`, `.radio-input`, `.range`, `.switch-input` and `.switch-control` for opt-in custom controls. The old `.switch-control` alias is deprecated.
