# Decisiones e historia del proyecto

Por qué el sitio está hecho como está. Casi todo lo que parece raro en el
código salió de un bug real o de una decisión tomada con Ailu y Ramiro. Antes
de «simplificar» algo de esta lista, leé por qué está.

> Los mensajes de commit (`git log`) tienen el detalle fino de cada cambio,
> con mediciones. Esto es el resumen ordenado.

---

## 1. Historia

Todo se hizo entre el 21 y el 24 de agosto de 2026.

| Etapa | Qué pasó |
| --- | --- |
| **Base** | Proyecto nuevo en Next 16 (`c4fef04`), con la estructura y el movimiento portados de «Lemon Bureau» (awwwards-library, scroll-animation-59). Ya en ese primer commit se sacó Neue Montreal, una fuente paga que venía pirateada en el pack. |
| **Etapa Lemon Bureau** | Sobre esa plantilla: GSAP, SplitText, scroll horizontal pinneado, partículas WebGL, cursor propio, un limón ASCII, un cubo con física en contacto. Se restauró, se podó varias veces (`ff5a8a1`, `443ed1e`, `d191ef7`, `45a5af4`) y los proyectos eran **seis marcas inventadas con métricas inventadas**. Por eso el sitio estuvo con `noindex` (`7a38710`). |
| **Rehacer en minimal** | Se descartó Lemon Bureau entero (`d7fbb28`). La base pasó a ser el sistema de diseño del portfolio de **Arturo Marinho**, llevado a blanco y negro puro y a DM Sans. De ese sistema vinieron los tokens (escala fluida con `clamp`, ritmo, easings con nombre), la nav de banda sticky con overlay mobile, las View Transitions y Lenis. Quedó afuera lo que Ailu no necesita: next-intl, Cloudflare, el panel `/studio` y el catálogo dinámico. |
| **SEO y cinta** | Interruptor único de indexación, `seo.tsx`, JSON-LD, sitemap y la cinta de trabajos en la home (`3a3586e`). Se probaron rayos de luz en el footer y no gustaron (`8c7836e`). La cinta dejó de trabarse con el hover (`36d6ba4`). |
| **Proyectos reales** | Entran Batistella, Macboot, Havaianas, Hüm y Zuco Pure con el texto de Ailu, más 24 piezas del Drive «PORTFOLIO 2026» pasadas a WebP (99 MB → 4,1 MB). También el fondo líquido, los modos de mezcla y todo en español: `/works` pasó a ser `/trabajos` (`6c5de70`). La rama `minimal` es una foto de este momento. |
| **Videos y Safari** | Videos en autoplay (136 MB → 12 MB), la marca Pinta Fácil con texto provisorio, el retrato en la bio y la primera tanda de arreglos de iPhone (`a0e5282`, `66b76b6`). |
| **Salida a producción** | `INDEXABLE = true` el 2026-08-21 (`120c604`). Después: OG e íconos como archivos estáticos en lugar de generados (`6ea3aee`), el dominio corregido de `ailentobal.ar` a `ailentobal.com.ar` (`279d951`) y los ajustes del fondo líquido en mobile (`ead9526`, `c3a1935`). |
| **Handoff** | Documentación para Ailu y para Claude Code (2026-09-28). |

Los bugs de iPhone se reprodujeron y verificaron en Safari de un iPhone 17
(simulador, iOS 26.4), no razonando desde el escritorio.

---

## 2. Contenido

| Decisión | Por qué |
| --- | --- |
| **Sin métricas en el modelo** | Los números inventados eran lo más riesgoso de la primera versión. Si aparece uno real, va dentro del texto. |
| **Sin año por proyecto** | No aporta a este trabajo y envejece el portfolio solo. Con él se fueron la fila de la ficha, el `dateCreated` del JSON-LD y el año de la meta description. |
| **Sin logos de clientes como piezas** | Batistella, Macboot y Havaianas son marcas de ellos, no diseño de Ailu: en su tira de trabajos sugerirían autoría. Los de Hüm y Zuco Pure sí, porque ahí la identidad es suya. |
| **Detalle de proyecto corto** | Encabezado, uno o dos párrafos, ficha y piezas. Ailu no tiene mucha información por proyecto, y forzar más secciones sólo agrega relleno. |
| **«Qué hago» en 4 bloques** | Reemplaza los 30 bullets del PDF original: se escanea de un vistazo. |
| **Flag `demo`** | Si alguna vez vuelve material de relleno, avisa en la página y no firma como propio ante Google (omite `creator` en el JSON-LD). |
| **`INDEXABLE` como interruptor único** | Una sola constante maneja `robots.txt`, el sitemap y el meta robots de todas las páginas. `robots.txt` solo no alcanza si alguien linkea el sitio. |
| **Pinta Fácil con texto provisorio, e indexado** | Ailu no mandó el suyo. El provisorio describe sólo lo que se ve en las piezas y no afirma nada sobre estrategia ni resultados. Ramiro decidió indexarlo igual. |

