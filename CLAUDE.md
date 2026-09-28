# CLAUDE.md

Contexto del proyecto para Claude Code. Leelo entero antes de tocar algo: casi
todo lo raro que vas a ver en el código está así a propósito, y acá dice por qué.

## Qué es y quién lo usa

Portfolio personal de **Ailén Tobal (Ailu)**, especialista en marketing digital
y gestión de redes. Tres secciones:

| Ruta | Página | Qué tiene |
| --- | --- | --- |
| `/` | Bio | Su recorrido en primera persona, retrato, «Qué hago», la cinta de trabajos y «Herramientas» |
| `/trabajos` | Trabajos | Grilla de proyectos (2 columnas en desktop, 1 en mobile) |
| `/trabajos/[slug]` | Caso | Resumen, texto, ficha (rubro + qué hice) y mosaico de piezas |
| `/contacto` | Contacto | Titular, un párrafo y los canales |

- Dominio de producción: **https://ailentobal.com.ar** (sale de `site.url` en `src/data/site.ts`).
- Lo diseñó y programó **Ramiro Fazio Dattoli (R Studios, rstudios.ar)** en
  agosto de 2026. Después se le entregó a Ailu, que lo mantiene desde su GitHub
  y su Vercel, con Claude Code.
- **Quien te va a hablar casi siempre es Ailu, que no es desarrolladora.**
  Explicale los cambios en castellano llano y sin jerga, contale qué va a
  cambiar en pantalla antes de tocarlo y, cuando termines, qué tiene que mirar
  para comprobarlo. Si algo de lo que pide choca con una regla de este archivo,
  decíselo antes de hacerlo.

## Stack

- **Next.js 16.3** (App Router) + **React 19.2** + **TypeScript** en modo `strict`.
- **Tailwind CSS v4**: la configuración vive en CSS (`@theme inline` en
  `src/app/globals.css`). No hay `tailwind.config`.
- **Lenis** para el scroll suave, **three** sólo para el fondo líquido
  (`LiquidEther`), **clsx + tailwind-merge** en `cn()`.
- Tipografía: **DM Sans** por `next/font/google` (pesos 400 y 500).
- **Sin backend**: no hay API routes, base de datos ni variables de entorno.
  Las 17 rutas se prerenderizan como estáticas en el build.
- Deploy en **Vercel** con el preset de Next.js, sin configuración extra.

## Comandos

```bash
npm install          # dependencias (en la web lo hace solo el hook de SessionStart)
npm run dev          # http://localhost:3000
npm run build        # LA verificación: si esto pasa, Vercel también va a pasar
npx tsc --noEmit     # chequeo de tipos, más rápido que el build
```

- ⚠️ **`npm run lint` está roto.** Llama a `next lint`, que Next 16 eliminó: tira
  `Invalid project directory provided, no such directory: …/lint`. Tampoco hay
  ESLint instalado. No lo uses para verificar nada. Para arreglarlo habría que
  instalar `eslint` + `eslint-config-next` y cambiar el script a `eslint .`;
  sólo si alguien lo pide.
- No hay tests. Verificar = `npx tsc --noEmit` + `npm run build` + mirar el
  sitio (`npm run dev`), en desktop y en un viewport de celular.

## Mapa del repo

```
src/
  data/
    site.ts          ← TODO el texto del sitio + INDEXABLE + nav
    work.ts          ← los proyectos y sus piezas (fotos/videos)
  app/
    layout.tsx       ← fuente, metadata global, JSON-LD de persona, capas globales
    page.tsx         ← Bio (la home)
    trabajos/page.tsx, trabajos/[slug]/page.tsx
    contacto/page.tsx, not-found.tsx
    robots.ts, sitemap.ts, manifest.ts
    icon.png, apple-icon.png, opengraph-image.jpg   ← íconos y tarjeta OG (estáticos)
    globals.css      ← tokens de diseño + todo el CSS no-utilitario
  components/
    fx/        SiteBackdrop (monta LiquidEther), LiquidEther.jsx/.css, VideoPieza
    layout/    Footer, PageTransition, Reveal, SmoothScroll, TransitionLink
    nav/       Nav (banda sticky + menú mobile)
    work/      WorkCard (tile de la grilla), WorkMarquee (la cinta de la home)
  lib/
    seo.tsx    ← meta() por página, JSON-LD, robotsMeta
    cn.ts
public/
  bio/retrato.webp
  work/<slug>-N.webp, <slug>-vN.mp4, <slug>-vN-poster.webp
.claude/
  settings.json + hooks/session-start.sh   ← npm install al arrancar en la web
  launch.json                              ← config de preview (npm run dev)
docs/
  HANDOFF.md     ← pasos para GitHub, Vercel, dominio y Claude Code
  CONTENIDO.md   ← cómo cambiar textos, sumar proyectos y preparar fotos/videos
  DECISIONES.md  ← historia del proyecto y el porqué de cada decisión
```

Antes de cambiar contenido leé `docs/CONTENIDO.md`. Antes de tocar animaciones,
scroll, la nav, el fondo o cualquier cosa de mobile, leé `docs/DECISIONES.md`.

