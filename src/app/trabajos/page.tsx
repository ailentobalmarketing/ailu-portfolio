import Reveal from "@/components/layout/Reveal";
import WorkCard from "@/components/work/WorkCard";
import { hayDemo, proyectos } from "@/data/work";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Trabajos",
  description:
    "Proyectos de contenido, pauta y gestión de redes para marcas de gastronomía, indumentaria, bienestar y comercio local.",
  path: "/trabajos",
});

/** Grilla de proyectos. Dos columnas en desktop, una en mobile. */
export default function Trabajos() {
  return (
    <section className="u-shell pt-[clamp(3rem,2rem+6vw,7rem)]">
      <Reveal as="h1" className="text-step-3">
        Últimos trabajos
      </Reveal>

      {hayDemo && (
        <Reveal delay={0.08}>
          <p className="u-measure mt-6 border-l border-line pl-4 text-[length:var(--step--1)] text-muted">
            Los proyectos de esta página son de prueba: las marcas son
            inventadas y las fotos, de relleno.
          </p>
        </Reveal>
      )}

      <div className="mt-[clamp(2.5rem,2rem+3vw,4.5rem)] grid gap-x-[clamp(1rem,0.5rem+2vw,2.5rem)] gap-y-[clamp(2.5rem,2rem+3vw,4.5rem)] md:grid-cols-2">
        {proyectos.map((p, i) => (
          <Reveal key={p.slug} delay={0.06 * (i % 2)}>
            <WorkCard proyecto={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
