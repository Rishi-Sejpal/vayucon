// ===============================
// Scroll Reveal Animation
// ===============================

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

document
  .querySelectorAll(
    `
    .section-header,
    .overview-image,
    .overview-content,
    .feature-card,
    .service-card,
    .feature-image,
    .feature-content,
    .modern-card,
    .validation-item,
    .process-step,
    .cta-box
`,
  )
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// ===============================
// Hero Cards Stagger Animation
// ===============================

document.querySelectorAll(".feature-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// ===============================
// Smooth Hover Lift
// ===============================

document
  .querySelectorAll(
    `
    .feature-card,
    .service-card,
    .modern-card,
    .validation-item,
    .process-step
`,
  )
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "all .35s ease";
    });
  });

// ===============================
// Active Navigation Highlight
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===============================
// Reveal CSS Classes
// ===============================

const style = document.createElement("style");

style.innerHTML = `

.hidden{

    opacity:0;
    transform:translateY(40px);
    transition:all .8s ease;

}

.show{

    opacity:1;
    transform:translateY(0);

}

.feature-card{

    animation:fadeUp .7s ease both;

}

@keyframes fadeUp{

    from{

        opacity:0;
        transform:translateY(25px);

    }

    to{

        opacity:1;
        transform:translateY(0);

    }

}
`;

document.head.appendChild(style);
