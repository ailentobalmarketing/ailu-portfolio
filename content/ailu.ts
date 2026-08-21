/**
 * Contenido del portfolio. Todo el texto del sitio vive acá — las secciones
 * sólo lo renderizan. Para cambiar algo, se toca este archivo y nada más.
 *
 * Fuente: Portfolio_Ailen_Tobal.pdf (agosto 2026).
 */

export const perfil = {
  nombre: "Ailén Tobal",
  rol: "Marketing digital y gestión de redes",
  ubicacion: "Argentina",
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
    titular: "De idea a número",
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

export type PasoCard = {
  id: string;
  num: string;
  name: string;
  description: string;
  items: string[];
};

/**
 * Los mismos 5 pasos, en formato tarjeta para la sección pinneada.
 * `items` va recortado a propósito: la tarjeta no da para la lista completa
 * del PDF. La completa vive arriba, en `pasos`.
 */
export const pasosCards: PasoCard[] = [
  {
    id: "card-1",
    num: "01",
    name: "Estrategia",
    description:
      "Antes de publicar nada: a quién le hablamos, para qué, y cómo se ve el camino desde que te descubren hasta que te compran.",
    items: [
      "Objetivos y acciones de comunicación",
      "Embudo y recorrido de compra",
      "Público objetivo y perfiles",
      "Pilares de contenido",
      "Análisis de competencia",
    ],
  },
  {
    id: "card-2",
    num: "02",
    name: "Contenido",
    description:
      "El concepto, la dirección de arte y la producción. Filmo, edito y escribo: no hace falta un equipo aparte.",
    items: [
      "Conceptos y línea narrativa",
      "Dirección de arte",
      "Filmación y edición",
      "Piezas para redes y pauta",
      "Redacción para conversión",
    ],
  },
  {
    id: "card-3",
    num: "03",
    name: "Pauta",
    description:
      "Meta Ads con estructura: campañas separadas por objetivo, públicos que tienen sentido y presupuesto donde rinde.",
    items: [
      "Tráfico, alcance, interacción y mensajes",
      "Estructura de campaña y presupuestos",
      "Segmentación y públicos similares",
      "Remarketing",
      "Distribución de medios",
    ],
  },
  {
    id: "card-4",
    num: "04",
    name: "Comunidad",
    description:
      "Lo que pasa después del clic. Responder rápido, con criterio, y llevar la consulta hasta donde se cierra la venta.",
    items: [
      "Instagram, Facebook y TikTok",
      "Mensajería y comentarios",
      "Guiones de respuesta",
      "Derivación a canales de venta",
      "Google Business Profile",
    ],
  },
  {
    id: "card-5",
    num: "05",
    name: "Medición",
    description:
      "Mirar los números para saber qué funcionó, no para llenar un reporte. Y ajustar lo que sigue con eso.",
    items: [
      "Indicadores por objetivo",
      "Alcance, interacción, retención",
      "Costo por resultado y frecuencia",
      "Pruebas A/B",
      "Reportes accionables",
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
  {
    titulo: "Comercio Internacional",
    meta: "Universidad Blas Pascal — en curso",
  },
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
  { label: "Perfil", route: "/perfil" },
  { label: "Trabajos", route: "/trabajos" },
  { label: "Contacto", route: "/contacto" },
];

/** Las dos columnas de texto del menú full-screen. */
export const menuCopy = {
  col1: [
    [
      { text: "Ailén Tobal" },
      { text: "Marketing digital" },
      { text: perfil.ubicacion },
    ],
    [
      { text: "Escribime" },
      { text: perfil.email, href: `mailto:${perfil.email}` },
    ],
    [
      { text: "WhatsApp" },
      { text: perfil.telefono, href: perfil.whatsapp, blank: true },
    ],
  ],
  col2: [
    [
      { text: "Redes" },
      { text: "LinkedIn", href: perfil.linkedin, blank: true },
    ],
    [{ text: "Disponibilidad" }, { text: "Abierta a proyectos" }],
    [{ text: "Edición" }, { text: "2026" }],
  ],
};

/** Titulares grandes de cada página. Van en Humane a 40-50vw. */
export const titulares = {
  homeHero: "Ailén Tobal",
  homeFooterIzq: ["Marketing digital", "Argentina"],
  homeFooterDer: "Disponible para proyectos",
  // Dos palabras cortas y del mismo largo: se equilibran en cualquier pantalla
  // y juntas se leen "MENOS · imagen · RUIDO".
  perfilHero: ["Menos", "Ruido"],
  perfilFooterIzq: [],
  perfilFooterDer: "Perfil 2026",
  particula: "Contenido que rinde",
  pasosDesktop: "Cómo trabajo",
  pasosMobile: "Cómo trabajo",
  marcasTitulo: "Marcas con las que trabajé",
  marcasCopy:
    "Cada una llegó con un problema distinto: una vendía bien y no lo contaba, otra traía leads que no cerraban, otra tenía seis locales hablando cada uno por su cuenta. El trabajo siempre arranca en entender cuál es el cuello real.",
  trabajosMeta: "Trabajos",
  contactoEyebrow: "Hablemos",
  contactoTitular: "Contame qué necesita tu marca",
} as const;
