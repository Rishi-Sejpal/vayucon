// ---------------- Pane Controls ----------------

const hamburger = document.querySelector(".hamburger");

const pane = document.querySelector(".mobile-pane");
const overlay = document.querySelector(".mobile-overlay");

// Pages
const mainMenu = document.getElementById("mainMenu");
const servicesMenu = document.getElementById("servicesMenu");

// Buttons
const servicesBtn = document.getElementById("servicesBtn");

const back1 = document.getElementById("back1");

// ---------------- Functions ----------------

function openPane() {
  pane.classList.add("open");

  overlay.classList.add("open");

  hamburger.classList.add("active");
}

function resetMenus() {
  mainMenu.classList.add("active");

  servicesMenu.classList.remove("active");

  tbMenu.classList.remove("active");
}

function closePane() {
  pane.classList.remove("open");

  overlay.classList.remove("open");

  hamburger.classList.remove("active");

  resetMenus();
}

// ---------------- Open / Close ----------------

hamburger.addEventListener("click", () => {
  if (pane.classList.contains("open")) {
    closePane();
  } else {
    openPane();
  }
});

overlay.addEventListener("click", closePane);

// ---------------- Main Menu ----------------

servicesBtn.addEventListener("click", () => {
  mainMenu.classList.remove("active");

  servicesMenu.classList.add("active");
});

// ---------------- Services ----------------

back1.addEventListener("click", () => {
  servicesMenu.classList.remove("active");

  mainMenu.classList.add("active");
});

// ---------------- Escape Key ----------------

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePane();
  }
});
