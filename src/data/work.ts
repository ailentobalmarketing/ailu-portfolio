/**
 * Los proyectos reales de Ailu. Texto suyo (agosto 2026), acomodado al modelo
 * sin reescribirle la voz.
 *
 * El modelo es a propósito CHICO: nombre, rubro, qué hizo y piezas. Sin año (no
 * aporta a este trabajo y envejece el portfolio solo) y sin
 * métricas: los números inventados eran lo más riesgoso de la versión anterior,
 * y si aparece uno real va adentro del texto, no en un campo aparte.
 *
 * Las piezas salen del Drive «PORTFOLIO 2026», una carpeta por proyecto. Las
 * fotos van en WebP y los videos en H.264 a 720px de ancho, sin audio y con un
 * poster: los originales pesaban 136 MB entre los cuatro.
 *
 * Los logos de los clientes NO se usan como piezas: son marcas de ellos, no
 * diseño de Ailu, y en su tira de trabajos sugerirían autoría.
 *
 * `demo` quedó en el tipo aunque hoy no lo use nadie: es el interruptor que
 * omite `creator` del JSON-LD, para no firmar como propio un trabajo que no lo
 * es. Si algún día vuelve a entrar material de relleno, se marca con esto.
 */

export type Pieza = {
  src: string;
  w: number;
  h: number;
  alt?: string;
  /** Sólo en video: el primer cuadro, para que no quede un hueco al cargar. */
  poster?: string;
  /** Sólo en video: muestra el botón para activar el audio. Para los videos
      donde la voz importa (UGC, alguien hablando a cámara). El mp4 tiene que
      tener audio: el estándar general es sin audio. */
  sonido?: boolean;
  /** Colección a la que pertenece («Primavera-verano», «Cápsulas»…). Las
      piezas seguidas con el mismo grupo se muestran juntas y con su título en
      el detalle. Sin grupo, el mosaico va de corrido como siempre. */
  grupo?: string;
};

/** La extensión ES el tipo: no hace falta un campo aparte que se desincronice. */
export const esVideo = (p: Pieza) => p.src.endsWith(".mp4");