---

## 3. Diseño

- **Blanco y negro, sin temperatura.** `--ink #0a0a0a`, `--paper #fff`, grises neutros.
- **DM Sans para todo**, en pesos 400 y 500. El único texto en mayúsculas es el
  rótulo `u-eyebrow`.
- **Medida de lectura corta** (`--measure: 34rem`) y ancho máximo de 84rem, más
  angosto que el de Arturo a propósito: acá manda el texto.
- **Portada de la grilla en 4:5.** Ninguna pieza es apaisada (salvo el mockup
  de Hüm), y recortar a 3:2 una placa diseñada se comía titulares y logos.
- **Detalle en mosaico de columnas** (2 en mobile, 3 en desktop, con una de
  cada tres desfasada en desktop). Ocho piezas apiladas medían ~15.000 px de
  alto; en mosaico, ~1.900.
- **Fotos a color** en la grilla, la cinta y el detalle. Sólo el retrato de la
  bio va en blanco y negro.
- **Footer en bloque de tinta plano.** Los rayos de luz se probaron y se sacaron.
- **Fondo líquido** gris (`#404040`) detrás de todo el sitio.

---

## 4. Técnica

### Modos de mezcla (legibilidad sobre el fondo líquido)

- **Texto de `main` en `multiply`**: negro sobre cualquier cosa sigue negro y
  nunca se aclara contra el fondo. `difference` sería el error clásico: sobre
  fondo claro convierte el negro en blanco.
- **Imágenes excluidas del blend**: son el trabajo de Ailu y se muestran como son.
- **Rótulo de la cinta en `normal`**: en `multiply` el texto blanco desaparece.
  El selector cuelga de la clase `.marquee-rail`, no de un `aria-label`, para
  que no dependa de un texto.
- **Nav en `difference`, con los colores al revés.** Es el único modo que
  garantiza que el texto nunca se pierda: invierte lo que tenga detrás. Por eso
  el texto de la nav es **blanco** en el código y se ve negro sobre el papel. El
  gris de la página actual es `#757575`, que invertido da `#8a8a8a`, el gris
  del sistema. El blend va sobre el `<header>` como grupo: el header es `z-50`
  (un contexto de apilado), así que puesto en cada hijo se mezclaría contra el
  grupo vacío y nunca llegaría al fondo.
- La página actual se marca con **gris + `aria-current="page"`**: el gris tiene
  menos contraste, así que el color solo no alcanza.

### Entradas y transiciones

- **`Reveal`** (sube 16 px y aparece) va con **IntersectionObserver + CSS
  `transition`**, no con `animation` ni con una librería:
  - Con `animation`, si la animación no corre (sin JS, o con la pestaña en
    segundo plano) el contenido queda en opacidad 0. Con `transition`, el
    estado natural es el visible.
  - Lo oculto se aplica bajo `@media (scripting: enabled)`: sin JS se ve todo, y
    no hace falta un script inline que marque el `<html>` (eso rompía la hidratación).
  - Fallback de 1200 ms: con la pestaña abierta en segundo plano el observer no
    reporta nada y el texto no puede depender de eso.
  - Si un bloque nace durante una transición de página y ya está a la vista,
    se muestra de una: el wipe es su entrada. Si no, el navegador lo fotografía
    a mitad de camino y al final pega un tirón de 16 px.
