document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
       Scroll Reveal
    ========================== */

  const revealElements = document.querySelectorAll(`
        .renewable-hero,
        .service-overview,
        .renewable-services,
        .engineering-process,
        .service-cta,
        .feature-card,
        .overview-item,
        .service-card,
        .process-step
    `);

  revealElements.forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => observer.observe(el));

  /* ==========================
       Hero Cards Stagger
    ========================== */

  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  /* ==========================
       Service Cards Stagger
    ========================== */

  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  /* ==========================
       Process Cards Stagger
    ========================== */

  document.querySelectorAll(".process-step").forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  /* ==========================
       Smooth Button Hover Ripple
    ========================== */

  document
    .querySelectorAll(".btn-primary, .btn-secondary")
    .forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        button.style.setProperty("--x", `${e.clientX - rect.left}px`);
        button.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    });
});
