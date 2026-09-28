/**
 * Todo el texto del sitio vive acá. Las páginas sólo lo renderizan: para
 * cambiar algo se toca este archivo y nada más.
 *
 * Fuente: Portfolio_Ailen_Tobal.pdf (agosto 2026).
 */

export const site = {
  nombre: "Ailén Tobal",
  rol: "Marketing digital y gestión de redes",
  descripcion:
    "Estrategia, contenido y campañas de Meta Ads que se miden y se optimizan.",
  ubicacion: "Argentina",
  email: "ailentobal.marketing@gmail.com",
  telefono: "+54 2944 393813",
  whatsapp: "https://wa.me/5492944393813",
  linkedin: "https://www.linkedin.com/in/ailén-tobal",
  url: "https://ailentobal.com.ar",
  /** Para el JSON-LD: a qué se dedica, en vocabulario de schema.org. */
  ocupacion: "Especialista en marketing digital y gestión de redes sociales",
  sabeSobre: [
    "Marketing digital",
    "Gestión de redes sociales",
    "Meta Ads",
    "Estrategia de contenido",
    "Producción audiovisual",
    "Google Business Profile",
  ],
} as const;

/**
 * INTERRUPTOR ÚNICO DE INDEXACIÓN.
 *
 * ✅ Abierto desde el 2026-08-21: entraron los cinco proyectos reales de Ailu y
 * el sitio salió a producción. Antes estuvo cerrado a propósito, mientras los
 * trabajos eran marcas inventadas que se habrían leído como propios.
 *
 * De esta constante salen el robots.txt, el sitemap y el meta robots de TODAS
 * las páginas: si alguna vez hay que sacar el sitio del índice, se toca acá y
 * nada más.
 */
export const INDEXABLE = true;

export const nav = [
  { href: "/", label: "Bio" },
  { href: "/trabajos", label: "Trabajos" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Los párrafos de la bio, en su voz. Corta a propósito: el detalle de cada
    trabajo vive en /trabajos. */
export const bio = {
  titular: "Hola, soy Ailén.",
  parrafos: [
    "Soy Técnica Superior en Comercialización y me dedico al marketing digital y a las redes sociales. Empecé en ventas y atención al público, y de a poco pasé al marketing.",
    "Hace varios años trabajo con marcas de distintos rubros, ayudándolas a encontrar su voz en redes y a conectar con su gente.",
    "Me divierte lo que hago. Disfruto mucho la parte creativa y ver cómo una idea se convierte en contenido.",
  ],
} as const;

export type Bloque = { titulo: string; items: string[] };

/** Lo que hace, en cuatro bloques de una línea cada uno. */
export const queHago: Bloque[] = [
  {
    titulo: "Estrategia",
    items: ["Objetivos, público y pilares de contenido"],
  },
  {
    titulo: "Contenido",
    items: ["Piezas y videos para redes, de la idea a la edición"],
  },
  {
    titulo: "Pauta",
    items: ["Campañas en Meta Ads que se miden y se ajustan"],
  },
  {
    titulo: "UGC",
    items: ["Videos con mi cara y mi voz para tu marca"],
  },
];

export const herramientas: Bloque[] = [
  { titulo: "Diseño", items: ["Photoshop", "Illustrator", "Canva"] },
  { titulo: "Video", items: ["CapCut"] },
  {
    titulo: "Publicidad y redes",
    items: ["Meta Ads Manager", "Meta Business Suite", "Instagram Insights"],
  },
  {
    titulo: "Gestión",
    items: ["Google Business Profile", "Google Workspace"],
  },
];
