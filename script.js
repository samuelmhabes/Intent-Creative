const contactForm = document.querySelector("[data-contact-form]");

const revealItems = document.querySelectorAll(
  [
    ".hero-content > .eyebrow",
    ".hero-content > h1",
    ".hero-big-icon",
    ".hero-content > p",
    ".hero-content > .button-row",
    ".page-hero > *",
    ".section-heading",
    ".split-layout > *",
    ".feature-card",
    ".portfolio-heading > *",
    ".portfolio-card",
    ".brand-showcase > *",
    ".final-cta > *",
    ".service-item",
    ".process-grid > *",
    ".contact-layout > *",
    ".brand-card-section > *",
    ".site-footer > *",
  ].join(", "),
);

if (revealItems.length) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);

    if (item.matches(".hero-big-icon, .brand-showcase > :last-child, .contact-photo-card")) {
      item.dataset.reveal = "right";
    } else if (item.matches(".portfolio-card:nth-child(even), .feature-card:nth-child(even), .service-item:nth-child(even)")) {
      item.dataset.reveal = "right";
    } else if (item.matches(".portfolio-card, .feature-card, .service-item")) {
      item.dataset.reveal = "left";
    } else {
      item.dataset.reveal = "up";
    }
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("reveal-in"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const status = contactForm.querySelector("[data-form-status]");

    if (!name || !email || !message) {
      if (status) {
        status.textContent = "Please add your name, email, and project notes.";
      }
      return;
    }

    const subject = `Intent Creative project inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${project}`,
      "",
      "Project notes:",
      message,
    ].join("\n");

    if (status) {
      status.textContent = "Opening your email app with a pre-filled message.";
    }

    window.location.href = `mailto:intentbrandinginfo@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  });
}
