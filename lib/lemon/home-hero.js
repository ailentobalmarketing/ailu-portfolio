// Portado de Lemon Bureau (awwwards-library, scroll-animation-59).
// La lógica de animación es la original; sólo cambia de dónde salen los datos
// y que se monta/desmonta desde React en vez de al importar el módulo.

import gsap from "gsap";

export function initHomeHero() {
  const hero = document.querySelector(".hero");
  const heroHeader = document.querySelector(".hero-header");

  function setupCursorTilt({ container, target }) {
    if (!container || !target) return;

    const state = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      raf: null,
      isInside: false,
    };

    const LERP = 0.05;
    const MAX_ROTATION = 20;

    const render = () => {
      state.currentX += (state.targetX - state.currentX) * LERP;
      state.currentY += (state.targetY - state.currentY) * LERP;

      gsap.set(target, {
        rotateX: state.currentY,
        rotateY: state.currentX,
        transformPerspective: 1000,
        transformOrigin: "center center",
        force3D: true,
      });

      const isSettled =
        Math.abs(state.currentX - state.targetX) < 0.01 &&
        Math.abs(state.currentY - state.targetY) < 0.01;

      if (isSettled && !state.isInside) {
        state.raf = null;
        return;
      }

      state.raf = requestAnimationFrame(render);
    };

    const ensureLoop = () => {
      if (!state.raf) state.raf = requestAnimationFrame(render);
    };

    container.addEventListener("mousemove", (event) => {
      const rect = container.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

      state.targetX = normalizedX * MAX_ROTATION;
      state.targetY = -normalizedY * MAX_ROTATION;
      state.isInside = true;
      ensureLoop();
    });

    container.addEventListener("mouseleave", () => {
      state.targetX = 0;
      state.targetY = 0;
      state.isInside = false;
      ensureLoop();
    });
  }

  setupCursorTilt({ container: hero, target: heroHeader });
}