export type Proyecto = {
  slug: string;
  nombre: string;
  rubro: string;
  /** Una línea. Es lo primero que se lee en el detalle y va a la meta description. */
  resumen: string;
  /** Uno o dos párrafos, no más. */
  texto: string[];
  servicios: string[];
  /** Fotos y videos mezclados, en el orden en que se muestran. La portada de
      la grilla es la primera que NO sea video. */
  piezas: Pieza[];
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
      "Marca argentina de calzado de cuero con más de 80 años de trayectoria. Llevo el contenido orgánico, las creatividades para pauta y las campañas de cada temporada, pensadas en fases y con un objetivo claro en cada una.",
    ],
    servicios: [
      "Contenido orgánico",
      "Creatividades para pauta",
      "Campañas por temporada",
      "Piezas para punto de venta",
    ],
    // Tres colecciones de tres piezas, de la más nueva a la más vieja:
    // primavera-verano, cápsulas y la liquidación de invierno. Ailu quiere sólo
    // lo más relevante (28/09/2026); el resto del material está en su compu.
    piezas: [
      {
        src: "/work/batistella-1.jpg",
        grupo: "Primavera-verano",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: una modelo con cartera y camisa celeste, y los adjetivos «Elegante, práctica, moderna»",
      },
      {
        src: "/work/batistella-v3.mp4",
        grupo: "Primavera-verano",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v3-poster.jpg",
        sonido: true,
        alt: "Video de Ailén hablando a cámara sobre las sandalias de taco, en el local",
      },
      {
        src: "/work/batistella-2.jpg",
        grupo: "Primavera-verano",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: unos zuecos de cuero sobre una reposera a rayas amarillas",
      },
      {
        src: "/work/batistella-5.jpg",
        grupo: "Cápsulas",
        w: 1080,
        h: 1350,
        alt: "Lanzamiento de la cápsula Texanas: una bota con flecos sobre tierra colorada",
      },
      {
        src: "/work/batistella-6.jpg",
        grupo: "Cápsulas",
        w: 1080,
        h: 1350,
        alt: "Cápsula Texanas: botas negras con tachas y el texto «Más carácter»",
      },
      {
        src: "/work/batistella-9.jpg",
        grupo: "Cápsulas",
        w: 1080,
        h: 1350,
        alt: "Cápsula Texanas: botas altas de gamuza marrón con hebillas y el texto «Más actitud»",
      },
      {
        src: "/work/batistella-7.jpg",
        grupo: "Liquidación de invierno",
        w: 1080,
        h: 1350,
        alt: "Placa de la liquidación de temporada: botas de gamuza marrón",
      },
      {
        src: "/work/batistella-v5.mp4",
        grupo: "Liquidación de invierno",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v5-poster.jpg",
        sonido: true,
        alt: "Video de Ailén mostrando una bota croco en la liquidación",
      },
      {
        src: "/work/batistella-8.jpg",
        grupo: "Liquidación de invierno",
        w: 1080,
        h: 1350,
        alt: "Placa de la liquidación: hasta 50% off y 6 cuotas sin interés, sobre fondo negro",
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
      "Marca brasilera de calzado de trekking. Hice creatividades para pauta y contenido para la web, buscando el equilibrio entre lo técnico del producto y la experiencia de salir a la montaña.",
    ],
    servicios: [
      "Creatividades para pauta",
      "Contenido para web",
      "Testeo de mensajes",
    ],
    piezas: [
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
        src: "/work/macboot-v1.mp4",
        w: 720,
        h: 1280,
        poster: "/work/macboot-v1-poster.webp",
        alt: "Video de campaña de Macboot",
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
      {
        src: "/work/macboot-v2.mp4",
        w: 720,
        h: 1280,
        poster: "/work/macboot-v2-poster.jpg",
        alt: "Video de campaña de Macboot: la zapatilla de trekking en la montaña, con doble absorción de impacto",
      },
    ],
  },
  {
    slug: "sommy",
    nombre: "Sommy",
    rubro: "Colchones y sommiers, UGC",
    resumen:
      "Videos UGC cortos para mostrar los productos como los mostraría alguien de confianza.",
    texto: [
      "Marca de colchones, almohadas y sommiers. Hice una serie de videos UGC: frente a cámara, muestro los productos y cuento lo que los hace distintos, en un formato corto y natural pensado para pauta.",
    ],
    servicios: ["Contenido UGC", "Guion", "Grabación y edición"],
    piezas: [
      {
        src: "/work/sommy-1.jpg",
        w: 1080,
        h: 1920,
        alt: "Ailén de pie frente a los colchones de Sommy, con el cartel de la marca atrás",
      },
      {
        src: "/work/sommy-v1.mp4",
        w: 720,
        h: 1280,
        poster: "/work/sommy-v1-poster.jpg",
        sonido: true,
        alt: "Video UGC de Sommy: Ailén presenta los colchones de la marca",
      },
      {
        src: "/work/sommy-v2.mp4",
        w: 720,
        h: 1280,
        poster: "/work/sommy-v2-poster.jpg",
        sonido: true,
        alt: "Video UGC de Sommy: Ailén muestra de cerca la tela y la base de un sommier",
      },
      {
        src: "/work/sommy-v3.mp4",
        w: 720,
        h: 1280,
        poster: "/work/sommy-v3-poster.jpg",
        sonido: true,
        alt: "Video UGC de Sommy: Ailén explica las capas de un colchón",
      },
      {
        src: "/work/sommy-v4.mp4",
        w: 720,
        h: 1280,
        poster: "/work/sommy-v4-poster.jpg",
        sonido: true,
        alt: "Video UGC de Sommy: Ailén sentada en un colchón habla de la venta a mayoristas",
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
      "Espacio de terapias holísticas en Bariloche. Armé la identidad, el manual de marca y la estrategia de contenido, con un objetivo claro: construir comunidad más que vender sesiones.",
    ],
    servicios: ["Identidad de marca", "Manual de uso", "Contenido orgánico"],
    piezas: [
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
    ],
  },
  {
    slug: "zuco-pure",
    nombre: "Zuco Pure",
    rubro: "Jugos naturales",
    resumen:
      "Un sistema de marca simple y replicable, para no depender de un diseño nuevo cada vez.",
    texto: [
      "Marca de jugos naturales. Desarrollé la identidad, el manual de marca y, a partir de ahí, las piezas para redes.",
    ],
    servicios: [
      "Identidad de marca",
      "Manual de marca",
      "Piezas gráficas",
    ],
    piezas: [
      {
        src: "/work/zuco-pure-1.webp",
        w: 2000,
        h: 2500,
        alt: "Flyer de nuevos sabores: tres botellas de jugo sobre bandas de color, con el nombre de cada shot",
      },
      {
        src: "/work/zuco-pure-5.jpg",
        w: 1080,
        h: 1350,
        alt: "Pieza «Dosis de energía & detox»: dos manos con botellas de jugo",
      },
      {
        src: "/work/zuco-pure-2.webp",
        w: 1080,
        h: 1350,
        alt: "La línea completa de jugos sobre fondo blanco, con dos vasos servidos",
      },
      {
        src: "/work/zuco-pure-6.jpg",
        w: 1080,
        h: 1350,
        alt: "Pieza de lanzamiento «Algo nuevo está llegando», con frutas y la lista del mix de vitalidad",
      },
      {
        src: "/work/zuco-pure-10.jpg",
        w: 1080,
        h: 1350,
        alt: "El logo de Zuco Pure en blanco sobre verde lima",
      },
      {
        src: "/work/zuco-pure-3.webp",
        w: 1080,
        h: 1350,
        alt: "La tarjeta personal de Zuco Pure sobre un fondo amarillo y naranja",
      },
    ],
  },
  {
    slug: "pinta-facil",
    nombre: "Pinta Fácil",
    rubro: "Pintura y pisos, Córdoba",
    // ⚠️ TEXTO PROVISORIO. Ailu no mandó el texto de esta marca: lo de abajo
    // describe SÓLO lo que se ve en las piezas —el rubro, la ciudad, los tipos
    // de contenido— y no afirma nada sobre estrategia ni resultados. Reemplazar
    // en cuanto llegue el suyo.
    resumen:
      "Contenido para un servicio local: las piezas de marca, las comerciales y las que enseñan algo.",
    texto: [
      "Servicio de pintura y pisos vinílicos en Córdoba. Contenido para redes que alterna piezas de marca, promos de temporada y tips útiles.",
    ],
    servicios: [
      "Contenido orgánico",
      "Piezas promocionales",
      "Contenido educativo",
    ],
    piezas: [
      {
        src: "/work/pinta-facil-1.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza de marca: un dormitorio de paredes oscuras y el titular «Transformamos tu espacio»",
      },
      {
        src: "/work/pinta-facil-2.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza promocional: un pintor con rodillo y la promo de diciembre con 30% de descuento",
      },
      {
        src: "/work/pinta-facil-3.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza de servicio: un living con piso vinílico y el titular «Renová tus espacios con pisos vinílicos»",
      },
      {
        src: "/work/pinta-facil-4.webp",
        w: 1080,
        h: 1350,
        alt: "Apertura de carrusel: un living amplio y la pregunta «¿Cómo cuidar tus pisos PVC?»",
      },
      {
        src: "/work/pinta-facil-5.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza de contenido: un dormitorio azul con el título «3 colores en tendencia»",
      },
      {
        src: "/work/pinta-facil-6.webp",
        w: 1080,
        h: 1350,
        alt: "Pieza de sorteo: latas y pinceles con el título «Sorteo, ganate un servicio de pintura»",
      },
    ],
  },
];

export const hayDemo = proyectos.some((p) => p.demo);

/** Mientras falten las fotos del Drive, la grilla y la cinta lo tienen en cuenta. */
export const hayFotos = proyectos.some((p) => p.piezas.length > 0);

export const getProyecto = (slug: string) =>
  proyectos.find((p) => p.slug === slug);
