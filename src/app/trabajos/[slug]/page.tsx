import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/layout/Reveal";
import TransitionLink from "@/components/layout/TransitionLink";
import { cn } from "@/lib/cn";
import VideoPieza from "@/components/fx/VideoPieza";
import { esVideo, getProyecto, proyectos, type Pieza } from "@/data/work";
import { JsonLd, breadcrumbJsonLd, meta, proyectoJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) return {};

  return meta({
    title: p.nombre,
    description: `${p.resumen} ${p.rubro}.`,
    path: `/trabajos/${p.slug}`,
    // La misma portada que la grilla: la primera pieza, o su poster si es video.
    image: esVideo(p.piezas[0])
      ? (p.piezas[0].poster ?? p.piezas.find((x) => !esVideo(x))?.src)
      : p.piezas[0]?.src,
  });
}

/** Junta las piezas seguidas que comparten `grupo`, respetando el orden. */
function agrupar(piezas: Pieza[]) {
  const grupos: { titulo?: string; piezas: Pieza[] }[] = [];
  for (const f of piezas) {
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo.titulo === f.grupo) ultimo.piezas.push(f);
    else grupos.push({ titulo: f.grupo, piezas: [f] });
  }
  return grupos;
}

/**
 * Detalle de proyecto. Deliberadamente corto: encabezado, un par de párrafos,
 * la ficha al costado y las fotos apiladas a lo ancho de la medida. Ailu no
 * tiene mucha información por proyecto y forzar más secciones sólo agrega
 * relleno.
 */
export default async function Caso({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) notFound();

  return (
    <article className="u-shell pt-[clamp(3rem,2rem+6vw,7rem)]">
      <JsonLd data={proyectoJsonLd(p)} />
      <JsonLd data={breadcrumbJsonLd(p)} />
      <Reveal>
        <TransitionLink
          href="/trabajos"
          className="u-eyebrow transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60"
        >
          ← Trabajos
        </TransitionLink>
      </Reveal>

      <Reveal as="h1" delay={0.05} className="mt-8 text-step-3">
        {p.nombre}
      </Reveal>

      <div className="mt-[clamp(2rem,1.5rem+3vw,4rem)] grid gap-[clamp(2rem,1rem+4vw,5rem)] md:grid-cols-[1fr_minmax(0,16rem)] md:items-start">
        <div className="flex flex-col gap-5">
          <Reveal as="p" delay={0.1}>
            <span className="u-measure block text-step-1 leading-snug tracking-[-0.02em]">
              {p.resumen}
            </span>
          </Reveal>
          {p.texto.map((t, i) => (
            <Reveal key={t.slice(0, 24)} as="p" delay={0.14 + 0.05 * i}>
              <span className="u-measure block text-ink/80">{t}</span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <dl className="border-t border-line">
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="u-eyebrow">Rubro</dt>
              <dd className="text-[length:var(--step--1)]">{p.rubro}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="u-eyebrow">Qué hice</dt>
              <dd className="mt-2 flex flex-col gap-1">
                {p.servicios.map((s) => (
                  <span key={s} className="text-[length:var(--step--1)]">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* Grilla prolija de 2 columnas en celular y 3 en compu, con las piezas
          alineadas arriba. Antes era un mosaico en `columns` con una columna
          desfasada; Ailu pidió algo más limpio y centrado (28/09/2026). */}
      {/* Si las piezas tienen `grupo`, cada colección va con su título y su
          propio mosaico. Sin grupos queda un único mosaico sin título. */}
      {agrupar(p.piezas).map((g, gi) => (
        <section key={g.titulo ?? gi} className="mt-[var(--section-y)]">
          {g.titulo && (
            <Reveal>
              <h2 className="u-eyebrow border-b border-line pb-3">
                {g.titulo}
              </h2>
            </Reveal>
          )}
          <div
            className={cn(
              "grid grid-cols-2 items-start gap-[clamp(0.4rem,0.2rem+1.4vw,1.25rem)] md:grid-cols-3",
              g.titulo && "mt-6",
            )}
          >
            {g.piezas.map((f, i) => (
              <Reveal
                key={f.src}
              >
                {esVideo(f) ? (
                  <VideoPieza
                    src={f.src}
                    poster={f.poster}
                    w={f.w}
                    h={f.h}
                    alt={f.alt ?? `${p.nombre} — pieza en video`}
                    sonido={f.sonido}
                  />
                ) : (
                  <Image
                    src={f.src}
                    alt={f.alt ?? `${p.nombre} — ${i + 1}`}
                    width={f.w}
                    height={f.h}
                    sizes="(max-width: 767px) 50vw, (max-width: 1344px) 33vw, 28rem"
                    priority={gi === 0 && i === 0}
                    className="w-full"
                  />
                )}
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
