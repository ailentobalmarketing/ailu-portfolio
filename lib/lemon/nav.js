// Portado de Lemon Bureau (awwwards-library, scroll-animation-59).
// La lógica de animación es la original; sólo cambia de dónde salen los datos
// y que se monta/desmonta desde React en vez de al importar el módulo.

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { getLenis } from "@/lib/lenis";

gsap.registerPlugin(SplitText);

// El original importaba el módulo de Lenis por URL. Acá la instancia la crea
// Motion.tsx, así que se pide por el registro compartido.

let menuItems = [];
let menuCopy = { col1: [], col2: [] };

function buildNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  // Prevent duplicate overlays if any script re-runs.
  const existingOverlay = document.querySelector(".menu-overlay");
  if (existingOverlay) existingOverlay.remove();

  const toggler = nav.querySelector(".nav-toggler");
  if (toggler) {
    toggler.innerHTML = `
      <div class="nav-toggle-wrapper">
        <p class="open-label">Menu</p>
        <p class="close-label">Cerrar</p>
      </div>
    `;
  }

  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  const col = (groups) =>
    groups
      .map(
        (g) => `
        <div class="menu-content-group">
          ${g.map((line) => (line.href ? `<a href="${line.href}"${line.blank ? ' target="_blank" rel="noopener"' : ""}>${line.text}</a>` : `<p>${line.text}</p>`)).join("")}
        </div>`,
      )
      .join("");

  overlay.innerHTML = `
    <div class="menu-content">
      <div class="menu-col" data-col="0">${col(menuCopy.col1)}</div>
      <div class="menu-col" data-col="1">${col(menuCopy.col2)}</div>
    </div>

    <div class="menu-links-wrapper">
      ${menuItems
        .map(
          (item) => `
        <div class="menu-link" data-route="${item.route}">
          <a href="${item.route}">
            <span>${item.label}</span>
            <span>${item.label}</span>
          </a>
        </div>
      `,
        )
        .join("")}
      <div class="link-highlighter"></div>
    </div>
  `;

  document.body.appendChild(overlay);
}

