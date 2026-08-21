"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import { proyectos } from "@/data/work";

/**
 * Cinta con todas las fotos de todos los proyectos, cada una linkeando a su
 * detalle.
 *
 * Va con **scroll real**, no con una animación de `transform`. Es la única
 * forma de tener a la vez las dos cosas que se pidieron: que se mueva sola y
 * que se pueda arrastrar con scroll-snap. El snap del navegador opera sobre el
 * scroll del contenedor y no ve un transform, así que con una marquesina CSS
 * clásica el snap directamente no existiría.
 *
 * El movimiento automático avanza `scrollLeft` por frame y cede apenas el
 * usuario arrastra o scrollea en horizontal. El hover no lo detiene.
 *
 * Mobile primero: ahí el riel es táctil y el snap ancla cada foto al soltar.
 * En desktop no hay snap — con mouse trababa la cinta y obligaba a moverla a
 * mano, que era justo lo que no se quería.
 */

const VELOCIDAD = 0.4; // px por frame ≈ 24 px/s
/** Tras soltar, cuánto espera antes de retomar el movimiento solo. */
const REANUDAR_MS = 2500;

const slides = proyectos.flatMap((p) =>
  p.fotos.map((f, i) => ({
    key: `${p.slug}-${i}`,
    src: f.src,
    w: f.w,
    h: f.h,
    alt: f.alt ?? `${p.nombre} — ${p.rubro}`,
    slug: p.slug,
    nombre: p.nombre,
  })),
);

function Tira({ copia = false }: { copia?: boolean }) {
  return (
    <>
      {slides.map((s) => (
        <li
          key={`${copia ? "b" : "a"}-${s.key}`}
          className="h-[13rem] shrink-0 snap-center md:h-[17rem]"
          // La copia existe sólo para que el loop no corte: para un lector de
          // pantalla sería el mismo listado dos veces.
          aria-hidden={copia || undefined}
        >
          <TransitionLink
            href={`/works/${s.slug}`}
            tabIndex={copia ? -1 : undefined}
            className="group relative block h-full"
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              sizes="(max-width: 767px) 60vw, 26rem"
              // eager y no lazy: el riel scrollea horizontalmente y el lazy
              // nativo deja huecos blancos al pasar. La copia reusa la misma
              // URL, así que son 13 descargas y no 26.
              loading="eager"
              className="h-full w-auto object-cover"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-[var(--ease-soft)] group-hover:opacity-100">
              <span className="u-eyebrow text-paper">{s.nombre}</span>
            </span>
          </TransitionLink>
        </li>
      ))}
    </>
  );
}

export default function WorkMarquee({ className }: { className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let soltar = 0;
    let pausaHasta = 0;
    let resto = 0;

    const paso = () => {
      raf = requestAnimationFrame(paso);
      if (performance.now() < pausaHasta) return;

      // El set va duplicado: al pasar la mitad volvemos al punto equivalente
      // del primer set, así el reinicio no se ve.
      const mitad = el.scrollWidth / 2;
      if (mitad > 0 && el.scrollLeft >= mitad) el.scrollLeft -= mitad;

      // scrollLeft redondea a entero: acumulamos el sobrante o a 0.4 px/frame
      // se perdería todo el avance en el redondeo.
      resto += VELOCIDAD;
      const entero = Math.floor(resto);
      if (entero >= 1) {
        el.scrollLeft += entero;
        resto -= entero;
      }
    };

    /**
     * Mientras el usuario manda, el automático no se mete. El snap sólo se
     * activa en esa ventana (`data-libre`): con snap mandatory siempre puesto,
     * el scroll automático queda trabado contra el punto de anclaje y no avanza.
     *
     * El hover NO cede: en desktop trababa la cinta y obligaba a scrollear a
     * mano. A 24 px/s se puede clickear una foto en movimiento sin problema.
     */
    const ceder = (e: Event) => {
      // Un wheel vertical sobre la cinta es la página scrolleando por encima,
      // no intención de mover el riel.
      if (e.type === "wheel") {
        const w = e as WheelEvent;
        if (Math.abs(w.deltaX) <= Math.abs(w.deltaY)) return;
      }

      pausaHasta = performance.now() + REANUDAR_MS;
      el.dataset.libre = "true";
      window.clearTimeout(soltar);
      soltar = window.setTimeout(() => {
        delete el.dataset.libre;
      }, REANUDAR_MS);
    };

    const eventos = ["pointerdown", "wheel", "touchstart", "keydown"] as const;
    eventos.forEach((e) => el.addEventListener(e, ceder, { passive: true }));

    raf = requestAnimationFrame(paso);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(soltar);
      eventos.forEach((e) => el.removeEventListener(e, ceder));
    };
  }, []);

  return (
    <div className={className} aria-label="Trabajos">
      <ul
        ref={ref}
        className="marquee-rail flex gap-2 overflow-x-auto overscroll-x-contain"
      >
        <Tira />
        <Tira copia />
      </ul>
    </div>
  );
}
