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
      "Marca argentina de calzado de cuero con más de 80 años de trayectoria y presencia federal a través de sus sucursales. Trabajo el ecosistema de contenido completo: orgánico en Instagram, Facebook y TikTok, creatividades para pauta y piezas para punto de venta.",
      "El foco está en las campañas comerciales: cada temporada se estructura en fases —adelanto, preventa, lanzamiento— con un objetivo comercial claro en cada una. La lógica es separar la emoción de la promoción: el contenido emocional engancha, la pieza comercial cierra. Y sostener formatos interactivos que conviertan audiencia en tráfico real, tanto al e-commerce como a las sucursales.",
    ],
    servicios: [
      "Contenido orgánico",
      "Creatividades para pauta",
      "Campañas por temporada",
      "Piezas para punto de venta",
    ],
    // Primavera-verano primero (la temporada en curso) y después la
    // liquidación de otoño-invierno. Los videos van intercalados con las placas.
    piezas: [
      {
        src: "/work/batistella-1.jpg",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: una modelo con cartera y camisa celeste, y los adjetivos «Elegante, práctica, moderna»",
      },
      {
        src: "/work/batistella-v1.mp4",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v1-poster.jpg",
        sonido: true,
        alt: "Video del anuncio de la nueva temporada primavera-verano, en la puerta del local",
      },
      {
        src: "/work/batistella-2.jpg",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: unos zuecos de cuero sobre una reposera a rayas amarillas",
      },
      {
        src: "/work/batistella-3.jpg",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: sandalias con tachas y una cámara de fotos, con el título «Sandalias»",
      },
      {
        src: "/work/batistella-v2.mp4",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v2-poster.jpg",
        sonido: true,
        alt: "Video de detalle de unos zapatos de cuero",
      },
      {
        src: "/work/batistella-4.jpg",
        w: 1063,
        h: 1890,
        alt: "Primavera-verano: una mujer en una reposera junto a la pileta, con zuecos de cuero",
      },
      {
        src: "/work/batistella-v3.mp4",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v3-poster.jpg",
        sonido: true,
        alt: "Video de Ailén hablando a cámara sobre las sandalias de taco, en el local",
      },
      {
        src: "/work/batistella-5.jpg",
        w: 1080,
        h: 1350,
        alt: "Lanzamiento de la cápsula Texanas: una bota con flecos sobre tierra colorada",
      },
      {
        src: "/work/batistella-v4.mp4",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v4-poster.jpg",
        sonido: true,
        alt: "Video del anuncio de la liquidación de otoño-invierno, en el local",
      },
      {
        src: "/work/batistella-6.jpg",
        w: 1080,
        h: 1350,
        alt: "Cápsula Texanas: botas negras con tachas y el texto «Más carácter»",
      },
      {
        src: "/work/batistella-7.jpg",
        w: 1080,
        h: 1350,
        alt: "Placa de la liquidación de temporada: botas de gamuza marrón",
      },
      {
        src: "/work/batistella-v5.mp4",
        w: 720,
        h: 1280,
        poster: "/work/batistella-v5-poster.jpg",
        sonido: true,
        alt: "Video de Ailén mostrando una bota croco en la liquidación",
      },
      {
        src: "/work/batistella-8.jpg",
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
      "Marca brasilera de calzado de trekking. El desafío era llevar un producto técnico a piezas que funcionen en performance sin que la marca se desdibuje en el camino.",
      "Desarrollé creatividades para campañas de pauta y contenido para el sitio, trabajando el equilibrio entre el argumento funcional —durabilidad, agarre, terreno— y el aspiracional: la experiencia de salir a la montaña. Cada pieza pensada para un formato y un objetivo específico, con variantes para testear ángulos de mensaje.",
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
        src: "/work/macboot-5.webp",
        w: 934,
        h: 1126,
        alt: "Pieza sobre fondo verde: una bota negra de trekking con el título «Protección y resistencia»",
      },
      {
        src: "/work/macboot-v1.mp4",
        w: 720,
        h: 1280,
        poster: "/work/macboot-v1-poster.webp",
        alt: "Video de campaña de Macboot",
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
      "Espacio de terapias holísticas en Bariloche. Trabajé la identidad completa: desarrollo de marca y manual de uso, más la estrategia de contenido orgánico.",
      "El objetivo no era vender sesiones sino construir comunidad. El contenido acompaña la trayectoria del espacio y sostiene un vínculo real con la audiencia: mostrar el lugar, las prácticas y las personas detrás, con una identidad visual coherente que le da unidad a todo lo que la marca publica.",
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
      "Marca de jugos naturales. Desarrollo de identidad visual y manual de marca, con foco en un sistema simple y replicable: paleta, tipografías, uso de logo y criterios de aplicación.",
      "A partir de ese sistema produje las placas y piezas gráficas para redes, pensadas para que la marca pueda sostener una comunicación consistente en el tiempo sin depender de un diseño nuevo cada vez.",
    ],
    servicios: ["Identidad de marca", "Manual de marca", "Piezas gráficas"],
    piezas: [
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
        alt: "La tarjeta personal de Zuco Pure sobre un fondo amarillo y naranja",
      },
      {
        src: "/work/zuco-pure-4.webp",
        w: 1194,
        h: 1464,
        alt: "Pieza para mayoristas: media naranja a sangre y el titular «Contactanos y revendé calidad»",
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
      "Servicio de pintura y colocación de pisos vinílicos en Córdoba. El contenido alterna las piezas de marca con las comerciales y con material que enseña algo: cómo cuidar un piso de PVC, qué colores están en tendencia.",
      "Las promos van atadas a la temporada y con el contacto directo por WhatsApp en la pieza. Los formatos de participación, como el sorteo de un servicio de pintura, son los que mueven a la audiencia local.",
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
