"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** El original iba a 20°, que sobre esta piel se siente un truco. 8° apenas se nota y alcanza. */
const MAX_ROTATION = 8;
const LERP = 0.05;

/**
 * Inclina su contenido siguiendo al cursor dentro del contenedor.
 * En touch no hace nada: no hay cursor que seguir.
 */
export default function HeroTilt({
  children,
  footer,
}: {
  children: ReactNode;
  /** Va dentro de `.hero` pero fuera del elemento que se inclina. */
  footer?: ReactNode;
}) {
  const container = useRef<HTMLElement>(null);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = container.current;
    const el = target.current;
    if (!box || !el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let raf: number | null = null;
    let inside = false;

    const render = () => {
      curX += (tgX - curX) * LERP;
      curY += (tgY - curY) * LERP;

      gsap.set(el, {
        rotateX: curY,
        rotateY: curX,
        transformPerspective: 1000,
        transformOrigin: "center center",
        force3D: true,
      });

      const settled =
        Math.abs(curX - tgX) < 0.01 && Math.abs(curY - tgY) < 0.01;
      if (settled && !inside) {
        raf = null;
        return;
      }
      raf = requestAnimationFrame(render);
    };

    const ensure = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      tgX = ((e.clientX - rect.left) / rect.width - 0.5) * MAX_ROTATION;
      tgY = -((e.clientY - rect.top) / rect.height - 0.5) * MAX_ROTATION;
      inside = true;
      ensure();
    };

    const onLeave = () => {
      tgX = 0;
      tgY = 0;
      inside = false;
      ensure();
    };

    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);

    return () => {
      box.removeEventListener("mousemove", onMove);
      box.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      gsap.set(el, { clearProps: "transform" });
    };
  }, []);

  return (
    <section className="hero" ref={container}>
      <div className="hero-header" ref={target}>
        {children}
      </div>
      {footer}
    </section>
  );
}
