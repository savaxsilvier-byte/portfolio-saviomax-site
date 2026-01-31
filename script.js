// =========================
// Helpers
// =========================
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// =========================
// Ano no footer
// =========================
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// =========================
// Menu Mobile
// =========================
const nav = $("#menu");
const toggle = $(".nav-toggle");

function setMenu(open) {
  if (!nav || !toggle) return;

  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));

  if (open) {
    const firstLink = $("a", nav);
    if (firstLink) firstLink.focus();
  } else {
    toggle.focus();
  }
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  $$("a", nav).forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (e) => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    const clickedInsideMenu = nav.contains(e.target);
    const clickedToggle = toggle.contains(e.target);
    if (!clickedInsideMenu && !clickedToggle) setMenu(false);
  });
}

// =========================
// FAQ: só um aberto por vez
// =========================
const faqItems = $$(".faq-item");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// =========================
// Scroll to top
// =========================
const scrollTopButtons = $$("[data-scroll-top]");
scrollTopButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
