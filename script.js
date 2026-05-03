/* ── Page Loader ─────────────────────────────────────────────── */
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

/* ── Scroll Reveal ──────────────────────────────────────────── */
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

/* ── Pointer Move Tracking ──────────────────────────────────── */
document
  .querySelectorAll(
    ".profile-card, .project-card, .achievement-card, .profile-skills, .contact-panel, .filled-button, .tonal-button"
  )
  .forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty("--x", `${event.clientX - rect.left}px`);
      item.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });

/* ── Mobile Nav Active State Tracking ───────────────────────── */
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
            item.classList.toggle("active", href === `#${sectionId}`);
          });
        }
      });
    },
    { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
}

/* ── Hide/Show Navbars on Scroll Direction ──────────────────── */
const topBar = document.querySelector(".top-app-bar");
const mobileNav = document.querySelector(".mobile-nav");
const SCROLL_DEAD_ZONE = 8;

let lastScrollY = window.scrollY;
let ticking = false;

const updateNavVisibility = () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  // Don't toggle if within dead zone (prevents jitter)
  if (Math.abs(delta) < SCROLL_DEAD_ZONE) {
    ticking = false;
    return;
  }

  const isScrollingDown = delta > 0;
  const isPastHero = currentScrollY > 120;

  if (isScrollingDown && isPastHero) {
    // Scrolling down — hide both navbars
    if (topBar) topBar.classList.add("nav-hidden");
    if (mobileNav) mobileNav.classList.add("nav-hidden");
  } else {
    // Scrolling up or at top — show both
    if (topBar) topBar.classList.remove("nav-hidden");
    if (mobileNav) mobileNav.classList.remove("nav-hidden");
  }

  lastScrollY = currentScrollY;
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  },
  { passive: true }
);
