// ============================================================
// Clean Slate — Application Logic
// ============================================================

(function () {
  "use strict";

  // ── Storage Keys ─────────────────────────────────────────
  const STORAGE_KEYS = {
    theme: "cleanslate_theme"
  };

  // ── DOM Refs ─────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const navTabs = $$(".nav-tab");
  const views = $$(".view");

  // ── Theme ────────────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === "light") {
      document.documentElement.classList.add("light");
      $("#theme-toggle").textContent = "☀️";
    }
  }

  $("#theme-toggle").addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    $("#theme-toggle").textContent = isLight ? "☀️" : "🌙";
  });

  // ── Navigation ───────────────────────────────────────────
  function switchView(viewId) {
    navTabs.forEach((t) => t.classList.toggle("active", t.dataset.view === viewId));
    views.forEach((v) => {
      v.classList.remove("active");
      if (v.id === `view-${viewId}`) {
        v.classList.add("active");
        // Trigger reflow for animation
        v.style.animation = "none";
        v.offsetHeight; 
        v.style.animation = "";
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  $("#nav-logo-home").addEventListener("click", () => switchView("home"));

  // ── Init ─────────────────────────────────────────────────
  initTheme();
  console.log("🚀 Clean Slate initialized.");
})();
