const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitBtn = document.querySelector(".submit-btn");

const message = document.getElementById("message");
const counter = document.getElementById("characterCount");

const RATE_LIMIT_SECONDS = 30;

/* ==========================================================
Buttons
========================================================== */

const BUTTONS = {
  default: `
        <span>Send Enquiry</span>
        <svg viewBox="0 0 24 24">
            <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
        </svg>
    `,

  loading: `<span>Sending...</span>`,

  success: `<span>Message Sent</span>`,

  error: `<span>Try Again</span>`,
};

/* ==========================================================
Reveal Animation
========================================================== */

const revealObserver = new IntersectionObserver(
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

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* ==========================================================
Message Auto Resize
========================================================== */

message.addEventListener("input", () => {
  message.style.height = "auto";
  message.style.height = `${message.scrollHeight}px`;
});

/* ==========================================================
Character Counter
========================================================== */

message.addEventListener("input", () => {
  counter.textContent = `${message.value.length} / 3000`;
});

/* ==========================================================
Sanitize
========================================================== */

function clean(value) {
  return value.trim().replace(/[<>]/g, "").replace(/\s+/g, " ");
}

/* ==========================================================
Validation Rules
========================================================== */

const validators = {
  name(value) {
    return clean(value).length >= 3;
  },

  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(value));
  },

  company(value) {
    const company = clean(value);

    return /^[A-Za-z0-9&.,'()\- ]{2,100}$/.test(company);
  },

  service(value) {
    return value.length > 0;
  },

  message(value) {
    return clean(value).length > 0;
  },
};

/* ==========================================================
Field Validation
========================================================== */

function validateField(id) {
  const input = document.getElementById(id);

  const group = input.closest(".input-group");

  const valid = validators[id](input.value);

  if (valid) {
    group.classList.remove("error");
    group.classList.add("success");

    return true;
  }

  group.classList.remove("success");
  group.classList.add("error");

  return false;
}

/* ==========================================================
Clear Validation While Typing
========================================================== */

Object.keys(validators).forEach((id) => {
  const input = document.getElementById(id);

  input.addEventListener("input", () => {
    const group = input.closest(".input-group");

    group.classList.remove("error");
    group.classList.remove("success");
  });
});

/* ==========================================================
Status Helper
========================================================== */

function showStatus(text = "", color = "") {
  status.textContent = text;
  status.style.color = color;
  setTimeout(() => {
    status.textContent = "";
    status.style.color = "transparent";
  }, 10003);
}

/* ==========================================================
Loading Button
========================================================== */

function setLoading(loading) {
  submitBtn.disabled = loading;

  if (loading) {
    submitBtn.classList.add("loading");
    submitBtn.innerHTML = BUTTONS.loading;
  } else {
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = BUTTONS.default;
  }
}

/* ==========================================================
Rate Limiter
========================================================== */

function canSubmit() {
  const lastSubmission = localStorage.getItem("lastSubmission");

  if (!lastSubmission) return true;

  return Date.now() - Number(lastSubmission) > RATE_LIMIT_SECONDS * 1000;
}

/* ==========================================================
Shake Invalid Field
========================================================== */

function shakeField(input) {
  const group = input.closest(".input-group");

  group.classList.add("shake");

  setTimeout(() => {
    group.classList.remove("shake");
  }, 400);
}

/* ==========================================================
Enter To Submit
========================================================== */

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
    event.preventDefault();

    form.requestSubmit();
  }
});

/* ==========================================================
Submit Handler
Part 2 / 3
========================================================== */

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  showStatus();

  /* -----------------------------
       Rate Limiter
    ----------------------------- */

  if (!canSubmit()) {
    showStatus("Please wait before sending another enquiry.", "#E74C3C");

    return;
  }

  /* -----------------------------
       Validate Form
    ----------------------------- */

  let valid = true;
  let firstInvalid = null;

  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);

    if (!validateField(id)) {
      valid = false;

      shakeField(input);

      if (!firstInvalid) firstInvalid = input;
    }
  });

  if (!valid) {
    firstInvalid.focus();

    showStatus("Please correct the highlighted fields.", "#E74C3C");

    return;
  }

  /* -----------------------------
       Build Data
    ----------------------------- */

  const formData = {
    Name: clean(document.getElementById("name").value),

    Email: clean(document.getElementById("email").value),

    company: clean(document.getElementById("company").value),

    service: document.getElementById("service").value,

    message: clean(document.getElementById("message").value),
  };

  /* -----------------------------
       UI
    ----------------------------- */

  setLoading(true);
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/e70b56c580ce2dbffd2c0c6891aef393`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,

          _subject: "New Enquiry From Website",
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Submission failed");
    }

    localStorage.setItem("lastSubmission", Date.now());

    submitBtn.innerHTML = BUTTONS.success;
    submitBtn.style.background = "#3CB043";

    showStatus(
      "Thank you! Your enquiry has been sent successfully.",
      "#3CB043",
    );

    form.reset();

    counter.textContent = "0 / 3000";

    message.style.height = "150px";

    document
      .querySelectorAll(".success")
      .forEach((el) => el.classList.remove("success"));

    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));

    status.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } catch (error) {
    console.error(error);

    submitBtn.innerHTML = BUTTONS.error;
    submitBtn.style.background = "#E74C3C";

    showStatus("Unable to send your enquiry. Please try again.", "#E74C3C");
  } finally {
    setTimeout(() => {
      setLoading(false);

      submitBtn.style.background = "";
    }, 2000);
  }
});