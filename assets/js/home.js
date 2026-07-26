const slides = document.querySelectorAll(".imageSlides");
const dotsContainer = document.querySelector(".slide-dots");
let current = 0;
let timer;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("button");
  dot.className = "slide-dot";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".slide-dot");

function goTo(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  current = (index + slides.length) % slides.length;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
  resetTimer();
}

function next() {
  goTo(current + 1);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(next, 6000);
}

const container = document.getElementById("slidesContainer");
container.addEventListener("mouseenter", () => clearInterval(timer));
container.addEventListener("mouseleave", resetTimer);

goTo(0);

document.querySelectorAll(".card").forEach((element) => {
  element.addEventListener("click", (event) => {
    const link = element.querySelector("a");
    if (link) window.location.href = link.href;
  });
});
