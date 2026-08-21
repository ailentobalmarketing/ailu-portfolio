import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import type { Proyecto } from "@/data/work";

/** La grilla es 1 / 2 columnas (mobile / md). */
const SIZES = "(max-width: 767px) 100vw, 50vw";

/**
 * Tile de la grilla: portada 3:2 y debajo el nombre, el rubro y el año.
 * La foto entra en gris y toma color al pasar por encima — el único gesto de
 * color en todo el sitio.
 */
export default function WorkCard({
  proyecto,
  priority = false,
}: {
  proyecto: Proyecto;
  priority?: boolean;
}) {
  const portada = proyecto.fotos[0];

  return (
    <TransitionLink href={`/works/${proyecto.slug}`} className="group block">
      <figure className="relative aspect-[3/2] w-full overflow-hidden bg-paper-soft">
        <Image
          src={portada.src}
          alt={portada.alt ?? proyecto.nombre}
          fill
          sizes={SIZES}
          priority={priority}
          className="object-cover grayscale transition duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transform-none"
        />
      </figure>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-step-1 tracking-[-0.02em]">{proyecto.nombre}</h2>
        <span className="shrink-0 text-[length:var(--step--1)] text-muted">
          {proyecto.anio}
        </span>
      </div>
      <p className="mt-1 text-[length:var(--step--1)] text-muted">
        {proyecto.rubro}
      </p>
    </TransitionLink>
  );
}
