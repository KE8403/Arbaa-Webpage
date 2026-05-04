document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    const requestedView = link.dataset.openView;

    if (!target) {
      return;
    }

    event.preventDefault();
    if (requestedView) {
      openView(requestedView);
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  });
});

const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeTab = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === activeTab;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const viewButtons = document.querySelectorAll("[data-view]");
const viewPanels = document.querySelectorAll("[data-panel-view]");
let currentView = "profile";

function closeMenu() {
  document.body.classList.remove("nav-open");
  siteNav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

function openView(view) {
  currentView = view;

  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  viewPanels.forEach((panel) => {
    const isActive = panel.dataset.panelView === view;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });

  setActiveNav();
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openView(button.dataset.view);
  });
});

function setActiveNav() {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.openView === currentView);
  });
}

openView(currentView);

const heroVisual = document.querySelector(".hero-visual");

heroVisual?.addEventListener("pointermove", (event) => {
  const bounds = heroVisual.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  heroVisual.style.setProperty("--tilt-x", `${y * -5}deg`);
  heroVisual.style.setProperty("--tilt-y", `${x * 6}deg`);
});

heroVisual?.addEventListener("pointerleave", () => {
  heroVisual.style.setProperty("--tilt-x", "0deg");
  heroVisual.style.setProperty("--tilt-y", "0deg");
});
