// ==========================================
// SERVICES TAB SWITCHER
// ==========================================

const tabs = document.querySelectorAll(".service-tab");
const cards = document.querySelectorAll(".service-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const serviceId = tab.dataset.service;

    // Remove active classes
    tabs.forEach((t) => t.classList.remove("active"));
    cards.forEach((c) => c.classList.remove("active"));

    // Activate selected tab
    tab.classList.add("active");

    // Activate matching card
    document.getElementById(serviceId).classList.add("active");
  });
});

// ==========================================
// OPTIONAL: Keyboard Navigation
// Left / Right Arrow Keys
// ==========================================

let currentIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % tabs.length;
  } else {
    currentIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  }

  tabs[currentIndex].click();
});

// ==========================================
// OPTIONAL: Auto Scroll Active Tab on Mobile
// ==========================================

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
});
