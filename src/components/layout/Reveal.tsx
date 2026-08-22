"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Entrada de un bloque cuando aparece en pantalla: sube 16px y aparece.
 *
 * IntersectionObserver y no una librería de scroll: es una sola transición, la
 * resuelve el CSS (`.reveal` en globals.css) y esto sólo prende el flag. Se
 * desconecta al disparar — la entrada pasa una vez y no vuelve.
 */

/**
 * Red de seguridad. Con el documento oculto (pestaña abierta en segundo plano
 * con cmd+click) el observer NO reporta intersección, porque no hay viewport
 * que intersectar: sin esto el contenido queda invisible hasta que alguien mire
 * la pestaña. Pasado este tiempo se muestra igual — el texto no puede depender
 * de que el observer haya corrido.
 */
const FALLBACK_MS = 1200;
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Segundos. Para escalonar hermanos. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /**
     * Si el bloque nace en medio de una transición de página y ya está a la
     * vista, se muestra de una: el wipe es su entrada. Animarlo además haría
     * que el navegador lo fotografíe a mitad de camino y que el contenido
     * salte al terminar la transición. Lo que está abajo del pliegue sigue
     * entrando con el scroll, como siempre.
     */
    if (document.documentElement.dataset.vt === "page") {
      const caja = el.getBoundingClientRect();
      if (caja.top < window.innerHeight) {
        el.dataset.shown = "true";
        return;
      }
    }

    let timer: number;

    const mostrar = () => {
      el.dataset.shown = "true";
      io.disconnect();
      window.clearTimeout(timer);
    };

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && mostrar(),
      { rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(el);
    timer = window.setTimeout(mostrar, FALLBACK_MS);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
