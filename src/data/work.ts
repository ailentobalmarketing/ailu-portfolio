/**
 * Los proyectos reales de Ailu. Texto suyo (agosto 2026), acomodado al modelo
 * sin reescribirle la voz.
 *
 * El modelo es a propósito CHICO: nombre, rubro, qué hizo y fotos. Sin año (no
 * aporta a este trabajo y envejece el portfolio solo) y sin
 * métricas: los números inventados eran lo más riesgoso de la versión anterior,
 * y si aparece uno real va adentro del texto, no en un campo aparte.
 *
 * ⚠️ FALTAN LAS FOTOS. Están en el Drive «PORTFOLIO 2026», una carpeta por
 * proyecto. Hasta que entren, `fotos` queda vacío: la grilla muestra un cartel
 * en lugar de la portada y la cinta de la home no se renderiza. El sitio sigue
 * con `noindex` (INDEXABLE en src/data/site.ts) — no tocarlo hasta que estén.
 *
 * `demo` quedó en el tipo aunque hoy no lo use nadie: es el interruptor que
 * omite `creator` del JSON-LD, para no firmar como propio un trabajo que no lo
 * es. Si algún día vuelve a entrar material de relleno, se marca con esto.
 */

export type Foto = { src: string; w: number; h: number; alt?: string };

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  /** Una línea. Es lo primero que se lee en el detalle y va a la meta description. */
  resumen: string;
  /** Uno o dos párrafos, no más. */
  texto: string[];
  servicios: string[];
  /** La primera es la portada de la grilla y la imagen que sale al compartir. */
  fotos: Foto[];
  demo?: boolean;
};

