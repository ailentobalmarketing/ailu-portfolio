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

          <div className="ficha-row">
            <span className="micro ficha-label">Herramientas</span>
            <div className="ficha-tools">
              {herramientas.map((h) => (
                <div className="ficha-tool" key={h.grupo}>
                  <span className="micro">{h.grupo}</span>
                  <p className="prose">{h.items}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ficha-row">
            <span className="micro ficha-label">Experiencia</span>
            <div className="ficha-entries">
              {experiencia.map((e) => (
                <div className="ficha-entry" key={e.titulo}>
                  <h6>{e.titulo}</h6>
                  {e.meta && <p className="micro ficha-meta">{e.meta}</p>}
                  {e.texto && <p className="prose">{e.texto}</p>}
                  {e.items && (
                    <ul className="ficha-list">
                      {e.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ficha-row">
            <span className="micro ficha-label">Formación</span>
            <div className="ficha-entries">
              {formacion.map((f) => (
                <div className="ficha-entry" key={f.titulo}>
                  <h6>{f.titulo}</h6>
                  {f.meta && <p className="micro ficha-meta">{f.meta}</p>}
                  {f.texto && <p className="prose">{f.texto}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="ficha-row">
            <span className="micro ficha-label">Contacto</span>
            <div className="ficha-entries">
              <div className="ficha-entry">
                <h6>{perfil.email}</h6>
                <p className="micro ficha-meta">{perfil.telefono}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contacto />
      <Script src="/js/simulation.js" strategy="afterInteractive" />
      <Script src="/js/particle-visual.js" strategy="afterInteractive" />
    </>
  );
}
