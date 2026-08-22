"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import TransitionLink from "@/components/layout/TransitionLink";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";

const MD = "(min-width: 48rem)"; // breakpoint md de Tailwind

/**
 * Banda sticky sin fondo. Izquierda: nombre completo + rol chico debajo (sin
 * logo). Derecha: los tres links. En mobile, un botón que abre el overlay.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const overlay = useRef<HTMLElement>(null);

  // En desktop el overlay se oculta por CSS: si quedaba abierto al agrandar la
  // ventana, el lock de scroll quedaba pegado.
  useEffect(() => {
    const mq = window.matchMedia(MD);
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    /**
     * El scroll se frena con la API de Lenis, no tocando `overflow` del body.
     * Lenis maneja el scroll real de la ventana y sigue escribiendo posiciones
     * aunque el body diga `hidden`: pelear con él por CSS dejaba a Safari
     * cambiando el estado de su barra inferior al abrir y cerrar el menú.
     * `overflow` queda de respaldo para cuando NO hay Lenis — el caso de
     * reduced-motion, ver SmoothScroll.
     */
    /**
     * Con el menú abierto, la página se esconde entera.
     *
     * El panel es `fixed inset-0`, y en iOS eso NO cubre la franja de la barra
     * de Safari: la página se extiende a pantalla completa por `viewport-fit`,
     * pero el viewport que usa `position: fixed` excluye la barra mientras está
     * desplegada. Probado con `lvh` y con 8rem de sobra: Safari recorta el panel
     * igual. Así que en vez de agrandar la tapa, se saca lo que hay debajo.
     *
     * `visibility` y no `display`: no reflowea, no mueve el scroll y vuelve sin
     * costo. La nav queda visible porque es la que tiene el botón de cerrar.
     */
    document.documentElement.dataset.menu = "abierto";
    lenis?.stop();
    const previo = document.body.style.overflow;
    if (!lenis) document.body.style.overflow = "hidden";

    // a11y: al abrir, el foco va al primer link; Escape lo devuelve al botón.
    overlay.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      boton.current?.focus();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      delete document.documentElement.dataset.menu;
      lenis?.start();
      /**
       * Y recalcular las dimensiones. Al abrir el menú, Safari expande su barra
       * inferior y el viewport se achica; Lenis cachea el alto en ese momento y
       * al cerrar se queda con un límite de scroll más largo que la página. Te
       * deja pasar el final y ahí asoma el blanco del canvas debajo del footer,
       * que es negro. El frame de espera es para medir con la barra ya quieta.
       */
      requestAnimationFrame(() => lenis?.resize());
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <>
      <header className="site-nav sticky top-0 z-50 text-paper">
        <div className="u-shell flex items-start justify-between gap-5 py-6">
          <TransitionLink
            href="/"
            onClick={() => setOpen(false)}
            className="block leading-none transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60"
          >
            <span className="block text-step-1 tracking-[-0.02em] mix-blend-difference">
              {site.nombre}
            </span>
            <span className="mt-1.5 block text-[length:var(--step--1)] mix-blend-difference">
              {site.rol}
            </span>
          </TransitionLink>

          <nav className="hidden items-center gap-10 pt-1 md:flex">
            {nav.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                // La página donde ya estás no es un destino: se apaga a gris.
                // El estado también va en aria-current y no sólo en el color:
                // el gris tiene MENOS contraste que el negro, así que por sí
                // solo no alcanza para marcar dónde estás.
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(
                  "u-eyebrow text-paper transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60",
                  // #757575 invertido da #8a8a8a, el gris del sistema.
                  pathname === l.href && "text-[#757575]",
                )}
              >
                {l.label}
              </TransitionLink>
            ))}
          </nav>

          {/* Mobile: el texto rota (menú ↕ cerrar) dentro de un overflow-hidden.
              El grid-stack lo dimensiona al más ancho para que no salte. */}
          <button
            ref={boton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="u-eyebrow relative pt-1 text-paper after:absolute after:-inset-x-2 after:top-1/2 after:h-11 after:-translate-y-1/2 md:hidden"
          >
            <span aria-hidden className="grid overflow-hidden leading-none">
              <span
                className={cn(
                  "col-start-1 row-start-1 transition-transform duration-[400ms] ease-[var(--ease)]",
                  open ? "-translate-y-full" : "translate-y-0",
                )}
              >
                Menú
              </span>
              <span
                className={cn(
                  "col-start-1 row-start-1 transition-transform duration-[400ms] ease-[var(--ease)]",
                  open ? "translate-y-0" : "translate-y-full",
                )}
              >
                Cerrar
              </span>
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        inert={!open}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className={cn(
            "absolute inset-0 bg-paper [transition:clip-path_0.55s_var(--ease),visibility_0.55s] motion-reduce:transition-none",
            open
              ? "visible [clip-path:inset(0_0_0_0)]"
              : "invisible [clip-path:inset(0_0_100%_0)]",
          )}
        >
          <nav
            ref={overlay}
            className="u-shell flex h-full flex-col justify-end gap-6 pb-[calc(env(safe-area-inset-bottom)+3rem)] text-paper"
          >
            {nav.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-step-3 leading-none"
              >
                {l.label}
              </TransitionLink>
            ))}
            <div className="mt-8 flex flex-col gap-2 border-t border-line pt-8">
              <a href={`mailto:${site.email}`} className="u-link text-step-0">
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="u-link text-step-0"
              >
                {site.telefono}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
