import Image from "next/image";
import TransitionLink from "@/components/layout/TransitionLink";
import { esVideo, type Proyecto } from "@/data/work";

/** La grilla es 1 / 2 columnas (mobile / md). */
const SIZES = "(max-width: 767px) 100vw, 50vw";

/** Tile de la grilla: portada 4:5 y debajo el nombre y el rubro. */
export default function WorkCard({
  proyecto,
  priority = false,
}: {
  proyecto: Proyecto;
  priority?: boolean;
}) {
  // La portada es la primera pieza. Si es un video se usa su poster: <Image>
  // no puede renderizar un mp4. Si un video no tiene poster, se cae a la
  // primera foto para que la grilla no quede vacía.
  const primera = proyecto.piezas[0];
  const portada =
    primera && esVideo(primera) && primera.poster
      ? { src: primera.poster, alt: primera.alt, encuadre: primera.encuadre }
      : proyecto.piezas.find((x) => !esVideo(x));

  return (
    <TransitionLink href={`/trabajos/${proyecto.slug}`} className="group block">
      <figure className="relative aspect-[4/5] w-full overflow-hidden bg-paper-soft">
        {portada ? (
          <Image
            src={portada.src}
            alt={portada.alt ?? proyecto.nombre}
            fill
            sizes={SIZES}
            priority={priority}
            style={
              portada.encuadre
                ? { objectPosition: portada.encuadre }
                : undefined
            }
            className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          // Provisorio: mientras no lleguen las fotos del Drive, el tile avisa
          // en vez de romper. `fotos[0]` sobre un array vacío es undefined.
          <span className="u-eyebrow absolute inset-0 flex items-center justify-center text-muted">
            Fotos en camino
          </span>
        )}
      </figure>

      <h2 className="mt-4 text-step-1 tracking-[-0.02em]">{proyecto.nombre}</h2>
      <p className="mt-1 text-[length:var(--step--1)] text-muted">
        {proyecto.rubro}
      </p>
    </TransitionLink>
  );
}
