import type { MetadataRoute } from "next";
import { INDEXABLE, site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Ver INDEXABLE en src/data/site.ts: mientras haya proyectos de prueba, cerrado.
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
