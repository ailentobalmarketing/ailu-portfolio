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

/** Los párrafos de la bio, en su voz. Recorrido, no lista de tareas. */
export const bio = {
  titular: "Hola, soy Ailén.",
  parrafos: [
    "Soy Técnica Superior en Comercialización y me dedico al marketing digital y la gestión de redes. Empecé en ventas y atención al público, y de ahí pasé al otro lado del mostrador.",
    "Hoy trabajo el proceso completo: diseño la estrategia, produzco el contenido, manejo las campañas de Meta Ads y analizo las métricas para entender qué funcionó y ajustar lo que sigue.",
    "Mi experiencia más larga fue en Batistella, una marca de calzado de cuero con 80 años de trayectoria y 31 sucursales. Ahí me encargo del contenido para Instagram y Facebook, la producción audiovisual, las campañas de pauta y las fichas de Google de toda la red de locales.",
    "Disfruto mucho lo que hago. Me apasiona la parte creativa, armar estrategias y generar contenido que conecte.",
  ],
} as const;

export type Bloque = { titulo: string; items: string[] };

/** Lo que hace, en cuatro bloques. Reemplaza los 30 bullets del PDF. */
export const queHago: Bloque[] = [
  {
    titulo: "Estrategia",
    items: [
      "Objetivos y pilares de contenido",
      "Público objetivo y perfiles de cliente",
      "Embudo y recorrido de compra",
      "Análisis de competencia",
    ],
  },
  {
    titulo: "Contenido",
    items: [
      "Dirección de arte y coherencia visual",
      "Producción audiovisual: idea, filmación y edición",
      "Piezas para redes y publicidad",
      "Redacción orientada a conversión",
    ],
  },
  {
    titulo: "Pauta",
    items: [
      "Campañas de tráfico, alcance, interacción y mensajes",
      "Estructura de campaña y presupuestos",
      "Segmentación, públicos personalizados y similares",
      "Remarketing",
    ],
  },
  {
    titulo: "Gestión y medición",
    items: [
      "Instagram, Facebook y TikTok",
      "Mensajería, comentarios y comunidad",
      "Google Business Profile y presencia local",
      "Indicadores, pruebas A/B y reportes",
    ],
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
