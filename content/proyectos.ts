/**
 * ⚠️ CONTENIDO DE PRUEBA — NINGUNA DE ESTAS MARCAS ES REAL.
 *
 * Son 6 proyectos inventados para poder maquetar y mostrar la sección de
 * Trabajos antes de que Ailu mande su material. Los números también son
 * inventados. Cada uno lleva `demo: true` justamente para que no se pueda
 * publicar por accidente: la home muestra un aviso mientras quede alguno.
 *
 * Al reemplazarlos: sacar `demo`, poner las imágenes reales en /public/trabajos
 * y confirmar con ella qué métricas de Batistella puede publicar.
 */

export type Proyecto = {
  slug: string;
  nombre: string;
  /** Rubro del cliente. Va en la meta del caso. */
  rubro: string;
  ubicacion: string;
  anio: string;
  /** Pinta el fondo de la página en el carrusel de /trabajos. */
  accentColor: string;
  /** Borde de la miniatura activa. Tiene que contrastar con accentColor. */
  ringColor: string;
  imagen: string;
  /** Una línea, la que acompaña al título en el listado. */
  resumen: string;
  /** El párrafo grande del caso. */
  descripcion: string;
  servicios: string[];
  resultados: { valor: string; etiqueta: string }[];
  imagenesCaso: string[];
  demo?: boolean;
};

const TINTA = "#1A1714";
const HUESO = "#F3F0EA";

