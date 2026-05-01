document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
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
