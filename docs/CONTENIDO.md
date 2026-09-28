# Guía de contenido

Cómo cambiar textos, sumar o sacar proyectos y preparar fotos y videos.
Casi todo el contenido del sitio vive en **dos archivos**:

- `src/data/site.ts`: quién es Ailu, la bio, qué hace, herramientas y contacto.
- `src/data/work.ts`: los proyectos y sus piezas.

Las páginas no tienen texto propio (salvo unos pocos titulares, ver abajo):
sólo leen estos archivos. Si querés cambiar algo, casi seguro es acá.

> Con Claude Code no hace falta abrir nada: pedile el cambio en castellano
> («cambiá mi teléfono», «sumá este proyecto») y él sabe dónde va cada cosa.
> Esta guía es para entender qué pasa por detrás.

---

## 1. Textos generales — `src/data/site.ts`

### `site`: datos de contacto e identidad

| Campo | Dónde se ve |
| --- | --- |
| `nombre` | Nav, footer, título de la pestaña, JSON-LD |
| `rol` | Debajo del nombre en la nav y en el título de la home |
| `descripcion` | Meta description de la home: es lo que aparece en Google y al compartir el link |
| `ubicacion` | Fila «Base» en Contacto |
| `email` | Contacto, footer y menú mobile |
| `telefono` | Cómo se **muestra** el número (Contacto, footer, menú) |
| `whatsapp` | El **link** del número. Formato `https://wa.me/549` + característica sin 0 + número sin 15 |
| `linkedin` | Link a LinkedIn (Contacto y footer) |
| `url` | **Dominio del sitio.** De acá salen canonicals, sitemap, robots y JSON-LD |
| `ocupacion`, `sabeSobre` | Datos para Google (JSON-LD y keywords); no se ven en pantalla |

> Si cambia el teléfono, hay que cambiar **`telefono` y `whatsapp`**: uno es el
> texto que se ve y el otro el link.

### `bio`: la portada

- `titular`: el «Hola, soy Ailén.»
- `parrafos`: uno por párrafo, en su voz y en primera persona. Pueden ser más o menos de cuatro.

### `queHago` y `herramientas`

Bloques con `titulo` e `items`. `queHago` se muestra en 4 columnas en desktop
(2 en tablet, 1 en celular); con 4 bloques queda parejo. `herramientas` es
una lista de filas `Título ······ ítem · ítem · ítem`.

### `nav`

Los tres links del menú. Si se agrega una página, se suma acá.

### `INDEXABLE`

`true` = Google puede indexar el sitio. `false` = el sitio se saca del índice:
`robots.txt` bloquea todo y todas las páginas llevan `noindex`. Es el único
interruptor. Sólo se apaga si vuelve a haber contenido de relleno o si Ailu
quiere esconder el sitio.

### Textos que están en la página misma

Son pocos y cortos: los titulares de `/trabajos` («Últimos trabajos») y de
`/contacto` («Contame qué necesita tu marca.»), el párrafo de `/contacto`, las
meta descriptions de esas dos páginas (en `metadata = meta({...})`, arriba de
cada `page.tsx`), el 404 (`src/app/not-found.tsx`) y los rótulos del footer
(`src/components/layout/Footer.tsx`).

---

## 2. Proyectos — `src/data/work.ts`

Cada proyecto es un objeto dentro de `proyectos`. **El orden del array es el
orden de la grilla** en `/trabajos`.

```ts
{
  slug: "nombre-de-la-marca",      // la URL: /trabajos/nombre-de-la-marca
  nombre: "Nombre de la Marca",    // como se escribe la marca, con tildes
  rubro: "Rubro, ciudad",          // una línea corta: va en la grilla y en la ficha
  resumen: "Una línea que cuente el desafío o el enfoque.",
  texto: [
    "Primer párrafo: qué es la marca y qué hice.",
    "Segundo párrafo: cómo lo encaré. Uno o dos párrafos, no más.",
  ],
  servicios: ["Contenido orgánico", "Creatividades para pauta"],  // «Qué hice»
  piezas: [
    { src: "/work/nombre-de-la-marca-1.webp", w: 1080, h: 1350, alt: "Qué se ve y de qué campaña" },
    { src: "/work/nombre-de-la-marca-v1.mp4", w: 720, h: 1280,
      poster: "/work/nombre-de-la-marca-v1-poster.webp", alt: "Video de …" },
  ],
},
```

