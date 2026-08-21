// Portado de Lemon Bureau (awwwards-library, scroll-animation-59).
// La lógica de animación es la original; sólo cambia de dónde salen los datos
// y que se monta/desmonta desde React en vez de al importar el módulo.

import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// svg path shapes
const W = 1000;
const H = 1000;
const CX = W / 2;

const HIDDEN = `M0,${H} Q${CX},${H} ${W},${H} L${W},${H} L0,${H} Z`;
const BULGE = `M0,${H * 0.52} Q${CX},${H * 0.26} ${W},${H * 0.52} L${W},${H} L0,${H} Z`;
const FULL = `M0,0 Q${CX},0 ${W},0 L${W},${H} L0,${H} Z`;

// centering helpers
function setCentered(el) {
  gsap.set(el, { xPercent: -50, yPercent: -50 });
}

function setCardOffscreen(el) {
  gsap.set(el, { xPercent: -50, yPercent: 150 });
}

function setTitleOffscreen(el) {
  gsap.set(el, { xPercent: -50, yPercent: 150 });
}

// slide builder
function buildSlide(item, index, isCurrent) {
  const slide = document.createElement("div");
  slide.className = "work-slide" + (isCurrent ? " is-current" : "");
  slide.dataset.index = index;

  slide.innerHTML = `
    <svg
      class="work-slide-svg"
      viewBox="0 0 ${W} ${H}"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path class="work-slide-path" fill="${item.accentColor}" d="${isCurrent ? FULL : HIDDEN}" />
    </svg>
    <div class="work-slide-card-wrap">
      <div class="work-slide-card">
        <div class="work-slide-img" style="background-image: url('${item.image}')"></div>
        <div class="work-slide-scrim"></div>
        <a class="work-slide-link" href="${item.url}"></a>
      </div>
    </div>
    <div class="work-slide-title-wrap">
      <h1 class="work-slide-title">${item.name}</h1>
    </div>
  `;

  const cardWrap = slide.querySelector(".work-slide-card-wrap");
  const titleWrap = slide.querySelector(".work-slide-title-wrap");

  if (isCurrent) {
    setCentered(cardWrap);
    setCentered(titleWrap);
  } else {
    setCardOffscreen(cardWrap);
    setTitleOffscreen(titleWrap);
  }

  return slide;
}

