(function () {
  "use strict";

  const query = (selector, scope = document) => {
    if (!selector || !scope) return null;
    try { return scope.querySelector(selector); } catch { return null; }
  };

  const queryAll = (selector, scope = document) => {
    if (!selector || !scope) return [];
    try { return Array.from(scope.querySelectorAll(selector)); } catch { return []; }
  };

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const openerByPanel = new WeakMap();

  let lockedScrollY = 0;
  const syncPageLock = () => {
    const shouldLock = document.body.classList.contains("drawer-open") || document.body.classList.contains("sidebar-open");
    if (shouldLock && !document.body.classList.contains("page-locked")) {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.classList.add("page-locked");
    } else if (!shouldLock && document.body.classList.contains("page-locked")) {
      document.body.classList.remove("page-locked");
      document.body.style.top = "";
      window.scrollTo(0, lockedScrollY);
    }
  };
  const visibleFocusable = (scope) => queryAll(focusableSelector, scope).filter((el) => !el.hidden && el.offsetParent !== null && el.getAttribute("aria-disabled") !== "true");

  const restoreFocus = (panel, fallback = null) => {
    const opener = openerByPanel.get(panel) || fallback;
    opener?.focus?.({ preventScroll: true });
    openerByPanel.delete(panel);
  };

  const isMobileNavigation = () => matchMedia("(max-width: 47.999rem)").matches;

  const setNavbarState = (menu, open, trigger = null, restore = true) => {
    if (!menu) return;
    if (open && trigger) openerByPanel.set(menu, trigger);
    menu.classList.toggle("open", open);
    menu.toggleAttribute("hidden", isMobileNavigation() && !open);
    menu.toggleAttribute("inert", isMobileNavigation() && !open);
    queryAll("[data-navbar-toggle]").forEach((item) => {
      if (item.getAttribute("data-navbar-toggle") === `#${menu.id}`) {
        item.setAttribute("aria-expanded", String(open));
      }
    });
    if (!open && restore) {
      const fallback = queryAll("[data-navbar-toggle]").find((item) => item.getAttribute("data-navbar-toggle") === `#${menu.id}`) || null;
      restoreFocus(menu, fallback);
    }
  };

  const getVisualViewportRect = () => {
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft || 0;
    const top = viewport?.offsetTop || 0;
    const width = viewport?.width || window.innerWidth;
    const height = viewport?.height || window.innerHeight;
    return { left, top, right: left + width, bottom: top + height };
  };

  const positionDropdown = (dropdown) => {
    const menu = query(".dropdown-menu", dropdown);
    const trigger = query("[data-dropdown]", dropdown);
    if (!menu || !trigger) return;

    const margin = 8;
    const viewport = getVisualViewportRect();
    menu.classList.remove("flip-x", "flip-y");
    menu.style.removeProperty("--dropdown-shift-x");
    menu.style.removeProperty("--dropdown-max-block-size");

    let menuRect = menu.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const spaceBelow = viewport.bottom - triggerRect.bottom;
    const spaceAbove = triggerRect.top - viewport.top;
    const available = Math.max(96, Math.max(spaceBelow, spaceAbove) - margin);
    menu.style.setProperty("--dropdown-max-block-size", `${Math.floor(available)}px`);

    if (menuRect.bottom > viewport.bottom - margin && spaceAbove > spaceBelow) {
      menu.classList.add("flip-y");
      menuRect = menu.getBoundingClientRect();
    }

    let shiftX = 0;
    if (menuRect.left < viewport.left + margin) {
      shiftX += viewport.left + margin - menuRect.left;
    }
    if (menuRect.right + shiftX > viewport.right - margin) {
      shiftX -= menuRect.right + shiftX - (viewport.right - margin);
    }

    if (shiftX) menu.style.setProperty("--dropdown-shift-x", `${Math.round(shiftX)}px`);
  };

  const closeDropdown = (dropdown, restore = false) => {
    if (!dropdown) return;
    const trigger = query("[data-dropdown]", dropdown);
    dropdown.classList.remove("open");
    const menu = query(".dropdown-menu", dropdown);
    menu?.style.removeProperty("--dropdown-shift-x");
    menu?.style.removeProperty("--dropdown-max-block-size");
    trigger?.setAttribute("aria-expanded", "false");
    if (restore) trigger?.focus();
  };

  const closeDropdowns = (except = null, restore = false) => {
    queryAll(".dropdown.open").forEach((dropdown) => {
      if (dropdown !== except) closeDropdown(dropdown, restore);
    });
  };

  const dropdownItems = (dropdown) => queryAll(".dropdown-item:not([disabled]):not([aria-disabled='true'])", dropdown);

  const openDropdown = (dropdown) => {
    if (!dropdown) return;
    closeDropdowns(dropdown);
    const trigger = query("[data-dropdown]", dropdown);
    dropdown.classList.add("open");
    trigger?.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => { positionDropdown(dropdown); dropdownItems(dropdown)[0]?.focus(); });
  };

  const setSidebarState = (sidebar, open, trigger = null, restore = true) => {
    if (!sidebar) return;
    if (open) {
      queryAll(".sidebar.open").forEach((item) => {
        if (item !== sidebar) setSidebarState(item, false, null, false);
      });
      openerByPanel.set(sidebar, trigger || document.activeElement);
    }
    sidebar.classList.toggle("open", open);
    sidebar.setAttribute("aria-hidden", String(!open));
    if (open) sidebar.removeAttribute("inert"); else sidebar.setAttribute("inert", "");
    queryAll("[data-sidebar]").forEach((item) => {
      if ((item.getAttribute("data-sidebar") || "#sidebar") === `#${sidebar.id}`) item.setAttribute("aria-expanded", String(open));
    });
    queryAll("[data-sidebar-backdrop]").forEach((backdrop) => {
      if ((backdrop.getAttribute("data-sidebar-backdrop") || "#sidebar") === `#${sidebar.id}`) backdrop.classList.toggle("open", open);
    });
    document.body.classList.toggle("sidebar-open", queryAll(".sidebar.open").length > 0);
    syncPageLock();
    if (open) requestAnimationFrame(() => visibleFocusable(sidebar)[0]?.focus());
    else if (restore) restoreFocus(sidebar);
  };

  const closeDrawer = (drawer, restore = true) => {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    drawer.setAttribute("inert", "");
    queryAll("[data-drawer-open]").forEach((trigger) => {
      if (trigger.getAttribute("data-drawer-open") === `#${drawer.id}`) trigger.setAttribute("aria-expanded", "false");
    });
    queryAll("[data-drawer-backdrop]").forEach((backdrop) => {
      if (backdrop.getAttribute("data-drawer-backdrop") === `#${drawer.id}`) backdrop.classList.remove("open");
    });
    document.body.classList.toggle("drawer-open", queryAll(".drawer.open").length > 0);
    syncPageLock();
    if (restore) restoreFocus(drawer);
  };

  const openDrawer = (drawer, trigger) => {
    if (!drawer) return;
    queryAll(".drawer.open").forEach((item) => closeDrawer(item, false));
    openerByPanel.set(drawer, trigger || document.activeElement);
    drawer.classList.add("open");
    drawer.removeAttribute("inert");
    drawer.setAttribute("aria-hidden", "false");
    queryAll("[data-drawer-open]").forEach((item) => {
      if (item.getAttribute("data-drawer-open") === `#${drawer.id}`) item.setAttribute("aria-expanded", "true");
    });
    queryAll("[data-drawer-backdrop]").forEach((backdrop) => {
      if (backdrop.getAttribute("data-drawer-backdrop") === `#${drawer.id}`) backdrop.classList.add("open");
    });
    document.body.classList.add("drawer-open");
    syncPageLock();
    requestAnimationFrame(() => visibleFocusable(drawer)[0]?.focus());
  };

  const activateTab = (tab, focus = false) => {
    if (!tab || tab.disabled || tab.getAttribute("aria-disabled") === "true") return;
    const tabs = tab.closest(".tabs");
    const target = tab.getAttribute("data-tab");
    if (!tabs || !target) return;
    queryAll("[data-tab]", tabs).forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.setAttribute("tabindex", selected ? "0" : "-1");
    });
    const scope = tabs.parentElement || document;
    queryAll(".tab-panel", scope).forEach((panel) => { panel.hidden = `#${panel.id}` !== target; });
    if (focus) tab.focus();
  };

  const trapFocus = (panel, event) => {
    if (event.key !== "Tab") return false;
    const items = visibleFocusable(panel);
    if (!items.length) return false;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); return true; }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); return true; }
    return false;
  };

  document.addEventListener("click", (event) => {
    const dropdownTrigger = event.target.closest?.("[data-dropdown]");
    if (dropdownTrigger) {
      const dropdown = dropdownTrigger.closest(".dropdown");
      dropdown?.classList.contains("open") ? closeDropdown(dropdown, true) : openDropdown(dropdown);
      return;
    }

    const dropdownItem = event.target.closest?.(".dropdown-item");
    if (dropdownItem && dropdownItem.getAttribute("aria-disabled") !== "true" && !dropdownItem.disabled) {
      closeDropdown(dropdownItem.closest(".dropdown"), true);
    }

    const navbarTrigger = event.target.closest?.("[data-navbar-toggle]");
    if (navbarTrigger) {
      const menu = query(navbarTrigger.getAttribute("data-navbar-toggle"));
      if (!menu) return;
      setNavbarState(menu, !menu.classList.contains("open"), navbarTrigger);
      return;
    }

    const navbarLink = event.target.closest?.(".navbar-link");
    if (navbarLink && isMobileNavigation()) {
      const menu = navbarLink.closest(".navbar-menu");
      if (menu) setNavbarState(menu, false, null, false);
    }

    const sidebarTrigger = event.target.closest?.("[data-sidebar]");
    if (sidebarTrigger) {
      const sidebar = query(sidebarTrigger.getAttribute("data-sidebar") || "#sidebar");
      setSidebarState(sidebar, !sidebar?.classList.contains("open"), sidebarTrigger);
      return;
    }

    const sidebarBackdrop = event.target.closest?.("[data-sidebar-backdrop]");
    if (sidebarBackdrop) {
      setSidebarState(query(sidebarBackdrop.getAttribute("data-sidebar-backdrop") || "#sidebar"), false);
      return;
    }

    const tab = event.target.closest?.("[data-tab]");
    if (tab) { activateTab(tab); return; }

    const dialogOpen = event.target.closest?.("[data-dialog-open]");
    if (dialogOpen) {
      const dialog = query(dialogOpen.getAttribute("data-dialog-open"));
      if (dialog?.showModal) { openerByPanel.set(dialog, dialogOpen); dialog.showModal(); }
      return;
    }

    const dialogClose = event.target.closest?.("[data-dialog-close]");
    if (dialogClose) { dialogClose.closest("dialog")?.close(dialogClose.getAttribute("data-dialog-close") || ""); return; }

    const drawerOpen = event.target.closest?.("[data-drawer-open]");
    if (drawerOpen) { openDrawer(query(drawerOpen.getAttribute("data-drawer-open")), drawerOpen); return; }

    const drawerClose = event.target.closest?.("[data-drawer-close]");
    if (drawerClose) { closeDrawer(drawerClose.closest(".drawer") || query(drawerClose.getAttribute("data-drawer-close"))); return; }

    const drawerBackdrop = event.target.closest?.("[data-drawer-backdrop]");
    if (drawerBackdrop) { closeDrawer(query(drawerBackdrop.getAttribute("data-drawer-backdrop"))); return; }

    const tagRemove = event.target.closest?.("[data-tag-remove]");
    if (tagRemove) { tagRemove.closest(".tag")?.remove(); return; }

    const toastClose = event.target.closest?.("[data-toast-close]");
    if (toastClose) { toastClose.closest(".toast")?.remove(); return; }

    if (!event.target.closest?.(".dropdown")) closeDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    const dropdownTrigger = event.target.closest?.("[data-dropdown]");
    if (dropdownTrigger && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      const dropdownRoot = dropdownTrigger.closest(".dropdown");
      openDropdown(dropdownRoot);
      const items = dropdownItems(dropdownRoot);
      requestAnimationFrame(() => (event.key === "ArrowUp" ? items.at(-1) : items[0])?.focus());
      return;
    }

    const dropdown = event.target.closest?.(".dropdown");
    if (dropdown?.classList.contains("open")) {
      const items = dropdownItems(dropdown);
      const index = items.indexOf(document.activeElement);
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        let next = index;
        if (event.key === "Home") next = 0;
        else if (event.key === "End") next = items.length - 1;
        else if (event.key === "ArrowDown") next = (Math.max(index, -1) + 1) % items.length;
        else next = (index <= 0 ? items.length : index) - 1;
        items[next]?.focus();
        return;
      }
      if (event.key === "Escape") { event.preventDefault(); closeDropdown(dropdown, true); return; }
      if (event.key === "Tab") closeDropdown(dropdown, false);
    }

    const currentTab = event.target.closest?.("[data-tab]");
    if (currentTab && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const tabList = currentTab.closest(".tabs");
      const vertical = tabList?.classList.contains("vertical") || tabList?.getAttribute("aria-orientation") === "vertical";
      const allowed = vertical ? ["ArrowUp", "ArrowDown", "Home", "End"] : ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (allowed.includes(event.key)) {
        const tabs = queryAll("[data-tab]:not([disabled]):not([aria-disabled='true'])", tabList);
        const index = tabs.indexOf(currentTab);
        const rtl = getComputedStyle(currentTab).direction === "rtl";
        let next = index;
        if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + (rtl && !vertical ? -1 : 1) + tabs.length) % tabs.length;
        else next = (index + (rtl && !vertical ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        activateTab(tabs[next], true);
        return;
      }
    }

    const openDrawerElement = query(".drawer.open");
    if (openDrawerElement && trapFocus(openDrawerElement, event)) return;
    const openSidebarElement = query(".sidebar.open");
    if (openSidebarElement && trapFocus(openSidebarElement, event)) return;

    if (event.key !== "Escape") return;
    closeDropdowns(null, true);
    queryAll(".navbar-menu.open").forEach((menu) => setNavbarState(menu, false));
    queryAll(".sidebar.open").forEach((sidebar) => setSidebarState(sidebar, false));
    queryAll(".drawer.open").forEach((drawer) => closeDrawer(drawer));
  });

  document.addEventListener("close", (event) => {
    if (event.target instanceof HTMLDialogElement) restoreFocus(event.target);
  }, true);

  document.addEventListener("change", (event) => {
    const input = event.target.closest?.(".file-upload-input");
    if (!input) return;
    const output = query(".file-upload-name", input.closest(".file-upload"));
    if (output) output.textContent = Array.from(input.files || []).map((file) => file.name).join(", ");
  });

  const fileUploadFromEvent = (event) => event.target instanceof Element ? event.target.closest(".file-upload") : null;

  ["dragenter", "dragover"].forEach((name) => {
    document.addEventListener(name, (event) => {
      const upload = fileUploadFromEvent(event);
      if (!upload) return;
      event.preventDefault();
      upload.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    document.addEventListener(name, (event) => {
      const upload = fileUploadFromEvent(event);
      if (!upload) return;
      event.preventDefault();
      upload.classList.remove("dragover");
    });
  });

  const updateRange = (range) => {
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const value = Number(range.value);
    const progress = max === min ? 0 : ((value - min) / (max - min)) * 100;
    range.style.setProperty("--range-progress", `${Math.min(100, Math.max(0, progress))}%`);
  };

  queryAll(".range").forEach(updateRange);
  document.addEventListener("input", (event) => {
    const range = event.target.closest?.(".range");
    if (range) updateRange(range);
  });

  const repositionOpenDropdowns = () => {
    queryAll(".dropdown.open").forEach(positionDropdown);
  };

  window.addEventListener("scroll", repositionOpenDropdowns, { passive: true });
  window.visualViewport?.addEventListener("resize", repositionOpenDropdowns, { passive: true });
  window.visualViewport?.addEventListener("scroll", repositionOpenDropdowns, { passive: true });

  const mobileQuery = matchMedia("(max-width: 47.999rem)");
  let previousMobileState = mobileQuery.matches;
  const syncResponsivePanels = () => {
    queryAll(".navbar-menu").forEach((menu) => {
      if (mobileQuery.matches) {
        const open = menu.classList.contains("open");
        menu.toggleAttribute("hidden", !open);
        menu.toggleAttribute("inert", !open);
      } else {
        menu.classList.remove("open");
        menu.removeAttribute("hidden");
        menu.removeAttribute("inert");
        queryAll("[data-navbar-toggle]").forEach((trigger) => {
          if (trigger.getAttribute("data-navbar-toggle") === `#${menu.id}`) trigger.setAttribute("aria-expanded", "false");
        });
      }
    });
    queryAll(".sidebar").forEach((sidebar) => {
      if (!mobileQuery.matches) {
        setSidebarState(sidebar, false, null, false);
        sidebar.removeAttribute("inert");
        sidebar.removeAttribute("aria-hidden");
      } else if (!sidebar.classList.contains("open")) {
        sidebar.setAttribute("inert", "");
        sidebar.setAttribute("aria-hidden", "true");
      }
    });
    queryAll(".drawer").forEach((drawer) => {
      if (!drawer.classList.contains("open")) drawer.setAttribute("inert", "");
    });
  };
  const handleBreakpointChange = () => {
    previousMobileState = mobileQuery.matches;
    closeDropdowns();
    syncResponsivePanels();
  };

  const handleWindowResize = () => {
    repositionOpenDropdowns();
    if (mobileQuery.matches !== previousMobileState) handleBreakpointChange();
  };

  syncResponsivePanels();
  mobileQuery.addEventListener("change", handleBreakpointChange);
  window.addEventListener("resize", handleWindowResize, { passive: true });

  // Safari can leave the visual viewport offset after the keyboard closes.
  // Keep the workaround limited to Apple touch devices with Visual Viewport.
  const isAppleTouchDevice = navigator.maxTouchPoints > 1 && /Apple/i.test(navigator.vendor || "");
  const supportsVisualViewport = typeof window.visualViewport !== "undefined";

  if (isAppleTouchDevice && supportsVisualViewport) {
    document.addEventListener("focusout", (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.matches(".input, .select, .textarea, .file-input")) return;
      window.setTimeout(() => {
        const active = document.activeElement;
        if (active instanceof Element && active.matches("input, select, textarea, [contenteditable='true']")) return;
        window.scrollTo(window.scrollX, window.scrollY);
      }, 120);
    });
  }
})();
