import Image from "next/image";
import Reveal from "@/components/layout/Reveal";
import WorkMarquee from "@/components/work/WorkMarquee";
import { bio, herramientas, queHago, site } from "@/data/site";

/**
 * Bio — la portada. Su recorrido contado en primera persona, y debajo la
 * información dura (qué hace, con qué) en columnas que se escanean.
 */
export default function Bio() {
  return (
    <>
      {/* Todo centrado en una sola columna: retrato chico arriba, después el
          saludo y los párrafos. Ailu quiere la portada lo más simple posible. */}
      <section className="u-shell flex flex-col items-center pt-[clamp(3rem,2rem+6vw,7rem)] text-center">
        {/* La proporción se fija por CSS y no se deja librada al archivo: el
            resize dejó 1400×2490, que da 0.5622 y no el 0.5625 exacto.
            `object-cover` se come esa diferencia de dos píxeles.
            El `width`/`height` tiene que ser el REAL del archivo: es lo que usa
            next/image para reservar el lugar antes de cargar, y si miente el
            contenido salta cuando entra la foto. */}
        <Reveal className="w-[clamp(9rem,6rem+10vw,13rem)]">
          <Image
            src="/bio/retrato.webp"
            alt={site.nombre}
            width={1400}
            height={2490}
            sizes="13rem"
            priority
            className="aspect-[3/4] w-full object-cover grayscale"
          />
        </Reveal>

        <Reveal as="h1" delay={0.06} className="mt-[clamp(2rem,1.5rem+2vw,3rem)] text-step-3">
          {bio.titular}
        </Reveal>

        <div className="mt-[clamp(1.5rem,1rem+2vw,2.5rem)] flex flex-col items-center gap-5">
          {bio.parrafos.map((p, i) => (
            <Reveal key={p.slice(0, 24)} as="p" delay={0.06 * (i + 2)}>
              <span className="u-measure mx-auto block text-step-0 text-ink/80">
                {p}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="u-shell mt-[var(--section-y)]">
        <Reveal>
          <h2 className="u-eyebrow text-center">Qué hago</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-[clamp(1.5rem,1rem+3vw,4rem)] gap-y-10 border-t border-line pt-8 text-center sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="u-shell mt-[var(--section-y)]">
        <Reveal>
          <h2 className="u-eyebrow text-center">Herramientas</h2>
        </Reveal>
        <dl className="mx-auto mt-8 max-w-2xl border-t border-line text-center">
          {herramientas.map((h, i) => (
            <Reveal key={h.titulo} delay={0.05 * i}>
              <div className="flex flex-col items-center gap-1 border-b border-line py-4">
                <dt className="text-step-0">{h.titulo}</dt>
                <dd className="text-[length:var(--step--1)] text-muted">
                  {h.items.join(" · ")}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  );
}
