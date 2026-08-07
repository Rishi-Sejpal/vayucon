document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
       Fade In Sections
    =========================== */

  const sections = document.querySelectorAll(
    ".marine-hero, .marine-overview, .capabilities, .equipment-section, .process-section, .benefits-section, .marine-cta",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => observer.observe(section));

  /* ===========================
       Capability Cards
    =========================== */

  document.querySelectorAll(".capability-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });

  /* ===========================
       Equipment Cards
    =========================== */

  document.querySelectorAll(".equipment-item").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });

  /* ===========================
       Benefit Cards
    =========================== */

  document.querySelectorAll(".benefit-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });

  /* ===========================
       Timeline Animation
    =========================== */

  const steps = document.querySelectorAll(".step");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add("show");
            }, index * 150);
          });

          timelineObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  if (document.querySelector(".timeline")) {
    timelineObserver.observe(document.querySelector(".timeline"));
  }

  /* ===========================
       Smooth Scroll
    =========================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
