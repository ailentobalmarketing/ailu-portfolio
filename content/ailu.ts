/**
 * Contenido del portfolio. Todo el texto del sitio vive acá — las secciones
 * sólo lo renderizan. Para cambiar algo, se toca este archivo y nada más.
 *
 * Fuente: Portfolio_Ailen_Tobal.pdf (agosto 2026).
 */

export const perfil = {
  nombre: "Ailén Tobal",
  rol: "Marketing digital y gestión de redes",
  ubicacion: "Córdoba, Argentina",
  disponibilidad: "Disponible para proyectos",
  email: "ailentobal.marketing@gmail.com",
  telefono: "+54 2944 393813",
  whatsapp: "https://wa.me/5492944393813",
  linkedin: "https://www.linkedin.com/in/ailén-tobal",
  descripcion:
    "Estrategia, contenido y campañas de Meta Ads que se miden y se optimizan.",
} as const;

/** Las tres frases del preloader. */
export const tags = ["Estrategia", "Contenido", "Pauta"] as const;

export type BloqueSobreMi = { titular: string; texto: string };

export const sobreMi: BloqueSobreMi[] = [
  {
    titular: "Hola, soy Ailén",
    texto:
      "Soy Técnica Superior en Comercialización y me dedico al marketing digital y la gestión de redes.",
  },
  {
    titular: "Me divierte lo que hago",
    texto:
      "Disfruto la parte creativa y armar estrategias y contenido que de verdad funcionen.",
  },
  {
    titular: "El proceso completo",
    texto:
      "Pienso la estrategia, produzco el contenido, llevo las campañas de Meta Ads y después miro los números para entender qué funcionó y ajustar lo que sigue.",
  },
];

export type Paso = { titulo: string; items: string[] };

/**
 * Los 5 bloques de "Conocimientos" del PDF, reordenados como proceso en vez de
 * como lista de CV: es el mismo contenido pero se lee como una forma de trabajar.
 */
export const pasos: Paso[] = [
  {
    titulo: "Estrategia",
    items: [
      "Definición de objetivos y traducción a acciones de comunicación",
      "Diseño de embudo de conversión y recorrido de compra",
      "Definición de público objetivo y perfiles de cliente",
      "Pilares de contenido y planificación editorial",
      "Análisis de competencia y detección de oportunidades",
    ],
  },
  {
    titulo: "Contenido",
    items: [
      "Desarrollo de conceptos y líneas narrativas de campaña",
      "Dirección de arte y coherencia visual de marca",
      "Producción audiovisual: idea, filmación y edición",
      "Diseño de piezas para redes y publicidad",
      "Redacción publicitaria orientada a conversión",
    ],
  },
  {
    titulo: "Pauta",
    items: [
      "Campañas de tráfico, alcance, interacción y mensajes",
      "Estructura de campaña, conjuntos de anuncios y presupuestos",
      "Segmentación por intereses, comportamiento y datos demográficos",
      "Públicos personalizados y públicos similares",
      "Remarketing sobre audiencias que ya interactuaron",
      "Planificación de pauta y distribución de medios",
    ],
  },
  {
    titulo: "Comunidad",
    items: [
      "Gestión de Instagram, Facebook y TikTok",
      "Atención de consultas en mensajería y comentarios",
      "Criterios y guiones de respuesta para atención en redes",
      "Derivación de consultas hacia canales de venta",
      "Comunidad, fidelización y reputación online",
      "Google Business Profile y presencia local",
    ],
  },
  {
    titulo: "Medición",
    items: [
      "Definición de indicadores según el objetivo de cada campaña",
      "Métricas de contenido: alcance, interacción, retención y guardados",
      "Métricas de pauta: costo por resultado, clics, impresiones y frecuencia",
      "Pruebas A/B de creatividades, públicos y mensajes",
      "Ajuste de campañas en curso según rendimiento",
      "Reportes de resultados y conclusiones accionables",
    ],
  },
];

export type GrupoHerramientas = { grupo: string; items: string };

export const herramientas: GrupoHerramientas[] = [
  { grupo: "Diseño", items: "Photoshop · Illustrator · Canva" },
  { grupo: "Video", items: "CapCut (nivel avanzado)" },
  {
    grupo: "Publicidad y redes",
    items: "Meta Ads Manager · Meta Business Suite · Instagram Insights",
  },
  { grupo: "Gestión", items: "Google Business Profile · Google Workspace" },
];

export type Entrada = {
  titulo: string;
  meta?: string;
  texto?: string;
  items?: string[];
};

export const experiencia: Entrada[] = [
  {
    titulo: "Batistella — Diseñadora de contenido",
    meta: "Calzado de cuero · 80 años · 31 sucursales · +341.000 seguidores",
    items: [
      "Estrategia y gestión de contenido en Instagram y Facebook",
      "Producción audiovisual completa: planificación, filmación y edición",
      "Creatividades y gestión de campañas de pauta digital",
      "Gestión de Google Business Profile de toda la red de locales",
      "Medición de resultados y optimización de la estrategia",
    ],
  },
  {
    titulo: "Marketing y diseño — Proyectos independientes",
    items: [
      "Estrategia de contenido y gestión de redes para marcas y emprendimientos",
      "Identidad visual, branding y piezas gráficas",
      "Gestión de cuentas y comunicación con clientes",
    ],
  },
  {
    titulo: "Experiencia comercial y atención al cliente",
    texto:
      "Trayectoria previa en ventas y atención presencial, con foco en asesoramiento personalizado y cumplimiento de objetivos comerciales.",
  },
];

export const formacion: Entrada[] = [
  {
    titulo: "Técnica Superior en Marketing y Ventas",
    meta: "Escuela de Comercio Manuel Belgrano — UNC",
  },
  { titulo: "Comercio Internacional", meta: "Universidad Blas Pascal — en curso" },
  { titulo: "Community Manager", meta: "Coderhouse" },
  { titulo: "Meta Ads", meta: "Coderhouse" },
  { titulo: "Idiomas", texto: "Inglés intermedio · Portugués intermedio" },
];

export const contacto = {
  eyebrow: "Hablemos",
  titular: "Contame qué necesita tu marca",
} as const;

export const menuLinks = [
  { label: "Inicio", route: "/" },
  { label: "Trabajos", route: "/trabajos" },
  { label: "Contacto", route: "#contacto" },
] as const;
