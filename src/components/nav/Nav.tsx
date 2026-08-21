"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/layout/TransitionLink";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/cn";

const MD = "(min-width: 48rem)"; // breakpoint md de Tailwind

/**
 * Banda blanca sticky. Izquierda: nombre completo + rol chico debajo (sin
 * logo). Derecha: los tres links. En mobile, un botón que abre el overlay.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
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

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // a11y: al abrir, el foco va al primer link; Escape lo devuelve al botón.
    overlay.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      boton.current?.focus();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-nav sticky top-0 z-50 bg-paper text-ink">
        <div className="u-shell flex items-start justify-between gap-5 py-6">
          <TransitionLink
            href="/"
            onClick={() => setOpen(false)}
            className="block leading-none transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60"
          >
            <span className="block text-step-1 tracking-[-0.02em]">
              {site.nombre}
            </span>
            <span className="mt-1.5 block text-[length:var(--step--1)] text-muted">
              {site.rol}
            </span>
          </TransitionLink>

          <nav className="hidden items-center gap-10 pt-1 md:flex">
            {nav.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                className={cn(
                  "u-eyebrow transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60",
                  pathname === l.href && "text-ink",
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
            className="u-eyebrow relative pt-1 text-ink after:absolute after:-inset-x-2 after:top-1/2 after:h-11 after:-translate-y-1/2 md:hidden"
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
              : "invisible [clip-path:inset(50%_50%_50%_50%)]",
          )}
        >
          <nav
            ref={overlay}
            className="u-shell flex h-full flex-col justify-end gap-6 pb-[calc(env(safe-area-inset-bottom)+3rem)]"
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
