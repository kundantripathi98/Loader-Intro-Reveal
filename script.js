const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Loader selections
const loader = {
  element: document.querySelector(".loader"),
  percentageValues: document.querySelector(".loaderPercentage h1"),
};

// INTRO selections (updated to match your HTML)
const intro = {
  cols: document.querySelectorAll(".column"),          // column 1 & 2
  card: document.querySelector(".card"),               // the black card
  portrait: document.querySelector(".colPortrait"),    // the portrait box
  title: document.querySelectorAll(".colTitle h1"),    // all title h1s
};

// clip paths used for reveal animations
const clipPath = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  full: "inset(0% 0% 0% 0%)",
};

const init = () => {
  // Initial hidden states
  gsap.set(intro.cols[0], { clipPath: clipPath.bottom });
  if (!isMobile) gsap.set(intro.cols[1], { clipPath: clipPath.left });

  gsap.set([intro.title, intro.card], { yPercent: 200 });
  gsap.set(intro.portrait, { clipPath: clipPath.bottom });

  initLoader();
};

const initLoader = () => {
  gsap.set(loader.element, { width: 0 });

  const tl = gsap.timeline({
    onUpdate: () => {
      loader.percentageValues.innerHTML = Math.floor(tl.progress() * 100);
    },
  });

  tl.to(loader.element, {
    duration: 2.4,
    width: isMobile ? "100%" : "60vw",
    ease: "expo.inOut",
  }).call(() => {
    gsap.to(loader.percentageValues, {
      duration: 1.6,
      yPercent: -100,
      ease: "expo.inOut",
      onStart: animateIntro,
      onComplete: () => loader.element.remove(),
    });
  });
};

const animateIntro = () => {
  const tl = gsap.timeline({
    defaults: { duration: 2.4, ease: "expo.inOut" },
  });

  tl.to(isMobile ? intro.cols[0] : intro.cols, { clipPath: clipPath.full })
    .to(intro.title, { yPercent: 0 }, 0.32)
    .to(intro.card, { yPercent: 0 }, 0.32)
    .to(intro.portrait, { clipPath: clipPath.full }, 0.32);
};

// Enable JS
window.addEventListener("DOMContentLoaded", init);