### Reglas

- **`slug`**: minúsculas, sin tildes ni eñes, con guiones (`zuco-pure`,
  `pinta-facil`). Es la URL: si se cambia después, el link viejo deja de
  andar (y Google lo tenía guardado).
- **`resumen`**: una sola línea. Es lo primero que se lee en el caso y va a
  la meta description del proyecto.
- **`texto`**: uno o dos párrafos. El detalle es corto a propósito.
- **Nada de métricas inventadas, años ni clientes que no son.** Si hay un
  número real (con permiso del cliente), va dentro del texto.
- **La voz es la de Ailu.** Si ella manda el texto, se acomoda al modelo sin
  reescribirlo.
- Si un texto es provisorio, se marca con un comentario `// ⚠️ TEXTO PROVISORIO`
  arriba, como el de Pinta Fácil hoy.
- `demo: true` sólo para material de relleno (hoy no hay): muestra un aviso en
  `/trabajos` y no firma el trabajo como propio ante Google.

### Qué se genera solo

Al sumar un proyecto a `proyectos`, ya queda en la grilla, en la cinta de la
home, en el sitemap y con su página `/trabajos/<slug>` con SEO y JSON-LD. No
hay que tocar ningún otro archivo.

### Sacar un proyecto

Borrar su objeto de `proyectos` y sus archivos de `public/work/`.

---

## 3. Piezas: fotos y videos

### Dónde y cómo se llaman

```
public/work/<slug>-1.webp
public/work/<slug>-2.webp
public/work/<slug>-v1.mp4
public/work/<slug>-v1-poster.webp   ← primer cuadro del video
```

### Cómo se muestran

- **Portada en la grilla**: la **primera pieza que no es video**, recortada a
  4:5 (vertical). Conviene que sea una pieza que aguante ese recorte.
- **Detalle del caso**: mosaico de 2 columnas en celular y 3 en compu, en el
  orden del array, cada pieza con su proporción real.
- **Cinta de la home**: todas las fotos de todos los proyectos, intercaladas.
  Los videos no entran.
- **Imagen al compartir el caso** (WhatsApp, LinkedIn): la primera foto del proyecto.

### Estándar de archivos

| | Fotos | Videos |
| --- | --- | --- |
| Formato | **WebP** | **MP4 (H.264)**, sin audio |
| Tamaño | 1080–2000 px de ancho | **720 px** de ancho |
| Peso | en lo posible < 500 KB | ~2–3 MB (hasta 30 s) |
| Extra | — | poster WebP del primer cuadro, mismas medidas |

Como referencia: los originales del Drive pesaban 99 MB en fotos y 136 MB en
videos, y convertidos quedaron en 4 MB y 12 MB. **Los originales no se suben
al repo**: se quedan en el Drive «PORTFOLIO 2026».

### `w`, `h` y `alt`

- **`w` y `h` son el ancho y el alto REALES del archivo en píxeles.** No es la
  proporción ni un tamaño aproximado. Si están mal, la página «salta» mientras
  carga.
- **`alt`** describe qué se ve y de qué campaña es, como si se lo contaras a
  alguien que no puede ver la imagen. Ejemplo: *«Pieza de la campaña de
  liquidación: un zapato de cuero marrón en la mano, con el 50% off»*. Sirve
  para accesibilidad y para Google Imágenes.

### Qué NO subir

- **Logos de clientes sueltos** (Batistella, Macboot, Havaianas…): son marcas
  de ellos y en tu portfolio parecería que los diseñaste vos. Sí entran piezas
  de identidad que hiciste vos (como las de Hüm y Zuco Pure).
