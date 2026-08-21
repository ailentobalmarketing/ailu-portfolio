import type { MetadataRoute } from "next";

/**
 * ⚠️ TEMPORAL — mientras el sitio muestre los 6 proyectos de prueba
 * (`content/proyectos.ts`, todos con `demo: true`), no tiene que aparecer en
 * buscadores: son marcas y métricas inventadas y se leerían como trabajo real
 * de Ailu.
 *
 * Al reemplazarlos por el material real: borrar este archivo y sacar el
 * `robots` de la metadata en app/layout.tsx.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
