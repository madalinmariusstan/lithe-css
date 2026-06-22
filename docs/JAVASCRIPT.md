# JavaScript API

`dist/lithe.js` is optional and dependency-free. It enhances components already represented by accessible HTML.

## Dropdown

The trigger and menu must share a `.dropdown` ancestor.

```html
<div class="dropdown">
  <button class="button" type="button" data-dropdown aria-expanded="false">Actions</button>
  <div class="dropdown-menu">
    <button class="dropdown-item" type="button">Edit</button>
  </div>
</div>
```

The script supports Arrow Up/Down, Home, End, Escape, viewport clamping and focus restoration.

## Dialog

`data-dialog-open` contains a selector for a native `<dialog>`. `data-dialog-close` closes the nearest dialog.

## Drawer and sidebar

Open attributes contain the target selector. Backdrops use their dedicated backdrop attributes. Focus is trapped while open, page scrolling is restored on close, and Escape closes the active panel.

## Tabs

A `[data-tab]` control targets a panel selector. Use `role="tablist"`, `role="tab"`, and `role="tabpanel"` in application markup.

## Events and ownership

Lithe does not expose a global object. Applications remain responsible for business logic, async state and data loading. The script owns only presentation state, accessibility attributes and focus behavior.