## Reglas de contenido (las más importantes)

1. **Los textos viven en `src/data/`, no en las páginas.** Todo el copy está en
   `site.ts` y los proyectos en `work.ts`; las páginas sólo renderizan.
   Cambiar un texto es tocar esos archivos y nada más. Las excepciones son unos
   pocos textos cortos escritos en la página misma: los titulares de `/trabajos`
   («Últimos trabajos») y de `/contacto`, el párrafo de `/contacto`, las meta
   descriptions de esas dos páginas, el 404 y los rótulos del footer.
2. **La voz es la de Ailu.** Primera persona, castellano rioplatense (vos,
   escribime, contame). Cuando manda un texto se acomoda al modelo **sin
   reescribirle la voz**.
3. **Nunca inventar métricas, resultados, clientes ni fechas.** Los números
   inventados eran lo más riesgoso de la primera versión. Si aparece un número
   real, va dentro del texto, no en un campo aparte.
4. **No hay año por proyecto**, a propósito: no aporta y envejece el portfolio solo.
5. **Los logos de los clientes no van como piezas** (Batistella, Macboot,
   Havaianas): son marcas de ellos, no diseño de Ailu, y en su portfolio
   sugerirían autoría. Sí entran los de Hüm y Zuco Pure, porque ahí la
   identidad la hizo ella.
6. **Pinta Fácil tiene texto PROVISORIO** (marcado con ⚠️ en `work.ts`): Ailu no
   lo mandó, así que describe sólo lo que se ve en las piezas. Reemplazarlo en
   cuanto llegue el suyo. Ya está indexado, por decisión de Ramiro.
7. **`demo: true`** en un proyecto marca material de relleno. Muestra un aviso
   en `/trabajos` y saca el `creator` del JSON-LD para no firmar como propio un
   trabajo que no lo es. Hoy no lo usa ningún proyecto. Si alguna vez vuelve a
   haber relleno, marcarlo y pensar en poner `INDEXABLE = false`.
8. **`INDEXABLE` en `src/data/site.ts` es el interruptor único de indexación.**
   De ahí salen el `robots.txt`, el sitemap y el meta robots de todas las
   páginas. Está en `true` desde el 2026-08-21.
9. **Todo en español**, rutas incluidas (`/trabajos`, `/contacto`).
10. Si cambia el dominio, se cambia `site.url` y nada más: de ahí salen los
    canonicals, el sitemap, el `robots.txt` y el JSON-LD.

## Piezas (fotos y videos)

- Van en `public/work/` con el slug del proyecto: `<slug>-1.webp`, `<slug>-2.webp`…
  y los videos `<slug>-v1.mp4` con su poster `<slug>-v1-poster.webp`.
- **`w` y `h` tienen que ser las medidas reales del archivo.** `next/image` las usa
  para reservar el lugar antes de cargar: si mienten, el contenido salta.
- El tipo sale de la extensión (`esVideo()` mira `.mp4`). No hay campo `tipo`.
- El orden del array es el orden del mosaico. La **portada** en la grilla es la
  primera pieza que **no** es video, recortada a 4:5.
- Cada pieza lleva un `alt` propio que describe qué se ve y de qué campaña es.
- Estándar de peso: fotos en **WebP**, hasta 2000 px de ancho y, en lo posible,
  menos de 500 KB. Videos en **MP4 H.264, 720 px de ancho, sin audio**, con un
  poster WebP del primer cuadro (quedan en 2–3 MB). Los originales **no** se
  suben al repo. Cómo convertir: `docs/CONTENIDO.md`.
- Los videos no entran en la cinta de la home, sólo en el detalle del caso.

## Sistema de diseño

- Blanco y negro puro. Los tokens están en `:root` de `globals.css` y se mapean
  a Tailwind con `@theme inline`: colores `ink`, `paper`, `paper-soft`, `muted` y
  `line`; escala fluida `text-step--1` a `text-step-3`; `--gutter`,
  `--section-y`, `--maxw` y `--measure`; easings `--ease` (seco) y
  `--ease-soft` (suave).
- Utilidades propias: `u-shell` (contenedor con margen), `u-measure` (ancho de
  lectura), `u-eyebrow` (rótulo en versalitas, el único texto en mayúsculas) y
  `u-link` (subrayado que crece).
- **No hardcodear colores ni tamaños**: usá los tokens. Para retocar el look, se
  cambian las variables de `:root`.
- El reset de elementos va en `@layer base`. Fuera de la capa les gana a las
  utilidades de Tailwind y rompe los `mt-*` sobre `<p>`/`<h*>`.

## Decisiones técnicas que NO hay que «arreglar»

Cada una salió de un bug real, casi todas en Safari de iPhone. El detalle está
en `docs/DECISIONES.md` y en los comentarios del código.

- **Nav en `mix-blend-mode: difference`, con los colores al revés en el código.**
  El texto de la nav es blanco (`text-paper`) y se ve negro sobre el papel. El
  gris de la página actual es `#757575`, que invertido da el `#8a8a8a` del
  sistema. Si lo «corregís» a negro, desaparece.
