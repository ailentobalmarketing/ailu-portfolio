# Ailén Tobal — Portfolio

Portfolio de **Ailén Tobal**, marketing digital y gestión de redes.
En producción en **[ailentobal.com.ar](https://ailentobal.com.ar)**.

Un sitio chico y estático de tres secciones: **Bio**, **Trabajos** (con un
detalle por proyecto) y **Contacto**. Es blanco y negro, en DM Sans, con un
fondo líquido animado y transiciones suaves entre páginas.

> **¿Recién lo recibís?** Empezá por **[docs/HANDOFF.md](docs/HANDOFF.md)**:
> ahí están, paso a paso, cómo pasarlo a tu GitHub, publicarlo en Vercel,
> conectar el dominio y trabajarlo con Claude Code.

---

## Stack

| | |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript |
| Estilos | Tailwind CSS v4 (tokens en `src/app/globals.css`) |
| Movimiento | Lenis (scroll suave), View Transitions API, IntersectionObserver |
| Fondo | LiquidEther (React Bits) sobre three.js |
| Hosting | Vercel, sin variables de entorno ni backend |

## Correrlo en tu compu

Necesitás **Node.js 20.9 o más nuevo** (se recomienda la versión LTS de
[nodejs.org](https://nodejs.org)).

```bash
git clone https://github.com/<tu-usuario>/ailu-portfolio.git
cd ailu-portfolio
npm install
npm run dev
```

Abrí **http://localhost:3000**. Los cambios se ven al guardar.

| Comando | Para qué |
| --- | --- |
| `npm run dev` | Servidor local con recarga en vivo |
| `npm run build` | Build de producción. **Si pasa acá, pasa en Vercel.** |
| `npm run start` | Sirve el build de producción en local |
| `npx tsc --noEmit` | Chequeo de tipos |

> `npm run lint` no funciona en Next 16: el comando `next lint` ya no existe.
> Ver [CLAUDE.md](CLAUDE.md#comandos).

## Dónde se cambia cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Textos de la bio, «Qué hago», herramientas, mail, teléfono, LinkedIn | `src/data/site.ts` |
| Proyectos: nombre, rubro, textos, servicios y piezas | `src/data/work.ts` |
| Fotos y videos de los proyectos | `public/work/` |
| Retrato de la bio | `public/bio/retrato.webp` |
| Colores, tipografía, tamaños y espaciado | `:root` en `src/app/globals.css` |
| Ícono de la pestaña / imagen al compartir el link | `src/app/icon.png`, `apple-icon.png`, `opengraph-image.jpg` |
| Aparecer o no en Google | `INDEXABLE` en `src/data/site.ts` |

La guía completa (cómo sumar un proyecto nuevo, cómo preparar fotos y videos y
qué no poner) está en **[docs/CONTENIDO.md](docs/CONTENIDO.md)**.

## Estructura

```
src/
  app/          páginas (Bio, Trabajos, Caso, Contacto), layout, SEO, estilos globales
  components/   nav, footer, transiciones, cinta de trabajos, fondo líquido, video
  data/         site.ts (textos) y work.ts (proyectos): el contenido vive acá
  lib/          seo.tsx (metadata y JSON-LD) y cn.ts
public/
  bio/          retrato
  work/         piezas de cada proyecto (WebP y MP4)
docs/           handoff, guía de contenido y decisiones de diseño
```

## Deploy

Cada push a `main` se publica solo en Vercel. Cualquier otra rama genera una
**URL de preview** para mirarla antes de publicar. No hay variables de
entorno que configurar. El paso a paso está en
[docs/HANDOFF.md](docs/HANDOFF.md#2-publicarlo-en-vercel).

## Documentación

- **[docs/HANDOFF.md](docs/HANDOFF.md)**: GitHub, Vercel, dominio, Claude Code y checklist de entrega.
- **[docs/CONTENIDO.md](docs/CONTENIDO.md)**: cómo editar textos, sumar proyectos y preparar fotos y videos.
- **[docs/DECISIONES.md](docs/DECISIONES.md)**: historia del proyecto y por qué está hecho como está.
- **[CLAUDE.md](CLAUDE.md)**: contexto para Claude Code (lo carga solo en cada sesión).

---

Diseño y desarrollo: [R Studios](https://rstudios.ar) · Ramiro Fazio Dattoli, 2026.