- Trabajos que no son tuyos, o de relleno, sin marcar `demo: true`.

### Cómo convertir

**Opción 1 — Pedírselo a Claude.** Subí los originales a una rama desde
GitHub (**Add file → Upload files**, hasta 25 MB por archivo), en una carpeta
temporal como `originales/`, y pedile: *«Convertí lo que está en `originales/`
al estándar del sitio, sumalo al proyecto X con sus alt y borrá los
originales»*. Para fotos puede usar `sharp`, que ya viene instalado con Next.
Para video necesita `ffmpeg`, que el entorno en la web no trae de fábrica: lo
puede instalar (por ejemplo, con el paquete de npm `ffmpeg-static`) o podés
convertir los videos con la opción 2. Al mergear ese PR elegí **Squash and
merge**: así los originales pesados no quedan guardados en el historial de `main`.

**Opción 2 — Sin terminal, a mano.**

- Fotos: [squoosh.app](https://squoosh.app) → formato **WebP**, calidad ~80 y
  **Resize** a 1080 px de ancho (o hasta 2000 si tiene texto chico).
- Videos: [HandBrake](https://handbrake.fr) → preset *Fast 720p30*, en
  **Audio** borrar la pista, tildar **Web Optimized** y guardar como `.mp4`.
- Poster: una captura del primer cuadro, pasada a WebP con Squoosh.

**Opción 3 — Terminal** (con `cwebp` y `ffmpeg` instalados):

```bash
# Foto → WebP de 1080 px de ancho
cwebp -q 80 -resize 1080 0 original.jpg -o public/work/<slug>-1.webp

# Video → MP4 H.264 de 720 px, sin audio, listo para web
ffmpeg -i original.mov -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an public/work/<slug>-v1.mp4

# Poster = primer cuadro del video
ffmpeg -i public/work/<slug>-v1.mp4 -frames:v 1 -c:v libwebp -quality 80 \
  public/work/<slug>-v1-poster.webp

# Medidas reales (para w y h)
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 <archivo>
```

---

## 4. El retrato de la bio

- Archivo: `public/bio/retrato.webp` (hoy es de 1400 × 2490).
- Se muestra en **9:16** (vertical), recortado por CSS y **en blanco y negro**
  (clase `grayscale` en `src/app/page.tsx`).
- Si se cambia por otra foto, hay que actualizar `width` y `height` en
  `src/app/page.tsx` con las medidas reales del archivo nuevo.

## 5. Íconos e imagen para compartir

| Archivo | Qué es | Medida |
| --- | --- | --- |
| `src/app/icon.png` | Ícono de la pestaña y de la app | 512 × 512 |
| `src/app/apple-icon.png` | Ícono al guardar en el inicio del iPhone | 180 × 180 |
| `src/app/opengraph-image.jpg` | Tarjeta al compartir la home o cualquier página sin foto propia | 1200 × 630 |

Se reemplazan con un archivo del mismo nombre y medida.

## 6. Colores, tipografía y espaciado

Todo sale de las variables de `:root` en `src/app/globals.css`: `--ink`
(negro), `--paper` (blanco), `--muted` (gris del texto secundario), `--line`
(líneas), la escala `--step-*` y los espacios `--gutter` y `--section-y`. Si se
cambia una variable, cambia en todo el sitio.

El fondo líquido usa su propio color, `COLORS` en
`src/components/fx/SiteBackdrop.tsx` (hoy es un gris `#404040`).

> Ojo con la nav: usa un modo de mezcla que **invierte** colores, así que en el
> código su texto es blanco aunque se vea negro. Ver `docs/DECISIONES.md`.

---

## Antes de publicar

- [ ] `npm run build` pasa.
- [ ] Miraste la preview de Vercel en compu **y en celular**.
- [ ] Las fotos nuevas cargan sin «saltos» (si saltan, `w`/`h` están mal).
- [ ] Cada pieza nueva tiene su `alt`.
- [ ] No hay métricas, logos de clientes ni textos que Ailu no aprobó.
