import type Lenis from "lenis";

/**
 * La instancia de Lenis vive en Motion.tsx, pero el menú necesita frenar el
 * scroll mientras está abierto. `overflow: hidden` solo no alcanza: Lenis
 * maneja su propio rAF y sigue scrolleando por debajo del overlay.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