export const proyectos: Proyecto[] = [
  {
    slug: "batistella",
    nombre: "Batistella",
    rubro: "Retail de calzado",
    resumen:
      "Un ecosistema de contenido completo y campañas de temporada en fases, con un objetivo por etapa.",
    texto: [
      "Marca argentina de calzado de cuero con más de 80 años de trayectoria y presencia federal a través de sus sucursales. Trabajo el ecosistema de contenido completo: orgánico en Instagram, Facebook y TikTok, creatividades para pauta y piezas para punto de venta.",
      "El foco está en las campañas comerciales: cada temporada se estructura en fases —adelanto, preventa, lanzamiento— con un objetivo comercial claro en cada una. La lógica es separar la emoción de la promoción: el contenido emocional engancha, la pieza comercial cierra. Y sostener formatos interactivos que conviertan audiencia en tráfico real, tanto al e-commerce como a las sucursales.",
    ],
    servicios: [
      "Contenido orgánico",
      "Creatividades para pauta",
      "Campañas por temporada",
      "Piezas para punto de venta",
    ],
    fotos: [
      {
        src: "/work/batistella-1.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza de la campaña de liquidación: un zapato de cuero marrón en la mano, con el 50% off",
      },
      {
        src: "/work/batistella-2.webp",
        w: 1080,
        h: 1350,
        alt: "Botas negras de cuero con el precio anterior tachado y el nuevo al lado",
      },
      {
        src: "/work/batistella-3.webp",
        w: 1080,
        h: 1350,
        alt: "Bota negra de cuero sostenida en la mano, con el título de la liquidación",
      },
      {
        src: "/work/batistella-4.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza tipográfica de la campaña: 50% off y seis cuotas sin interés sobre fondo negro",
      },
      {
        src: "/work/batistella-5.webp",
        w: 1080,
        h: 1920,
        alt: "Historia de apertura de la campaña: buscá tu talle en liquidación",
      },
      {
        src: "/work/batistella-6.webp",
        w: 1080,
        h: 1920,
        alt: "Historia de búsqueda por talle: botas suela para los talles 35 y 36",
      },
      {
        src: "/work/batistella-7.webp",
        w: 1080,
        h: 1920,
        alt: "Historia de búsqueda por talle: bota negra de plataforma para los talles 37 y 38",
      },
      {
        src: "/work/batistella-8.webp",
        w: 1080,
        h: 1920,
        alt: "Historia de búsqueda por talle: bota negra con hebillas y cadena para los talles 39 a 41",
      },
    ],
  },
  {
    slug: "macboot",
    nombre: "Macboot",
    rubro: "Calzado outdoor",
    resumen:
      "Traducir un producto técnico a un lenguaje visual que rinda en pauta sin perder el ADN de la marca.",
    texto: [
      "Marca brasilera de calzado de trekking. El desafío era llevar un producto técnico a piezas que funcionen en performance sin que la marca se desdibuje en el camino.",
      "Desarrollé creatividades para campañas de pauta y contenido para el sitio, trabajando el equilibrio entre el argumento funcional —durabilidad, agarre, terreno— y el aspiracional: la experiencia de salir a la montaña. Cada pieza pensada para un formato y un objetivo específico, con variantes para testear ángulos de mensaje.",
    ],
    servicios: [
      "Creatividades para pauta",
      "Contenido para web",
      "Testeo de mensajes",
    ],
    fotos: [
      {
        src: "/work/macboot-1.webp",
        w: 960,
        h: 1200,
        alt: "Collage urbano de la campaña: la zapatilla en detalle, la suela y una persona sentada en unas escaleras",
      },
      {
        src: "/work/macboot-2.webp",
        w: 1200,
        h: 1200,
        alt: "Pieza de la tecnología Flutua+: una mujer entre rocas y el detalle de la zapatilla de trekking",
      },
      {
        src: "/work/macboot-3.webp",
        w: 1200,
        h: 1200,
        alt: "Pieza técnica: un hombre saltando entre rocas, con las características de la zapatilla señaladas",
      },
      {
        src: "/work/macboot-4.webp",
        w: 1080,
        h: 1080,
        alt: "Pieza de la tecnología Amphibious: la zapatilla impermeable en el agua y el barro",
      },
    ],
  },
  {
    slug: "havaianas",
    nombre: "Havaianas",
    rubro: "Calzado, campaña de Mundial",
    resumen:
      "Comunicar un producto 100% mundialista sin poder nombrar el Mundial.",
    texto: [
      "Producción de contenido para la campaña de Mundial de las ojotas de Argentina. El desafío fue el más interesante del proyecto: el producto era íntegramente mundialista, pero por restricciones de derechos no se podía nombrar el Mundial ni usar simbología oficial del fútbol.",
      "La solución fue correr el eje del fútbol a la argentinidad: celeste y blanco, el ritual del verano compartido, la previa, el aguante. Construir la asociación desde los códigos culturales que rodean al evento en vez de desde el evento en sí. El producto se lee, la marca no se expone.",
    ],
    servicios: ["Concepto de campaña", "Producción de contenido"],
    fotos: [
      {
        src: "/work/havaianas-1.webp",
        w: 1620,
        h: 2025,
        alt: "Pieza de campaña sobre fondo celeste: una ojota y el titular «Hay colores que se sienten»",
      },
      {
        src: "/work/havaianas-2.webp",
        w: 1620,
        h: 2025,
        alt: "Foto de campaña: una ojota celeste y blanca asomando del bolsillo de un pantalón",
      },
      {
        src: "/work/havaianas-3.webp",
        w: 2000,
        h: 3556,
        alt: "Collage con las ojotas de la bandera argentina y el hashtag «La pasión siempre le gana al frío»",
      },
      {
        src: "/work/havaianas-4.webp",
        w: 2000,
        h: 3556,
        alt: "Collage de historia con fotos de la campaña y las etiquetas «el ícono de siempre» y «mood liviano»",
      },
    ],
  },
  {
    slug: "hum",
    nombre: "Hüm",
    rubro: "Terapias holísticas, Bariloche",
    resumen:
      "Identidad, manual de marca y contenido con un objetivo que no era vender sesiones: construir comunidad.",
    texto: [
      "Espacio de terapias holísticas en Bariloche. Trabajé la identidad completa: desarrollo de marca y manual de uso, más la estrategia de contenido orgánico.",
      "El objetivo no era vender sesiones sino construir comunidad. El contenido acompaña la trayectoria del espacio y sostiene un vínculo real con la audiencia: mostrar el lugar, las prácticas y las personas detrás, con una identidad visual coherente que le da unidad a todo lo que la marca publica.",
    ],
    servicios: ["Identidad de marca", "Manual de uso", "Contenido orgánico"],
    fotos: [
      {
        src: "/work/hum-1.webp",
        w: 1755,
        h: 2194,
        alt: "Pieza sobre un fondo verde de bosque y agua: «Date el respiro que necesitas», con las terapias y la agenda abierta",
      },
      {
        src: "/work/hum-2.webp",
        w: 1755,
        h: 2194,
        alt: "Pieza en blanco y negro: una espalda con las manos cruzadas y el titular «Tu cuerpo también habla»",
      },
      {
        src: "/work/hum-3.webp",
        w: 1755,
        h: 2194,
        alt: "Pieza de contenido: cinco tips de feng shui para el hogar, sobre una pila de piedras en equilibrio",
      },
      {
        src: "/work/hum-4.webp",
        w: 2000,
        h: 1334,
        alt: "La tarjeta personal de Hüm, verde y con el isotipo, apoyada sobre piedras blancas",
      },
      {
        src: "/work/hum-5.webp",
        w: 1080,
        h: 1350,
        alt: "El logo de Hüm: un círculo pincelado en verde con una gota, y el nombre debajo",
      },
    ],
  },
  {
    slug: "zuco-pure",
    nombre: "Zuco Pure",
    rubro: "Jugos naturales",
    resumen:
      "Un sistema de marca simple y replicable, para no depender de un diseño nuevo cada vez.",
    texto: [
      "Marca de jugos naturales. Desarrollo de identidad visual y manual de marca, con foco en un sistema simple y replicable: paleta, tipografías, uso de logo y criterios de aplicación.",
      "A partir de ese sistema produje las placas y piezas gráficas para redes, pensadas para que la marca pueda sostener una comunicación consistente en el tiempo sin depender de un diseño nuevo cada vez.",
    ],
    servicios: ["Identidad de marca", "Manual de marca", "Piezas gráficas"],
    fotos: [
      {
        src: "/work/zuco-pure-1.webp",
        w: 2000,
        h: 2500,
        alt: "Flyer de nuevos sabores: tres botellas de jugo sobre bandas de color, con el nombre de cada shot",
      },
      {
        src: "/work/zuco-pure-2.webp",
        w: 1080,
        h: 1350,
        alt: "La línea completa de jugos sobre fondo blanco, con dos vasos servidos",
      },
      {
        src: "/work/zuco-pure-3.webp",
        w: 1080,
        h: 1350,
        alt: "El logo de Zuco Pure: una rodaja de cítrico sobre el nombre, con la bajada 100% natural",
      },
    ],
  },
];

export const hayDemo = proyectos.some((p) => p.demo);

/** Mientras falten las fotos del Drive, la grilla y la cinta lo tienen en cuenta. */
export const hayFotos = proyectos.some((p) => p.fotos.length > 0);

export const getProyecto = (slug: string) =>
  proyectos.find((p) => p.slug === slug);