- **Transición entre páginas con la View Transitions API** (`PageTransition` +
  `TransitionLink`). La página nueva se destapa de arriba hacia abajo sobre la
  vieja, que se difumina. Detalles:
  - `mix-blend-mode: normal` en los pseudo-elementos; si no, las capas se suman
    y queman el blanco.
  - Va en `linear` y no con un ease fuerte: con ease-in-out el borde del
    barrido cruza la pantalla a mitad de la animación y no se llega a ver.
  - La nav tiene su propio `view-transition-name` y queda quieta.
  - Al llegar se hace scroll al tope con `lenis.scrollTo(0, { immediate: true })`:
    el `window.scrollTo` de Next queda pisado por Lenis en el frame siguiente.
    El botón «atrás» sigue restaurando la posición.
  - Hay un timeout de seguridad de 2 s si el pathname nunca cambia.
  - Sin soporte de View Transitions o con reduced-motion: navegación directa.
- **`TransitionLink`** mantiene el `<a>` real (href, prefetch, cmd/ctrl+click,
  SEO) y sólo intercepta el click normal.

### Scroll (Lenis)

- Lenis mueve el scroll **real** de la ventana, así que `sticky` y las medidas
  funcionan normal.
- **Para frenar el scroll se usa `lenis.stop()/start()`**, nunca `overflow` del
  body: Lenis sigue escribiendo posiciones y pelearle por CSS hacía que Safari
  cambiara su barra inferior.
- Con reduced-motion no se monta Lenis, y ahí sí se usa `overflow` de respaldo.
- No hay GSAP ni ScrollTrigger: meterlos serían ~148 KB de JS en todas las
  páginas para nadie.

### Safari de iPhone (los bugs que ya se pelearon)

| Síntoma | Causa | Solución |
| --- | --- | --- |
| Bloque blanco abajo al abrir/cerrar el menú | Sin `viewport-fit=cover` Safari rellena la franja de su barra con el color de fondo | `viewportFit: "cover"` y `env(safe-area-inset-bottom)` en todo lo que toca el borde de abajo |
| Rectángulo blanco al final de la página (1) | `overflow-x: hidden` en body obliga a `overflow-y: auto` y crea un segundo scroller | `overflow-x: clip` |
| Rectángulo blanco al final de la página (2) | Al abrir el menú, Safari despliega su barra y Lenis cachea un alto viejo; la banda medía ~110 pt, el alto exacto de la barra | `lenis.resize()` al cerrar el menú y en cada `resize` de `visualViewport` (`window.resize` no se entera) |
| Rebote que mostraba blanco detrás del footer negro | `overscroll-behavior-y` en body no hace nada: no se propaga al viewport | Se movió a `html` |
| El menú dejaba asomar la página por abajo | Un overlay `fixed` no cubre la franja de la barra de Safari. Se probó con `100lvh` y 8rem de sobra: Safari lo recorta igual | Con el menú abierto se esconden `main`, el footer y el fondo (`visibility`, con 0.55 s de retardo para no comerse la animación del panel) |
| Parpadeo del fondo líquido al scrollear | Con `inset: 0` el contenedor seguía el alto del viewport: 3 resizes por swipe, y cada uno rehace la simulación | Alto fijo en `100lvh`: 1 solo resize, el del montaje |
| El fondo daba saltos al scrollear con el dedo | Seguir el dedo pelea con el scroll | Interacción sólo de 768 px para arriba; en mobile el fondo va en automático |

### Menú mobile

- El texto del botón rota entre «Menú» y «Cerrar» dentro de un `overflow-hidden`,
  con un grid-stack para que el ancho no salte.
- Accesibilidad: al abrir, el foco va al primer link; `Escape` cierra y
  devuelve el foco al botón; el panel cerrado es `inert`.
- Si se agranda la ventana a desktop con el menú abierto, se cierra solo (si
  no, el bloqueo de scroll quedaba pegado).

### Fondo líquido (`SiteBackdrop` + `LiquidEther`)

- `LiquidEther` es un componente de **React Bits** (WebGL sobre three), con
  un cambio local: sólo engancha los listeners de mouse y touch de 768 px
  para arriba (`syncListeners` con `Common.breakpoint`). No reemplazarlo por la
  versión de upstream.
- `position: fixed` va por **`style` inline**: el componente hace
  `container.style.position = container.style.position || 'relative'`, que
  sólo lee el estilo inline. Con una clase, lo pisa y el fondo se va con el scroll.
- `pointerEvents: "none"` no lo deja sordo: los listeners van en `window` y
  filtran por el rect del contenedor. El fluido sigue al cursor sin comerse
  ningún click.