function initMenu() {
  buildNav();

  const navToggler = document.querySelector(".nav-toggler");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuLinksWrapper = document.querySelector(".menu-links-wrapper");
  const linkHighlighter = document.querySelector(".link-highlighter");
  const menuLinks = Array.from(document.querySelectorAll(".menu-link a"));
  const menuLinkContainers = Array.from(
    document.querySelectorAll(".menu-link"),
  );
  const openLabel = document.querySelector(".open-label");
  const closeLabel = document.querySelector(".close-label");
  const menuCols = Array.from(document.querySelectorAll(".menu-col"));

  let isMenuOpen = false;
  let isMenuAnimating = false;

  const splitTextInstances = [];

  function setupLinkSplits() {
    splitTextInstances.forEach((s) => s.revert && s.revert());
    splitTextInstances.length = 0;

    menuLinks.forEach((link) => {
      const spans = link.querySelectorAll("span");
      spans.forEach((span, i) => {
        const split = new SplitText(span, { type: "chars" });
        splitTextInstances.push(split);
        split.chars.forEach((c) => c.classList.add("char"));
        if (i === 1) {
          gsap.set(split.chars, { y: "110%" });
        }
      });
    });
  }

  const menuColSplitInstances = [];

  function setupColSplits() {
    if (isMenuOpen) return;

    menuColSplitInstances.forEach((s) => s.revert && s.revert());
    menuColSplitInstances.length = 0;

    menuCols.forEach((col) => {
      col.querySelectorAll("p, a").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
        menuColSplitInstances.push(split);
        gsap.set(split.lines, { y: "100%" });
      });
    });
  }

  function setInitialStates() {
    gsap.set(menuLinks, { y: "150%" });
    gsap.set(linkHighlighter, { y: "150%" });

    const firstLinkContainer = menuLinkContainers[0];
    const firstLinkSpan = firstLinkContainer
      ? firstLinkContainer.querySelector("a span")
      : null;

    if (firstLinkSpan) {
      const linkWidth = firstLinkSpan.offsetWidth;
      linkHighlighter.style.width = linkWidth + "px";
      currentHighlighterWidth = linkWidth;
      targetHighlighterWidth = linkWidth;

      const linkRect = firstLinkContainer.getBoundingClientRect();
      const wrapperRect = menuLinksWrapper.getBoundingClientRect();
      const initialX = linkRect.left - wrapperRect.left;
      currentHighlighterX = initialX;
      targetHighlighterX = initialX;
    }
  }

  const lerpFactor = 0.05;

  let currentHighlighterX = 0;
  let targetHighlighterX = 0;
  let currentHighlighterWidth = 0;
  let targetHighlighterWidth = 0;

  let rafId = null;

  function animateLoop() {
    currentHighlighterX +=
      (targetHighlighterX - currentHighlighterX) * lerpFactor;
    currentHighlighterWidth +=
      (targetHighlighterWidth - currentHighlighterWidth) * lerpFactor;

    gsap.set(linkHighlighter, {
      x: currentHighlighterX,
      width: currentHighlighterWidth,
    });

    rafId = requestAnimationFrame(animateLoop);
  }

  function startDesktopTracking() {
    if (window.innerWidth < 1000) return;
    if (rafId) return;
    menuLinksWrapper.addEventListener("mouseleave", onLinksWrapperLeave);
    rafId = requestAnimationFrame(animateLoop);
  }

  function stopDesktopTracking() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    menuLinksWrapper.removeEventListener("mouseleave", onLinksWrapperLeave);
  }

  function onLinkEnter(container) {
    if (window.innerWidth < 1000) return;

    const spans = container.querySelectorAll("a span");
    if (!spans || spans.length < 2) return;

    const visibleChars = spans[0].querySelectorAll(".char");
    const animatedChars = spans[1].querySelectorAll(".char");

    gsap.to(visibleChars, {
      y: "-110%",
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.inOut",
    });
    gsap.to(animatedChars, {
      y: "0%",
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.inOut",
    });

    const linkRect = container.getBoundingClientRect();
    const wrapperRect = menuLinksWrapper.getBoundingClientRect();
    targetHighlighterX = linkRect.left - wrapperRect.left;

    const firstSpan = container.querySelector("a span");
    targetHighlighterWidth = firstSpan
      ? firstSpan.offsetWidth
      : container.offsetWidth;
  }

  function onLinkLeave(container) {
    if (window.innerWidth < 1000) return;

    const spans = container.querySelectorAll("a span");
    if (!spans || spans.length < 2) return;

    const visibleChars = spans[0].querySelectorAll(".char");
    const animatedChars = spans[1].querySelectorAll(".char");

    gsap.to(animatedChars, {
      y: "110%",
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.inOut",
    });
    gsap.to(visibleChars, {
      y: "0%",
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.inOut",
    });
  }

  function onLinksWrapperLeave() {
    const firstContainer = menuLinkContainers[0];
    if (!firstContainer) return;
    const firstSpan = firstContainer.querySelector("a span");
    if (!firstSpan) return;

    const linkRect = firstContainer.getBoundingClientRect();
    const wrapperRect = menuLinksWrapper.getBoundingClientRect();
    targetHighlighterX = linkRect.left - wrapperRect.left;
    targetHighlighterWidth = firstSpan.offsetWidth;
  }

  menuLinkContainers.forEach((container) => {
    container.addEventListener("mouseenter", () => onLinkEnter(container));
    container.addEventListener("mouseleave", () => onLinkLeave(container));

    // Let the browser perform a normal anchor navigation.
    // This keeps cross-document view transitions eligible and reliable.
    const a = container.querySelector("a");
    if (a) {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href") || "";
        const currentPath = window.location.pathname;
        if (href && currentPath === href) e.preventDefault();
      });
    }
  });

  function toggleMenu() {
    if (isMenuAnimating) return;
    isMenuAnimating = true;

    if (!isMenuOpen) {
      getLenis()?.stop();
      startDesktopTracking();

      gsap.to(openLabel, { y: "-100%", duration: 1, ease: "power3.out" });
      gsap.to(closeLabel, { y: "-100%", duration: 1, ease: "power3.out" });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          menuLinkContainers.forEach((c) => (c.style.overflow = "visible"));
          isMenuOpen = true;
          isMenuAnimating = false;
        },
      });

      gsap.to(menuLinks, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
      });

      gsap.to(linkHighlighter, {
        y: "0%",
        duration: 1,
        delay: 1,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        const splitLines = col.querySelectorAll(".split-line");
        gsap.to(splitLines, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          delay: 0.5,
          ease: "expo.out",
        });
      });
    } else {
      gsap.to(openLabel, { y: "0%", duration: 1, ease: "power3.out" });
      gsap.to(closeLabel, { y: "0%", duration: 1, ease: "power3.out" });

      menuCols.forEach((col) => {
        const splitLines = col.querySelectorAll(".split-line");
        gsap.to(splitLines, {
          y: "-100%",
          duration: 1,
          stagger: 0,
          ease: "expo.out",
        });
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          stopDesktopTracking();
          gsap.set(menuOverlay, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(menuLinks, { y: "150%" });
          gsap.set(linkHighlighter, { y: "150%" });
          menuLinkContainers.forEach((c) => (c.style.overflow = "hidden"));

          menuCols.forEach((col) => {
            const splitLines = col.querySelectorAll(".split-line");
            gsap.set(splitLines, { y: "100%" });
          });

          setupColSplits();

          isMenuOpen = false;
          isMenuAnimating = false;

          getLenis()?.start();
        },
      });
    }
  }

  navToggler.addEventListener("click", toggleMenu);

  setupLinkSplits();
  setupColSplits();
  setInitialStates();
  // Desktop tracking loop starts only when menu is open.
}

export function initNav({ items, copy }) {
  menuItems = items;
  menuCopy = copy;
  initMenu();

  return () => {
    document.querySelector(".menu-overlay")?.remove();
  };
}
