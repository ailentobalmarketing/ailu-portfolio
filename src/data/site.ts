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
  url: "https://ailu.rstudios.ar",
} as const;

export const nav = [
  { href: "/", label: "Bio" },
  { href: "/works", label: "Works" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Los párrafos de la bio, en su voz. Recorrido, no lista de tareas. */
export const bio = {
  titular: "Hola, soy Ailén.",
  parrafos: [
    "Soy Técnica Superior en Comercialización y me dedico al marketing digital y la gestión de redes. Empecé en ventas y atención al público, que es donde aprendí lo que ningún curso te enseña: cómo pregunta la gente, qué la frena y qué la decide.",
    "De ahí pasé al otro lado del mostrador. Hoy trabajo el proceso completo: pienso la estrategia, produzco el contenido —lo filmo y lo edito yo—, llevo las campañas de Meta Ads y después miro los números para entender qué funcionó y ajustar lo que sigue.",
    "Mi trabajo más largo fue en Batistella, una marca de calzado de cuero con 80 años y 31 sucursales. Ahí llevé el contenido de Instagram y Facebook, la producción audiovisual, las campañas de pauta y las fichas de Google de toda la red de locales.",
    "Me divierte lo que hago. Disfruto la parte creativa y armar estrategias y contenido que de verdad funcionen, no que sólo se vean bien.",
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

export type Formacion = { titulo: string; lugar: string };

export const formacion: Formacion[] = [
  {
    titulo: "Técnica Superior en Marketing y Ventas",
    lugar: "Escuela de Comercio Manuel Belgrano — UNC",
  },
  {
    titulo: "Comercio Internacional",
    lugar: "Universidad Blas Pascal — en curso",
  },
  { titulo: "Community Manager", lugar: "Coderhouse" },
  { titulo: "Meta Ads", lugar: "Coderhouse" },
  { titulo: "Idiomas", lugar: "Inglés y portugués intermedio" },
];