- Las props son **constantes de módulo**: si fueran literales en el render,
  cada render daría un array nuevo y el effect reconstruiría toda la simulación WebGL.
- Con reduced-motion se oculta y deja de consumir GPU.

### Cinta de trabajos (`WorkMarquee`)

- **Scroll real, no `transform`**: es la única forma de que se mueva sola y se
  pueda arrastrar con scroll-snap (el snap no ve un transform).
- Avanza ~24 px/s acumulando decimales, porque `scrollLeft` redondea a entero
  y a 0.4 px por frame se perdería todo el avance. El set va duplicado y al
  pasar la mitad vuelve al punto equivalente: el reinicio no se ve.
- **Orden intercalado y determinista**: cada foto tiene una posición relativa
  dentro de su proyecto y se ordena por eso, así no quedan dos de la misma
  marca pegadas. **Nada de `Math.random()`**: renderiza en servidor y en
  cliente, y dos órdenes distintos rompen la hidratación.
- Cede el control con el drag, el wheel **horizontal** y el teclado; retoma a
  los 2,5 s. El wheel vertical es la página scrolleando y **el hover no la
  frena** (a 24 px/s se puede clickear igual).
- **Snap sólo en mobile** y sólo mientras el usuario tiene el control
  (`data-libre`): con snap siempre puesto, el automático queda trabado.
- Imágenes `eager`: en un riel horizontal el lazy nativo deja huecos blancos.
  La copia reusa las mismas URLs, así que no se descargan dos veces.
- La copia es `aria-hidden` y sus links `tabIndex={-1}`: para un lector de
  pantalla sería la misma lista dos veces.

### Videos (`VideoPieza`)

- `muted` + `playsInline`, o iOS no los deja arrancar solos y encima los abre a
  pantalla completa.
- El `play()` va por JS y no con el atributo `autoplay`, para poder mostrar los
  controles si el navegador lo bloquea igual. Un video parado y sin controles
  es una pieza que nadie puede ver.
- Sólo reproducen mientras están en pantalla: ahorra batería, y iOS tiene un
  techo de decoders simultáneos.
- Con reduced-motion no arrancan solos y muestran los controles.

### SEO

- `meta()` en `src/lib/seo.tsx` es la única fuente de metadata por página:
  canonical (evita duplicados con parámetros de campaña), Open Graph y Twitter.
- JSON-LD: `Person` + `WebSite` una sola vez en el layout; `CreativeWork` +
  `BreadcrumbList` en cada caso. `image` del CreativeWork lleva sólo fotos:
  schema.org no acepta video ahí.
- La tarjeta OG y los íconos son archivos estáticos en `src/app/`. Antes la
  tarjeta se generaba en el build y se reemplazó por una imagen fija.

### Otros

- El reset de CSS va en `@layer base`: sin capa les gana a las utilidades de
  Tailwind sin importar la especificidad.
- El footer firma «Hecho con ❤️ por R Studios» con `rel="noopener"` y **sin**
  `noreferrer`, para que el tráfico llegue atribuido a rstudios.ar (igual que
  en trafull.com).

---

## 5. Lo que se probó y se sacó

No volver a meterlo salvo que Ailu lo pida.

| Qué | Por qué se fue |
| --- | --- |
| Plantilla Lemon Bureau completa (GSAP, SplitText, pin horizontal, carrusel con wipe SVG, marquesina de clientes) | Se rehízo el sitio con un enfoque minimal, centrado en el texto |
| Limón ASCII de partículas y campo fluido del footer (36 shaders) | Recortes para bajar el volumen de la plantilla |
| Cursor en cruz, foto en el centro del menú, cubo con pelotitas en contacto | Ronda de recortes pedida por Ramiro |
| Rayos de luz en el footer (`LightRays` + `ogl`) | No gustó el efecto |
| Proyectos de prueba con métricas inventadas | Se habrían leído como trabajo real de Ailu |
| Campo `anio` | Envejece el portfolio y no aporta |
| Fotos de la grilla en gris | Las piezas se ven a color: son el trabajo |
| Logos de clientes como piezas | Sugieren autoría |
| Tarjeta OG generada con código | Reemplazada por un archivo estático |
| Rutas en inglés (`/works`) | Todo el sitio es en español |