export function initWork(work, meta = "Trabajos") {
  // dom setup
  const carousel = document.querySelector(".work-carousel");
  if (!carousel) return () => {};

  carousel.innerHTML = `
    <div class="work-slides" id="workSlides"></div>
    <aside class="work-sidebar">
      <div class="work-sidebar-inner" id="workSidebar"></div>
    </aside>
    <span class="work-slider-meta">${meta}</span>
    <div class="work-counter">
      <span class="work-counter-current" id="workCounterCurrent">01</span>
    </div>
  `;

  const slidesEl = document.getElementById("workSlides");
  const sidebarEl = document.getElementById("workSidebar");
  const counterCurrent = document.getElementById("workCounterCurrent");

  // initial ring color
  carousel.style.setProperty("--thumb-ring", work[0].ringColor);

  // init first slide
  const firstSlide = buildSlide(work[0], 0, true);
  slidesEl.appendChild(firstSlide);

  const firstSplit = SplitText.create(
    firstSlide.querySelector(".work-slide-title"),
    { type: "words", mask: "words", wordsClass: "word" },
  );
  gsap.set(firstSplit.words, { yPercent: 0 });

  // build sidebar
  work.forEach((item, i) => {
    const thumb = document.createElement("div");
    thumb.className = "work-thumb" + (i === 0 ? " is-active" : "");
    thumb.dataset.index = i;
    thumb.innerHTML = `<img src="${item.image}" alt="${item.name}" />`;
    thumb.addEventListener("click", () => {
      if (isAnimating || i === current) return;
      navigateTo(i);
    });
    sidebarEl.appendChild(thumb);
  });

  // state
  let current = 0;
  let isAnimating = false;

  // navigation
  function navigateTo(nextIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const prevSlide = slidesEl.querySelector(
      `.work-slide[data-index="${current}"]`,
    );
    const allThumbs = [...sidebarEl.querySelectorAll(".work-thumb")];
    const prevThumb = allThumbs.find((t) => +t.dataset.index === current);
    const nextThumb = allThumbs.find((t) => +t.dataset.index === nextIndex);

    const prevCardWrap = prevSlide.querySelector(".work-slide-card-wrap");
    const prevTitleWrap = prevSlide.querySelector(".work-slide-title-wrap");

    const nextSlide = buildSlide(work[nextIndex], nextIndex, false);
    gsap.set(nextSlide, { zIndex: 2 });
    gsap.set(prevSlide, { zIndex: 1 });
    slidesEl.appendChild(nextSlide);
    nextSlide.classList.add("is-current");

    const nextPath = nextSlide.querySelector(".work-slide-path");
    const nextCardWrap = nextSlide.querySelector(".work-slide-card-wrap");
    const nextTitleEl = nextSlide.querySelector(".work-slide-title");
    const nextTitleWrap = nextSlide.querySelector(".work-slide-title-wrap");

    const split = SplitText.create(nextTitleEl, {
      type: "words",
      mask: "words",
      wordsClass: "word",
    });
    gsap.set(split.words, { yPercent: -100 });

    counterCurrent.textContent = String(nextIndex + 1).padStart(2, "0");

    current = nextIndex;

    const tl = gsap.timeline({
      onComplete: () => {
        prevSlide.remove();
        isAnimating = false;
      },
    });

    // prev slide exits
    tl.to(
      prevCardWrap,
      { xPercent: -50, yPercent: -100, duration: 1, ease: "power4.inOut" },
      0,
    );
    tl.to(
      prevTitleWrap,
      { xPercent: -50, yPercent: 25, duration: 0.75, ease: "power3.in" },
      0,
    );

    // new slide svg wipes up
    tl.to(
      nextPath,
      { duration: 0.5, attr: { d: BULGE }, ease: "power4.in" },
      0,
    );
    tl.to(
      nextPath,
      { duration: 0.5, attr: { d: FULL }, ease: "power4.out" },
      0.5,
    );

    // incoming card slides into center
    tl.to(
      nextCardWrap,
      { xPercent: -50, yPercent: -50, duration: 0.75, ease: "power3.out" },
      0.5,
    );

    // incoming title-wrap slides into center
    tl.to(
      nextTitleWrap,
      { xPercent: -50, yPercent: -50, duration: 0.75, ease: "power3.out" },
      0.5,
    );

    // incoming title words drop in
    tl.to(
      split.words,
      { yPercent: 0, duration: 0.75, ease: "power3.out", stagger: 0.1 },
      0.75,
    );

    // sidebar thumb + ring swap
    tl.add(() => {
      prevThumb?.classList.remove("is-active");
      nextThumb?.classList.add("is-active");
      carousel.style.setProperty("--thumb-ring", work[nextIndex].ringColor);
    }, 0.5);
  }

  // wheel input
  let wheelCooldown = false;

  const onWheel = (e) => {
    if (isAnimating || wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => (wheelCooldown = false), 1100);

    const next =
      e.deltaY > 0
        ? current < work.length - 1
          ? current + 1
          : 0
        : current > 0
          ? current - 1
          : work.length - 1;

    navigateTo(next);
  };

  // touch input
  let touchStartY = 0;

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (isAnimating) return;
    const delta = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 40) return;

    const next =
      delta > 0
        ? current < work.length - 1
          ? current + 1
          : 0
        : current > 0
          ? current - 1
          : work.length - 1;

    navigateTo(next);
  };

  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    carousel.innerHTML = "";
  };
}
