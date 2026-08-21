import type { Metadata } from "next";
import { INDEXABLE, formacion, site } from "@/data/site";
import type { Proyecto } from "@/data/work";

/**
 * Una sola fuente de verdad para la metadata de cada página. Evita que cada
 * `page.tsx` arme la suya y se olvide el canonical o el OG.
 */
export function meta({
  title,
  description = site.descripcion,
  path = "/",
  image,
}: {
  /** Sin el nombre: lo agrega el template del layout. */
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const titulo = title
    ? `${title} — ${site.nombre}`
    : `${site.nombre} — ${site.rol}`;

  return {
    ...(title ? { title } : {}),
    description,
    // El canonical evita que la misma página se cuente dos veces si alguna vez
    // llega con parámetros de campaña colgados.
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url,
      siteName: site.nombre,
      title: titulo,
      description,
      ...(image ? { images: [{ url: image, width: 1600, height: 1067 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Persona + sitio. Va una sola vez, en el layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#persona`,
        name: site.nombre,
        jobTitle: site.ocupacion,
        description: site.descripcion,
        email: `mailto:${site.email}`,
        telephone: site.telefono,
        url: site.url,
        sameAs: [site.linkedin],
        knowsAbout: [...site.sabeSobre],
        address: {
          "@type": "PostalAddress",
          addressCountry: "AR",
        },
        alumniOf: site.alumnoDe.map((name) => ({
          "@type": "EducationalOrganization",
          name,
        })),
        hasCredential: formacion
          .filter((f) => f.titulo !== "Idiomas")
          .map((f) => ({
            "@type": "EducationalOccupationalCredential",
            name: f.titulo,
            recognizedBy: { "@type": "Organization", name: f.lugar },
          })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#sitio`,
        url: site.url,
        name: site.nombre,
        description: site.descripcion,
        inLanguage: "es-AR",
        author: { "@id": `${site.url}/#persona` },
      },
    ],
  };
}

/** Caso de proyecto. Se emite en cada /works/[slug]. */
export function proyectoJsonLd(p: Proyecto) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/works/${p.slug}`,
    name: p.nombre,
    headline: p.resumen,
    description: p.texto.join(" "),
    dateCreated: p.anio,
    inLanguage: "es-AR",
    // ⚠️ Mientras sean proyectos de prueba, `creator` sería una afirmación
    // falsa sobre trabajo real. Se completa al poner los proyectos verdaderos.
    ...(p.demo ? {} : { creator: { "@id": `${site.url}/#persona` } }),
    about: p.rubro,
    keywords: p.servicios.join(", "),
    image: p.fotos.map((f) => `${site.url}${f.src}`),
  };
}

/** Migas para que el buscador entienda la jerarquía del caso. */
export function breadcrumbJsonLd(p: Proyecto) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Works",
        item: `${site.url}/works`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.nombre,
        item: `${site.url}/works/${p.slug}`,
      },
    ],
  };
}

/** Bloque <script type="application/ld+json">. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El JSON se serializa acá, no lo arma React: es dato, no markup.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** El meta robots de todas las páginas sale de un solo lugar. */
export const robotsMeta = INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false };