export const proyectos: Proyecto[] = [
  {
    slug: "casa-bruma",
    nombre: "Casa Bruma",
    rubro: "Cafetería de especialidad",
    ubicacion: "Córdoba, Argentina",
    anio: "2026",
    accentColor: "#8C4A3F",
    ringColor: HUESO,
    imagen: "/trabajos/p1.jpg",
    resumen: "De cafetería de barrio a lugar al que la gente viaja.",
    descripcion:
      "Casa Bruma hacía muy buen café y no lo contaba. Armamos pilares de contenido alrededor del origen del grano y de la gente que atiende, pasamos el feed a una rutina sostenible de tres publicaciones semanales, y usamos pauta de alcance local para llegar a la gente que ya estaba a diez cuadras y no sabía que existían.",
    servicios: [
      "Estrategia de contenido",
      "Producción audiovisual",
      "Meta Ads",
      "Google Business Profile",
    ],
    resultados: [
      { valor: "+184%", etiqueta: "Alcance no seguidores" },
      { valor: "3.2x", etiqueta: "Consultas por mensajería" },
      { valor: "$41", etiqueta: "Costo por resultado" },
    ],
    imagenesCaso: ["/trabajos/caso-1.jpg", "/trabajos/caso-2.jpg"],
    demo: true,
  },
  {
    slug: "nube-nueve",
    nombre: "Nube Nueve",
    rubro: "Indumentaria",
    ubicacion: "Rosario, Argentina",
    anio: "2026",
    accentColor: TINTA,
    ringColor: "#C9A227",
    imagen: "/trabajos/p2.jpg",
    resumen: "Una temporada entera planificada antes de la primera foto.",
    descripcion:
      "El problema no era vender, era que cada lanzamiento arrancaba de cero. Definimos el calendario de la temporada completa, un sistema de creatividades que se repite con variaciones, y una estructura de campaña con públicos similares sobre quienes ya habían comprado. La producción dejó de ser una urgencia mensual.",
    servicios: [
      "Dirección de arte",
      "Calendario editorial",
      "Meta Ads",
      "Remarketing",
    ],
    resultados: [
      { valor: "-38%", etiqueta: "Costo por compra" },
      { valor: "+96%", etiqueta: "Retorno de la pauta" },
      { valor: "12", etiqueta: "Creatividades por ciclo" },
    ],
    imagenesCaso: ["/trabajos/caso-2.jpg", "/trabajos/caso-1.jpg"],
    demo: true,
  },
  {
    slug: "sereno-club",
    nombre: "Sereno Club",
    rubro: "Gimnasio y bienestar",
    ubicacion: "Córdoba, Argentina",
    anio: "2025",
    accentColor: "#4A5D4E",
    ringColor: HUESO,
    imagen: "/trabajos/p3.jpg",
    resumen: "Campañas de mensajes con guión de respuesta, no solo formulario.",
    descripcion:
      "Traían muchos leads y cerraban pocos. El cuello no estaba en la pauta sino en lo que pasaba después del clic: pasamos a campañas de mensajes, escribimos los guiones de respuesta y los criterios de derivación, y recién ahí subimos presupuesto. El costo por lead subió y el costo por socio bajó.",
    servicios: [
      "Campañas de mensajes",
      "Guiones de atención",
      "Contenido de comunidad",
      "Medición",
    ],
    resultados: [
      { valor: "2.7x", etiqueta: "Leads que cierran" },
      { valor: "-29%", etiqueta: "Costo por socio nuevo" },
      { valor: "< 5 min", etiqueta: "Tiempo de respuesta" },
    ],
    imagenesCaso: ["/trabajos/caso-1.jpg", "/trabajos/caso-2.jpg"],
    demo: true,
  },
  {
    slug: "verde-nogal",
    nombre: "Verde Nogal",
    rubro: "Vivero y deco",
    ubicacion: "Alta Gracia, Argentina",
    anio: "2025",
    accentColor: "#6E675E",
    ringColor: HUESO,
    imagen: "/trabajos/p4.jpg",
    resumen: "Todo el crecimiento vino de búsquedas locales, no del feed.",
    descripcion:
      "Acá el trabajo grande fue el que no se ve: ordenar la ficha de Google, cargar productos, responder reseñas y sostener publicaciones semanales de presencia local. El Instagram acompañó, pero la mayoría de la gente que entró al local venía de buscar «vivero cerca».",
    servicios: [
      "Google Business Profile",
      "Contenido local",
      "Reputación online",
      "Reportes",
    ],
    resultados: [
      { valor: "+310%", etiqueta: "Vistas del perfil de Google" },
      { valor: "+147", etiqueta: "Reseñas nuevas" },
      { valor: "4.8", etiqueta: "Puntaje promedio" },
    ],
    imagenesCaso: ["/trabajos/caso-2.jpg", "/trabajos/caso-hero.jpg"],
    demo: true,
  },
  {
    slug: "origen-panaderia",
    nombre: "Origen",
    rubro: "Panadería, 6 locales",
    ubicacion: "Córdoba, Argentina",
    anio: "2025",
    accentColor: "#8C4A3F",
    ringColor: TINTA,
    imagen: "/trabajos/p5.jpg",
    resumen: "Seis locales hablando con una sola voz.",
    descripcion:
      "Cada local publicaba por su cuenta y la marca se veía distinta en cada barrio. Unificamos criterio visual y calendario, dejamos margen para lo propio de cada sucursal, y montamos las fichas de Google de los seis con horarios y fotos al día. Una marca, seis puertas.",
    servicios: [
      "Coherencia visual",
      "Calendario multi-local",
      "Google Business Profile",
      "Producción",
    ],
    resultados: [
      { valor: "6", etiqueta: "Fichas unificadas" },
      { valor: "+72%", etiqueta: "Interacción del feed" },
      { valor: "1", etiqueta: "Voz de marca" },
    ],
    imagenesCaso: ["/trabajos/caso-hero.jpg", "/trabajos/caso-1.jpg"],
    demo: true,
  },
  {
    slug: "lumen-estudio",
    nombre: "Lumen",
    rubro: "Estudio de fotografía",
    ubicacion: "Córdoba, Argentina",
    anio: "2024",
    accentColor: TINTA,
    ringColor: HUESO,
    imagen: "/trabajos/p6.jpg",
    resumen: "Mostrar el proceso vendió más que mostrar el resultado.",
    descripcion:
      "Un estudio de fotografía publicando fotos terminadas compite con todos los estudios de fotografía. Movimos el eje al detrás de escena: cómo se arma una luz, por qué se elige un encuadre, qué se descarta. El contenido dejó de ser catálogo y pasó a ser criterio.",
    servicios: [
      "Línea narrativa",
      "Producción audiovisual",
      "Comunidad",
      "Meta Ads",
    ],
    resultados: [
      { valor: "+218%", etiqueta: "Retención en reels" },
      { valor: "+1.9k", etiqueta: "Seguidores en 4 meses" },
      { valor: "8/10", etiqueta: "Consultas mencionan un reel" },
    ],
    imagenesCaso: ["/trabajos/caso-1.jpg", "/trabajos/caso-hero.jpg"],
    demo: true,
  },
];

export const hayProyectosDemo = proyectos.some((p) => p.demo);
