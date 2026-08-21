"use client";
import { useState } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Scroll suave global.
 *
 * Lenis mueve el scroll REAL de la ventana (no transformea un wrapper), así que
 * `position: sticky` y las mediciones siguen funcionando igual.
 *
 * ponytail: sin puente a ScrollTrigger porque no hay un solo ScrollTrigger en
 * el repo — las entradas van con IntersectionObserver (ver Reveal). Meter
 * gsap + ScrollTrigger acá serían ~148 KB de JS en todas las páginas para nadie.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // Se lee una sola vez. En SSR da false y en hidratación el valor real:
  // ReactLenis con `root` no renderiza DOM, así que no hay mismatch.
  const [quieto] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  if (quieto) return <>{children}</>;

  return (
    <ReactLenis root options={{ anchors: true }}>
      {children}
    </ReactLenis>
  );
}
