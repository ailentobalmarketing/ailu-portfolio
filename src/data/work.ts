/**
 * ⚠️ CONTENIDO DE PRUEBA — NINGUNA DE ESTAS MARCAS ES REAL.
 *
 * Sirven para maquetar la grilla y el detalle hasta que Ailu mande su material.
 * Cada una lleva `demo: true`; mientras quede alguna, el sitio va con `noindex`
 * (ver src/app/robots.ts).
 *
 * El modelo es a propósito CHICO: nombre, rubro, año, qué hizo y fotos. Nada de
 * métricas — ella no tiene mucha info por proyecto y los números inventados eran
 * lo más riesgoso de la versión anterior.
 *
 * Al reemplazar: sacar `demo`, poner las fotos reales en /public/work y ajustar
 * `w`/`h` de cada una (los usa next/image para reservar el espacio).
 */

export type Foto = { src: string; w: number; h: number; alt?: string };

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  anio: string;
  /** Una línea. Va debajo del nombre en la grilla y en el detalle. */
  resumen: string;
  /** Uno o dos párrafos, no más. */
  texto: string[];
  servicios: string[];
  /** La primera es la portada de la grilla. */
  fotos: Foto[];
  demo?: boolean;
};

export const proyectos: Proyecto[] = [
  {
    slug: "casa-bruma",
    nombre: "Casa Bruma",
    rubro: "Cafetería de especialidad",
    anio: "2026",
    resumen: "Contenido y pauta local para una cafetería de barrio.",
    texto: [
      "Casa Bruma hacía muy buen café y no lo contaba. Armamos los pilares de contenido alrededor del origen del grano y de la gente que atiende, y pasamos el feed a una rutina sostenible de tres publicaciones por semana.",
      "La pauta fue de alcance local: llegar a la gente que ya estaba a diez cuadras y no sabía que existían.",
    ],
    servicios: [
      "Estrategia",
      "Contenido",
      "Meta Ads",
      "Google Business Profile",
    ],
    fotos: [
      { src: "/work/casa-bruma-1.jpg", w: 1600, h: 1067 },
      { src: "/work/casa-bruma-2.jpg", w: 1600, h: 1067 },
      { src: "/work/casa-bruma-3.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
  {
    slug: "nube-nueve",
    nombre: "Nube Nueve",
    rubro: "Indumentaria",
    anio: "2026",
    resumen: "Una temporada entera planificada antes de la primera foto.",
    texto: [
      "El problema no era vender: era que cada lanzamiento arrancaba de cero. Definimos el calendario de la temporada completa y un sistema de creatividades que se repite con variaciones.",
      "La producción dejó de ser una urgencia mensual.",
    ],
    servicios: ["Dirección de arte", "Calendario editorial", "Meta Ads"],
    fotos: [
      { src: "/work/nube-nueve-1.jpg", w: 1600, h: 1067 },
      { src: "/work/nube-nueve-2.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
  {
    slug: "sereno-club",
    nombre: "Sereno Club",
    rubro: "Gimnasio y bienestar",
    anio: "2025",
    resumen: "Campañas de mensajes con guión de respuesta, no sólo formulario.",
    texto: [
      "Traían muchos leads y cerraban pocos. El cuello no estaba en la pauta sino en lo que pasaba después del clic.",
      "Pasamos a campañas de mensajes, escribimos los guiones de respuesta y los criterios de derivación, y recién ahí subimos el presupuesto.",
    ],
    servicios: ["Campañas de mensajes", "Guiones de atención", "Comunidad"],
    fotos: [
      { src: "/work/sereno-club-1.jpg", w: 1600, h: 1067 },
      { src: "/work/sereno-club-2.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
  {
    slug: "verde-nogal",
    nombre: "Verde Nogal",
    rubro: "Vivero y deco",
    anio: "2025",
    resumen: "El crecimiento vino de las búsquedas locales, no del feed.",
    texto: [
      "Acá el trabajo grande fue el que no se ve: ordenar la ficha de Google, cargar productos, responder reseñas y sostener publicaciones semanales de presencia local.",
      "El Instagram acompañó, pero la mayoría de la gente que entró al local venía de buscar «vivero cerca».",
    ],
    servicios: [
      "Google Business Profile",
      "Contenido local",
      "Reputación online",
    ],
    fotos: [
      { src: "/work/verde-nogal-1.jpg", w: 1600, h: 1067 },
      { src: "/work/verde-nogal-2.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
  {
    slug: "origen",
    nombre: "Origen",
    rubro: "Panadería, 6 locales",
    anio: "2025",
    resumen: "Seis locales hablando con una sola voz.",
    texto: [
      "Cada local publicaba por su cuenta y la marca se veía distinta en cada barrio. Unificamos criterio visual y calendario, dejando margen para lo propio de cada sucursal.",
      "Y montamos las fichas de Google de los seis, con horarios y fotos al día.",
    ],
    servicios: ["Coherencia visual", "Calendario multi-local", "Producción"],
    fotos: [
      { src: "/work/origen-1.jpg", w: 1600, h: 1067 },
      { src: "/work/origen-2.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
  {
    slug: "lumen",
    nombre: "Lumen",
    rubro: "Estudio de fotografía",
    anio: "2024",
    resumen: "Mostrar el proceso funcionó mejor que mostrar el resultado.",
    texto: [
      "Un estudio de fotografía publicando fotos terminadas compite con todos los estudios de fotografía. Movimos el eje al detrás de escena: cómo se arma una luz, por qué se elige un encuadre, qué se descarta.",
      "El contenido dejó de ser catálogo y pasó a ser criterio.",
    ],
    servicios: ["Línea narrativa", "Producción audiovisual", "Comunidad"],
    fotos: [
      { src: "/work/lumen-1.jpg", w: 1600, h: 1067 },
      { src: "/work/lumen-2.jpg", w: 1600, h: 1067 },
    ],
    demo: true,
  },
];

export const hayDemo = proyectos.some((p) => p.demo);

export const getProyecto = (slug: string) =>
  proyectos.find((p) => p.slug === slug);
