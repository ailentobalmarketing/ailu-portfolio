import Image from "next/image";
import Reveal from "@/components/layout/Reveal";
import { bio, formacion, herramientas, queHago, site } from "@/data/site";

/**
 * Bio — la portada. Su recorrido contado en primera persona, y debajo la
 * información dura (qué hace, con qué, formación) en columnas que se escanean.
 */
export default function Bio() {
  return (
    <>
      <section className="u-shell pt-[clamp(3rem,2rem+6vw,7rem)]">
        <Reveal as="h1" className="text-step-3 u-measure">
          {bio.titular}
        </Reveal>

        <div className="mt-[clamp(2.5rem,2rem+3vw,4.5rem)] grid gap-[clamp(2rem,1rem+4vw,5rem)] md:grid-cols-[1fr_minmax(0,22rem)] md:items-start">
          <div className="flex flex-col gap-6">
            {bio.parrafos.map((p, i) => (
              <Reveal key={p.slice(0, 24)} as="p" delay={0.06 * (i + 1)}>
                <span className="u-measure block text-step-0 text-ink/80">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Image
              src="/bio/retrato.jpg"
              alt={site.nombre}
              width={1200}
              height={1500}
              sizes="(max-width: 767px) 100vw, 22rem"
              priority
              className="w-full grayscale"
            />
          </Reveal>
        </div>
      </section>

      <section className="u-shell mt-[var(--section-y)]">
        <Reveal>
          <h2 className="u-eyebrow">Qué hago</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-[clamp(1.5rem,1rem+3vw,4rem)] gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {queHago.map((bloque, i) => (
            <Reveal key={bloque.titulo} delay={0.06 * i}>
              <h3 className="text-step-1 tracking-[-0.02em]">
                {bloque.titulo}
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {bloque.items.map((item) => (
                  <li
                    key={item}
                    className="text-[length:var(--step--1)] leading-relaxed text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="u-shell mt-[var(--section-y)] grid gap-[clamp(2.5rem,2rem+4vw,5rem)] md:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="u-eyebrow">Herramientas</h2>
          </Reveal>
          <dl className="mt-8 border-t border-line">
            {herramientas.map((h, i) => (
              <Reveal key={h.titulo} delay={0.05 * i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                  <dt className="text-step-0">{h.titulo}</dt>
                  <dd className="text-[length:var(--step--1)] text-muted">
                    {h.items.join(" · ")}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <div>
          <Reveal>
            <h2 className="u-eyebrow">Formación</h2>
          </Reveal>
          <dl className="mt-8 border-t border-line">
            {formacion.map((f, i) => (
              <Reveal key={f.titulo} delay={0.05 * i}>
                <div className="border-b border-line py-4">
                  <dt className="text-step-0">{f.titulo}</dt>
                  <dd className="mt-1 text-[length:var(--step--1)] text-muted">
                    {f.lugar}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
