import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { proyectos } from "@/data/work";

/**
 * Sitemap. Se genera aunque el sitio esté con noindex: no hace daño y evita
 * que quede olvidado el día que se abra la indexación.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    { url: site.url, priority: 1 },
    { url: `${site.url}/trabajos`, priority: 0.8 },
    { url: `${site.url}/contacto`, priority: 0.5 },
  ];

  const casos = proyectos.map((p) => ({
    url: `${site.url}/trabajos/${p.slug}`,
    priority: 0.6,
  }));

  return [...fijas, ...casos].map((e) => ({
    ...e,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));
}
