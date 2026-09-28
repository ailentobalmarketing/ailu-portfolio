# Handoff: el portfolio pasa a manos de Ailu

Guía para que Ailén tenga el sitio en **su** GitHub, publicado desde **su**
Vercel, con **su** dominio y trabajándolo con **Claude Code**. Está pensada
para seguirla en orden, sin saber programar.

Hay pasos que hace **Ramiro** (marcados 🧑‍💻) y pasos que hace **Ailu**
(marcados 🙋‍♀️).

---

## 0. Qué se entrega

| | |
| --- | --- |
| Repo | `ailu-portfolio`, hoy en `github.com/ramirofaziodattoli/ailu-portfolio` (público) |
| Sitio | Next.js 16, 100 % estático, sin backend ni variables de entorno |
| Dominio | `ailentobal.com.ar` |
| Contenido | 6 proyectos: Batistella, Macboot, Havaianas, Hüm, Zuco Pure y Pinta Fácil. 30 fotos, 4 videos y el retrato |
| Estado | Build OK (17 rutas estáticas), indexable en Google desde el 2026-08-21 |
| Documentación | `README.md`, `CLAUDE.md` y `docs/` (esta guía, `CONTENIDO.md` y `DECISIONES.md`) |
| Claude Code | `CLAUDE.md` + hook que instala las dependencias al abrir una sesión en la web |

**Pendientes que quedan abiertos** (también están en `CLAUDE.md`):

- El texto de **Pinta Fácil** es provisorio: falta el de Ailu.
- La meta description de `/trabajos` viene de los proyectos de prueba y conviene reescribirla.
- Verificar que el link de LinkedIn (`linkedin.com/in/ailén-tobal`, con tilde) abra el perfil.
- `npm run lint` está roto en Next 16 (no afecta al sitio ni al deploy).
- Detalles menores de código: ver «Pendientes conocidos» en `CLAUDE.md`.

---

## 1. Pasarlo a tu GitHub

### 🧑‍💻 Antes de nada

Mergear a `main` la rama con esta documentación, para que viaje con el repo.

### Opción A — Transferir el repo (recomendada)

Ailu se queda con el repo **original**, con todo su historial. GitHub redirige
la URL vieja a la nueva, así que ningún link se rompe.

