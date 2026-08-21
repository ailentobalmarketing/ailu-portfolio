import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/layout/Reveal";
import TransitionLink from "@/components/layout/TransitionLink";
import { getProyecto, proyectos } from "@/data/work";
import { JsonLd, breadcrumbJsonLd, meta, proyectoJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) return {};

  return meta({
    title: p.nombre,
    description: `${p.resumen} ${p.rubro}, ${p.anio}.`,
    path: `/works/${p.slug}`,
    image: p.fotos[0]?.src,
  });
}

/**
 * Detalle de proyecto. Deliberadamente corto: encabezado, un par de párrafos,
 * la ficha al costado y las fotos apiladas a lo ancho de la medida. Ailu no
 * tiene mucha información por proyecto y forzar más secciones sólo agrega
 * relleno.
 */
export default async function Caso({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const p = getProyecto(slug);
  if (!p) notFound();

  return (
    <article className="u-shell pt-[clamp(3rem,2rem+6vw,7rem)]">
      <JsonLd data={proyectoJsonLd(p)} />
      <JsonLd data={breadcrumbJsonLd(p)} />
      <Reveal>
        <TransitionLink
          href="/works"
          className="u-eyebrow transition-opacity duration-500 ease-[var(--ease-soft)] hover:opacity-60"
        >
          ← Works
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
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="u-eyebrow">Año</dt>
              <dd className="text-[length:var(--step--1)]">{p.anio}</dd>
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

      <div className="mt-[var(--section-y)] flex flex-col gap-[clamp(1rem,0.5rem+2vw,2.5rem)]">
        {p.fotos.map((f, i) => (
          <Reveal key={f.src}>
            <Image
              src={f.src}
              alt={f.alt ?? `${p.nombre} — ${i + 1}`}
              width={f.w}
              height={f.h}
              sizes="(max-width: 767px) 100vw, 84rem"
              priority={i === 0}
              className="w-full"
            />
          </Reveal>
        ))}
      </div>
    </article>
  );
}
