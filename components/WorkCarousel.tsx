"use client";

import { initWork } from "@/lib/lemon/work";
import { proyectos } from "@/content/proyectos";
import { titulares } from "@/content/ailu";
import { useLemonModule } from "./useLemonModule";

/**
 * El carrusel de /trabajos: rueda o touch cambia de proyecto, el fondo se pinta
 * con el color del proyecto entrante mediante un path SVG que se deforma, la
 * tarjeta entra desde abajo y el título cae palabra por palabra.
 */
export default function WorkCarousel() {
  useLemonModule(() =>
    initWork(
      proyectos.map((p) => ({
        name: p.nombre,
        image: p.imagen,
        accentColor: p.accentColor,
        ringColor: p.ringColor,
        url: `/trabajos/${p.slug}`,
      })),
      titulares.trabajosMeta,
    ),
  );

  return <div className="work-carousel" />;
}
