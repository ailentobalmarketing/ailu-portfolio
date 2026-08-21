import type { MetadataRoute } from "next";

/**
 * ⚠️ TEMPORAL — mientras el sitio muestre los proyectos de prueba
 * (`src/data/work.ts`, todos con `demo: true`), no tiene que aparecer en
 * buscadores: son marcas inventadas y se leerían como trabajo real de Ailu.
 *
 * Al reemplazarlos por el material real: borrar este archivo y sacar el
 * `robots` de la metadata en src/app/layout.tsx.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