- **El texto de `main` va en `multiply`** para leerse sobre el fondo líquido.
  Las imágenes quedan afuera (son el trabajo, no se tiñen) y el rótulo de la
  cinta también.
- **Links internos con `TransitionLink`**, no con `next/link` directo. Si no,
  no hay transición de página.
- **Nunca bloquear el scroll con `overflow` del body**: se usa
  `lenis.stop()/start()`. Con reduced-motion no hay Lenis y ahí sí se usa
  `overflow` de respaldo.
- **`body { overflow-x: clip }`, no `hidden`.** `hidden` crea un segundo scroller
  y en iOS aparece una banda blanca abajo del footer. `overscroll-behavior-y`
  va en `html`, no en `body`.
- **`viewportFit: "cover"`**: todo lo que toca el borde de abajo lleva
  `env(safe-area-inset-bottom)`.
- **El menú mobile esconde `main`, el footer y el fondo** con
  `html[data-menu="abierto"]` y un retardo de 0.55s, porque el panel `fixed` no
  llega a cubrir la franja de la barra de Safari.
- **`Reveal` va con `transition`, no con `animation`**, y lo oculto sólo aplica
  bajo `@media (scripting: enabled)`. Así, sin JS o con la pestaña en segundo
  plano, el contenido igual se ve. Tiene un fallback de 1200 ms.
- **`SiteBackdrop`**: el `position: fixed` va por `style` inline (LiquidEther lo
  pisa si viene por clase), el alto es `100lvh` y no `inset: 0` (evita el
  parpadeo en Safari) y las props son constantes de módulo (un array nuevo por
  render reconstruye la simulación WebGL entera). Sólo sigue al mouse de 768 px
  para arriba y se apaga con reduced-motion.
- **`LiquidEther.jsx` es un componente de React Bits con cambios locales**,
  como el breakpoint táctil. No lo reemplaces por la versión de upstream.
- **La cinta (`WorkMarquee`) usa scroll real, no `transform`**, para que se
  mueva sola y se pueda arrastrar con snap. Su orden intercalado es
  determinista: **nada de `Math.random()`**, que rompe la hidratación. El snap
  sólo está en mobile y mientras el usuario tiene el control. El hover no la
  frena y las imágenes van `eager`.
- **`VideoPieza`** usa `muted` + `playsInline` y hace el `play()` por JS, con
  fallback a los controles. Sólo reproduce mientras se ve en pantalla. Con
  reduced-motion muestra los controles y no arranca solo.
- **No hay GSAP ni ScrollTrigger** y no hacen falta: las entradas van con
  IntersectionObserver.
- Todo respeta `prefers-reduced-motion`. Si agregás movimiento, respetalo también.

## SEO

- `src/lib/seo.tsx` → `meta({ title, description, path, image })` arma canonical,
  Open Graph y Twitter. **Toda página nueva usa `meta()`**.
- JSON-LD: `Person` + `WebSite` en el layout; `CreativeWork` + `BreadcrumbList`
  en cada caso.
- `sitemap.ts` se arma solo desde `proyectos`, así que un proyecto nuevo entra solo.
- La tarjeta OG es una imagen estática (`src/app/opengraph-image.jpg`), igual
  que los íconos. En los casos se usa la primera foto del proyecto.

## Forma de trabajar

- **Vercel publica `main` en producción automáticamente.** Para cambios que no
  sean de texto, conviene trabajar en una rama: Vercel arma una URL de preview
  para mirarla antes de mergear. Nunca pushees a `main` sin que pase
  `npm run build`.
- **Probar en mobile**, y en particular en Safari de iPhone: ahí salieron casi
  todos los bugs de este sitio.
- **Commits en español**, con un título corto que diga qué cambia y un cuerpo que
  explique **por qué**, como los del `git log`.
- **Comentarios en español** que expliquen el porqué, no el qué, con la misma
  densidad que el resto del código. Los nombres del dominio van en español
  (`proyectos`, `piezas`, `esVideo`, `mostrar`).
- El crédito «Hecho con ❤️ por R Studios» del footer lleva `rel="noopener"` sin
  `noreferrer` a propósito, para que el tráfico llegue atribuido. Si Ailu lo
  quiere sacar, es su sitio: se saca.

## Pendientes conocidos

- [ ] Texto real de **Pinta Fácil** (hoy es provisorio).
- [ ] `npm run lint` roto (ver «Comandos»).
- [ ] La meta description de `/trabajos` habla de «gastronomía, indumentaria,
      bienestar y comercio local». Viene de los proyectos de prueba y no
      describe bien los reales (calzado, bienestar, jugos, pintura). Pedirle a
      Ailu una línea nueva.
- [ ] El link de LinkedIn lleva tilde (`/in/ailén-tobal`): verificar que abra su perfil.
- [ ] `meta()` en `src/lib/seo.tsx` declara la imagen OG de cada caso como
      1600×1067, pero las portadas reales son verticales (por ejemplo,
      1080×1350). No rompe nada; lo correcto sería pasarle el `w`/`h` real de
      la pieza.