1. 🙋‍♀️ Si no tenés cuenta de GitHub, creala en [github.com/signup](https://github.com/signup) y pasale tu **usuario** a Ramiro.
2. 🧑‍💻 En el repo: **Settings → General →** al fondo, **Danger Zone → Transfer ownership**.
   Escribí el usuario de Ailu, confirmá el nombre del repo y **Transfer**.
3. 🙋‍♀️ Te llega un mail de GitHub: **aceptá la transferencia**. Vence a las 24 h;
   si se vence, Ramiro la vuelve a mandar.
4. 🙋‍♀️ Listo: el repo queda en `github.com/<tu-usuario>/ailu-portfolio`. Si
   querés que Ramiro pueda seguir ayudando, sumalo en **Settings →
   Collaborators**. Si preferís que el código no sea público, lo podés pasar a
   privado en **Settings → General → Danger Zone → Change visibility**: Vercel
   funciona igual.

### Opción B — Copiarlo (si Ramiro quiere conservar el suyo)

1. 🙋‍♀️ Creá un repo **vacío** en [github.com/new](https://github.com/new) llamado
   `ailu-portfolio`: sin README, sin .gitignore y sin licencia.
2. 🧑‍💻 (o quien tenga la terminal) copia todo, con historial y ramas:

   ```bash
   git clone --bare https://github.com/ramirofaziodattoli/ailu-portfolio.git
   cd ailu-portfolio.git
   git push --mirror https://github.com/<usuario-de-ailu>/ailu-portfolio.git
   cd .. && rm -rf ailu-portfolio.git
   ```

> **No usar Fork.** Un fork queda atado al repo original y, si el original es
> público, el fork no se puede hacer privado.

La rama `minimal` es vieja y ya está entera dentro de `main`: se puede borrar
sin perder nada.

---

## 2. Publicarlo en Vercel

1. 🙋‍♀️ Entrá a [vercel.com/signup](https://vercel.com/signup) y elegí **Continue with GitHub**.
   El plan **Hobby** es gratis y alcanza de sobra para un portfolio personal.
2. **Add New… → Project**. En **Import Git Repository**, si no aparece el repo,
   tocá **Adjust GitHub App Permissions** y dale acceso a `ailu-portfolio` (o a
   todos tus repos). Después, **Import**.
3. En la pantalla de configuración **no cambies nada**:

   | Campo | Valor |
   | --- | --- |
   | Framework Preset | **Next.js** (lo detecta solo) |
   | Root Directory | `./` |
   | Build / Output / Install Command | los que vienen por defecto |
   | Environment Variables | **ninguna**: el sitio no usa |

4. **Deploy**. En un minuto más o menos te da una URL tipo
   `ailu-portfolio-xxxx.vercel.app`. Abrila y recorré el sitio.

> Mientras el dominio no esté conectado, los links «canónicos» y la tarjeta al
> compartir apuntan a `ailentobal.com.ar`. Es lo esperado y no hay que tocar
> nada: salen de `site.url` en `src/data/site.ts`.

**Desde ahora, cómo publica Vercel:**

- Cada cambio en `main` → se publica solo en **producción**.
- Cada cambio en otra rama o en un Pull Request → **URL de preview** para
  mirarlo antes. Si ves bien la preview, mergeás el PR y sale a producción.
- Si algo se rompe: en **Deployments**, sobre un deploy anterior que andaba,
  **⋯ → Promote to Production** (o **Instant Rollback**). Vuelve al instante.

Node: el proyecto necesita **Node 20.9 o más**. El que trae Vercel por defecto
sirve; se ve en **Settings → Build and Deployment → Node.js Version**.

---

## 3. Conectar el dominio `ailentobal.com.ar`

### 🧑‍💻 Antes: liberar el dominio

- **Si el sitio hoy está publicado desde el Vercel de Ramiro**: en ese proyecto,
  **Settings → Domains →** sacar `ailentobal.com.ar` y `www.ailentobal.com.ar`.
  Si no se sacan, Vercel le va a pedir a Ailu un registro TXT para probar que
  el dominio es suyo. No es grave, pero es un paso más.
- **Titularidad**: los `.com.ar` se registran en **NIC Argentina**
  ([nic.ar](https://nic.ar)). Conviene que la titular sea Ailu. Si está a nombre
  de Ramiro, hacer la **transferencia de titularidad** desde NIC Argentina (la
  inicia el titular actual y la acepta Ailu con su clave fiscal).

### 🙋‍♀️ Sumarlo a tu proyecto de Vercel

1. En el proyecto: **Settings → Domains → Add** y escribí `ailentobal.com.ar`.
2. Si Vercel ofrece sumar también `www.ailentobal.com.ar` con **redirect** al
   dominio sin www, aceptá. El sitio está pensado **sin www**, así que ésa tiene
   que ser la principal.
3. Vercel va a mostrar el dominio como **Invalid Configuration** hasta que
   apuntes los DNS. Hay dos caminos:

**Camino 1 — Nameservers de Vercel (el más simple).** Vercel maneja todo, SSL incluido.

1. En la pantalla del dominio en Vercel, elegí la opción de **nameservers** y copiá
   los dos que te muestra (normalmente `ns1.vercel-dns.com` y `ns2.vercel-dns.com`).
2. En [nic.ar](https://nic.ar), entrá con tu clave fiscal, andá al dominio y, en
   **Delegaciones**, reemplazá los que haya por esos dos.
3. Ojo: si el dominio tuviera un mail propio (registros MX), habría que volver a
   cargarlos en Vercel. Con el mail de Gmail no hace falta.

**Camino 2 — Mantener el DNS donde está** (Cloudflare, DonWeb, el hosting que sea).
En ese panel cargá **exactamente los valores que muestra Vercel** en la
pantalla del dominio. Hoy suelen ser éstos:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns-0.com` (o el que indique Vercel) |

4. Esperá. Puede tardar de minutos a unas horas; los cambios en NIC Argentina a
   veces tardan más. Cuando el dominio pase a **Valid Configuration**, Vercel
   emite el certificado SSL solo.

### Chequeo final del dominio

- [ ] `https://ailentobal.com.ar` abre el sitio con el candado.
- [ ] `https://www.ailentobal.com.ar` redirige al dominio sin www.
- [ ] `https://ailentobal.com.ar/robots.txt` dice `Allow: /` y muestra el sitemap.
- [ ] `https://ailentobal.com.ar/sitemap.xml` lista 9 URLs.

### Recomendado: Google Search Console

Para ver cómo te encuentran en Google (y porque es tu rubro 😉):

1. [search.google.com/search-console](https://search.google.com/search-console) → **Agregar propiedad → Dominio** → `ailentobal.com.ar`.
2. Te pide un registro **TXT**: cargalo donde estén tus DNS (Vercel, si
   seguiste el Camino 1: **Domains →** el dominio **→ DNS Records**).
3. En **Sitemaps**, enviá `https://ailentobal.com.ar/sitemap.xml`.

---

## 4. Trabajarlo con Claude Code

El repo ya trae todo para que Claude arranque con el mismo contexto con el que
se construyó el sitio:

| Archivo | Qué hace |
| --- | --- |
| `CLAUDE.md` | Claude lo lee solo al empezar cada sesión: qué es el sitio, cómo está armado, las reglas de contenido y las cosas que no hay que «arreglar» |
| `docs/CONTENIDO.md` | Cómo cambiar textos, sumar proyectos y preparar fotos y videos |
| `docs/DECISIONES.md` | Toda la historia y el porqué de cada decisión |
| `.claude/settings.json` + `.claude/hooks/session-start.sh` | En las sesiones en la web, instala las dependencias antes de empezar para que Claude pueda compilar y probar |
| `.claude/launch.json` | Cómo levantar el sitio en modo preview (`npm run dev`) |

### Configurarlo (una sola vez)

1. 🙋‍♀️ Entrá a [claude.ai/code](https://claude.ai/code) con tu cuenta de Claude.
2. Conectá GitHub en [claude.ai/connect-github](https://claude.ai/connect-github).
   Desde ahí mismo instalá la **Claude GitHub App** en tu cuenta y dale acceso
   al repo `ailu-portfolio`.
3. Empezá una sesión nueva y elegí el repo `ailu-portfolio`. La primera vez
   tarda un poco más, porque instala las dependencias.

> También se puede usar desde la app de escritorio de Claude o desde la
> terminal (`claude`) con el repo clonado en la compu. `CLAUDE.md` funciona
> igual en los tres.

### Cómo pedirle cosas

Hablale como a alguien que conoce el sitio de memoria. Por ejemplo:

- «Reemplazá el texto provisorio de Pinta Fácil por éste: …»
- «Cambiá el tercer párrafo de la bio por: …»
- «Sumá un proyecto nuevo, *Nombre*, rubro *tal*. Subí las fotos a
  `public/work/`: armale la ficha con los alt y ordenalas así: …»
- «Sacá la foto 4 de Macboot.»
- «Cambiá mi teléfono / mi mail en todo el sitio.»
- «Hacé los cambios en una rama y abrí un Pull Request, así miro la preview de
  Vercel antes de publicar.»

**El circuito seguro** para cualquier cambio que no sea una coma:

1. Claude trabaja en una **rama** y abre un **Pull Request**.
2. Vercel comenta en el PR con la **URL de preview**. Miralo en la compu **y en el celular**.
3. Si está bien, **Merge** en GitHub y en un minuto está en producción.

Claude siempre corre `npm run build` antes de subir: si el build falla, no se publica nada roto.

---

## 5. Checklist de entrega

### 🧑‍💻 Ramiro

- [ ] Mergear a `main` la rama de documentación.
- [ ] Transferir el repo a Ailu (opción A) o hacer la copia (opción B).
- [ ] Si el sitio corre en su Vercel: sacar el dominio de ese proyecto. Después
      de que el de Ailu esté andando, pausar o borrar el proyecto viejo.
- [ ] Pasarle a Ailu la titularidad del dominio en NIC Argentina, o el acceso
      a donde esté el DNS.
- [ ] Confirmar que Ailu tenga los originales (Drive «PORTFOLIO 2026»).

### 🙋‍♀️ Ailu

- [ ] Aceptar la transferencia en GitHub (o crear el repo vacío para la copia).
- [ ] Crear la cuenta de Vercel, importar el repo y hacer el primer deploy.
- [ ] Conectar `ailentobal.com.ar` y pasar el chequeo final del dominio.
- [ ] Recorrer el sitio en compu y celular: Bio, Trabajos, cada caso y Contacto.
- [ ] Probar que el mail, el WhatsApp y el LinkedIn abran bien.
- [ ] Conectar Claude Code y hacer un cambio chico de prueba en una rama.
- [ ] Reemplazar el texto provisorio de Pinta Fácil.
- [ ] (Opcional) Search Console y envío del sitemap.
