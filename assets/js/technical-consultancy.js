// ===============================
// Technical Consulting Page JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .highlight-card, .service-card, .expertise-item, .process-step, .benefit-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  animatedElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
  });
});
