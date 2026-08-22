import Image from "next/image";
import Reveal from "@/components/layout/Reveal";
import WorkMarquee from "@/components/work/WorkMarquee";
import { bio, formacion, herramientas, queHago, site } from "@/data/site";

/**
 * Bio — la portada. Su recorrido contado en primera persona, y debajo la
 * información dura (qué hace, con qué, formación) en columnas que se escanean.
 */
export default function Bio() {
  return (
    <>
      {/* El título va DENTRO de la grilla, no arriba. Con el h1 afuera la fila
          arrancaba recién en los párrafos y el retrato quedaba colgando hacia
          abajo; acá se centra contra la columna entera — título más bio. */}
      <section className="u-shell grid gap-[clamp(2rem,1rem+4vw,5rem)] pt-[clamp(3rem,2rem+6vw,7rem)] md:grid-cols-[1fr_minmax(0,22rem)] md:items-center">
        <div>
          <Reveal as="h1" className="u-measure text-step-3">
            {bio.titular}
          </Reveal>

          <div className="mt-[clamp(2.5rem,2rem+3vw,4.5rem)] flex flex-col gap-6">
            {bio.parrafos.map((p, i) => (
              <Reveal key={p.slice(0, 24)} as="p" delay={0.06 * (i + 1)}>
                <span className="u-measure block text-step-0 text-ink/80">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* La proporción se fija por CSS y no se deja librada al archivo: el
            resize dejó 1400×2490, que da 0.5622 y no el 0.5625 exacto.
            `object-cover` se come esa diferencia de dos píxeles.
            El `width`/`height` tiene que ser el REAL del archivo: es lo que usa
            next/image para reservar el lugar antes de cargar, y si miente el
            contenido salta cuando entra la foto. */}
        <Reveal delay={0.2}>
          <Image
            src="/bio/retrato.webp"
            alt={site.nombre}
            width={1400}
            height={2490}
            sizes="(max-width: 767px) 20rem, 22rem"
            priority
            className="mx-auto aspect-[9/16] w-full  object-cover md:max-w-none grayscale"
          />
        </Reveal>
      </section>

      {/* ponytail: en flujo, a lo ancho. A la derecha de la bio va el retrato. */}

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
      <WorkMarquee className="mt-[var(--section-y)]" />

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
