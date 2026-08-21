"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis";
import { menuLinks, perfil } from "@/content/ailu";

export default function Nav() {
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const mounted = useRef(false);

  // La timeline se construye una vez y después se reproduce en reversa: así el
  // cierre es exactamente el mismo movimiento al revés, sin una segunda receta
  // que se desincronice de la primera.
  useEffect(() => {
    const scope = overlay.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.set(scope, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".menu-link-inner", { yPercent: 110 });
      gsap.set(".menu-meta", { opacity: 0, y: 12 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(scope, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          ease: "power3.inOut",
        })
        .to(
          ".menu-link-inner",
          { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" },
          "-=0.3",
        )
        .to(
          ".menu-meta",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.35",
        );
    }, scope);

    return () => {
      ctx.revert();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;

    if (open) {
      t.play();
      getLenis()?.stop();
    } else if (mounted.current) {
      t.reverse();
      getLenis()?.start();
    }

    mounted.current = true;
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <nav className={open ? "nav nav--on-dark" : "nav"}>
        <a href="/" className="micro nav-name">
          {perfil.nombre}
        </a>
        <button
          type="button"
          className="micro nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menu"}
        </button>
      </nav>

      <div
        id="menu"
        className="menu"
        ref={overlay}
        // Aria-hidden no alcanza: sin inert, los links del menú cerrado siguen
        // siendo tabulables aunque el clip-path los deje invisibles.
        inert={!open}
      >
        <div className="container menu-inner">
          <ul className="menu-links">
            {menuLinks.map((link) => (
              <li className="menu-link" key={link.route}>
                <a href={link.route} onClick={close}>
                  <span className="menu-link-inner">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="menu-foot">
            <div className="menu-meta">
              <p className="micro">Escribime</p>
              <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
            </div>
            <div className="menu-meta">
              <p className="micro">WhatsApp</p>
              <a href={perfil.whatsapp} target="_blank" rel="noopener">
                {perfil.telefono}
              </a>
            </div>
            <div className="menu-meta">
              <p className="micro">Redes</p>
              <a href={perfil.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
