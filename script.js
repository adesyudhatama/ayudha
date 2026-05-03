const pageLoader = document.querySelector(".page-loader");

const hideLoader = () => {
  if (!pageLoader) return;
  pageLoader.classList.add("is-hidden");
  window.setTimeout(() => {
    pageLoader.remove();
  }, 620);
};

window.addEventListener("load", () => {
  window.setTimeout(hideLoader, 850);
});

window.setTimeout(hideLoader, 2400);

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll(".profile-card, .project-card, .achievement-card, .profile-skills, .contact-panel, .filled-button, .tonal-button").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);
  });
});

// Mobile nav - scroll-based active state tracking
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
const trackedSections = document.querySelectorAll("section[id]");

if (mobileNavItems.length && trackedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          mobileNavItems.forEach((item) => {
            const href = item.getAttribute("href");
            if (href === `#${sectionId}`) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    }
  );

  trackedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
