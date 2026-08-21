import Script from "next/script";
import type { Metadata } from "next";
import StudioHero from "@/components/StudioHero";
import Steps from "@/components/Steps";
import Clients from "@/components/Clients";
import Contacto from "@/components/Contacto";
import {
  experiencia,
  formacion,
  herramientas,
  perfil,
  sobreMi,
  titulares,
} from "@/content/ailu";

export const metadata: Metadata = { title: "Perfil" };

export default function Perfil() {
  return (
    <>
      <section className="studio-hero">
        <div className="studio-hero-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/perfil/hero.jpg" alt="" />
        </div>
        <div className="studio-hero-copy">
          {titulares.perfilHero.map((palabra, i) => (
            <div className="studio-hero-header" key={palabra}>
              <h1
                data-animate-variant="slide"
                data-animate-on-scroll="false"
                data-animate-delay={0.8 + i * 0.1}
              >
                {palabra}
              </h1>
            </div>
          ))}
        </div>
        <div className="hero-footer">
          {titulares.perfilFooterIzq.length > 0 && (
            <div className="hero-footer-col">
              {titulares.perfilFooterIzq.map((t, i) => (
                <p
                  key={t}
                  data-animate-variant="slide"
                  data-animate-on-scroll="false"
                  data-animate-delay={1 + i * 0.1}
                >
                  {t}
                </p>
              ))}
            </div>
          )}
          <div className="hero-footer-col">
            <p
              data-animate-variant="slide"
              data-animate-on-scroll="false"
              data-animate-delay="1.2"
            >
              {titulares.perfilFooterDer}
            </p>
          </div>
        </div>
      </section>
      <StudioHero />

      <section className="about">
        <div className="container">
          {sobreMi.map((bloque, i) => (
            <div className="about-row" key={bloque.titular}>
              {/* La fila del medio invierte el orden: titular a la derecha. */}
              {i === 1 && (
                <div className="about-col about-col-copy">
                  <p
                    className="prose"
                    data-animate-variant="slide-lines"
                    data-animate-on-scroll="true"
                  >
                    {bloque.texto}
                  </p>
                </div>
              )}
              <div className="about-col">
                <h1 data-animate-variant="slide" data-animate-on-scroll="true">
                  {bloque.titular}
                </h1>
              </div>
              {i !== 1 && (
                <div className="about-col about-col-copy">
                  <p
                    className="prose"
                    data-animate-variant="slide-lines"
                    data-animate-on-scroll="true"
                  >
                    {bloque.texto}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="particle-canvas">
          <canvas id="particle-canvas" />
          <div className="particle-header">
            <h1 data-animate-variant="slide" data-animate-on-scroll="true">
              {titulares.particula}
            </h1>
          </div>
        </div>
      </section>

      <Steps />

      <section className="clients">
        <div className="container">
          <div className="clients-header-wrapper">
            <div className="clients-header">
              <h3 data-animate-variant="slide" data-animate-on-scroll="true">
                {titulares.marcasTitulo}
              </h3>
            </div>
            <div className="clients-copy">
              <p
                className="prose"
                data-animate-variant="slide-lines"
                data-animate-on-scroll="true"
              >
                {titulares.marcasCopy}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Clients />

      <section className="ficha">
        <div className="container">
          <div className="ficha-head">
            <h3 data-animate-variant="slide" data-animate-on-scroll="true">
              La ficha
            </h3>
          </div>

          {/* Tres bloques con la MISMA forma: etiqueta a la izquierda, valor a
              la derecha, una línea por fila. Antes cada bloque tenía su propio
              formato y no se podía escanear. */}
          <dl className="ficha-tabla">
            <div className="ficha-bloque">
              <dt className="micro ficha-bloque-label">Herramientas</dt>
            </div>
            {herramientas.map((h) => (
              <div className="ficha-fila" key={h.grupo}>
                <dt>{h.grupo}</dt>
                <dd>{h.items}</dd>
              </div>
            ))}

            <div className="ficha-bloque">
              <dt className="micro ficha-bloque-label">Experiencia</dt>
            </div>
            {experiencia.map((e) => (
              <div className="ficha-fila" key={e.titulo}>
                <dt>{e.titulo.split(" — ")[0]}</dt>
                <dd>
                  {e.titulo.includes(" — ") && (
                    <span className="ficha-rol">
                      {e.titulo.split(" — ")[1]}
                    </span>
                  )}
                  {e.meta && <span className="ficha-dato">{e.meta}</span>}
                  {e.texto && <span>{e.texto}</span>}
                  {e.items && <span>{e.items.join(" · ")}</span>}
                </dd>
              </div>
            ))}

            <div className="ficha-bloque">
              <dt className="micro ficha-bloque-label">Formación</dt>
            </div>
            {formacion.map((f) => (
              <div className="ficha-fila" key={f.titulo}>
                <dt>{f.titulo}</dt>
                <dd>{f.meta ?? f.texto}</dd>
              </div>
            ))}

            <div className="ficha-bloque">
              <dt className="micro ficha-bloque-label">Contacto</dt>
            </div>
            <div className="ficha-fila">
              <dt>Mail</dt>
              <dd>
                <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
              </dd>
            </div>
            <div className="ficha-fila">
              <dt>WhatsApp</dt>
              <dd>
                <a href={perfil.whatsapp} target="_blank" rel="noopener">
                  {perfil.telefono}
                </a>
              </dd>
            </div>
            <div className="ficha-fila">
              <dt>Base</dt>
              <dd>{perfil.ubicacion}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Contacto />
      <Script src="/js/simulation.js" strategy="afterInteractive" />
      <Script src="/js/particle-visual.js" strategy="afterInteractive" />
    </>
  );
}
