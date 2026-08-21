import { site } from "@/data/site";
import LightRays from "@/components/fx/LightRays";

/** Cierre en tinta: contacto directo y el año. Nada más. */
export default function Footer() {
  return (
    <footer className="relative mt-[var(--section-y)] overflow-hidden bg-ink text-paper">
      {/* Luz que cae desde arriba: apenas perceptible, sin color y sin robar
          protagonismo al contacto. Con prefers-reduced-motion desaparece —
          y al quedar display:none el observer nunca levanta el WebGL. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 motion-reduce:hidden"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.35}
          lightSpread={1.4}
          rayLength={1.1}
          fadeDistance={0.8}
          saturation={0}
          followMouse
          mouseInfluence={0.06}
          noiseAmount={0.06}
          distortion={0.02}
        />
      </div>

      <div className="u-shell relative flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="u-eyebrow text-paper/50">Escribime</span>
          <a
            href={`mailto:${site.email}`}
            className="u-link text-step-1 tracking-[-0.02em]"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="u-link text-step-0"
          >
            {site.telefono}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="u-link text-step-0"
          >
            LinkedIn
          </a>
          <p className="mt-4 text-[length:var(--step--1)] text-paper/50">
            © {new Date().getFullYear()} {site.nombre}
          </p>
        </div>
      </div>
    </footer>
  );
}
