import HeroTilt from "@/components/HeroTilt";
import {
  contacto,
  experiencia,
  formacion,
  herramientas,
  pasos,
  perfil,
  sobreMi,
  type Entrada,
} from "@/content/ailu";

function SectionHead({ n, titulo }: { n: string; titulo: string }) {
  return (
    <div className="sec-head">
      <p className="micro">
        {n} — {titulo}
      </p>
      <div className="sec-head-rule" />
    </div>
  );
}

function Entradas({ items }: { items: Entrada[] }) {
  return (
    <>
      {items.map((e) => (
        <div className="entry" key={e.titulo}>
          <h4>{e.titulo}</h4>
          {e.meta && <p className="entry-meta">{e.meta}</p>}
          {e.texto && <p>{e.texto}</p>}
          {e.items && (
            <ul>
              {e.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main>
      <HeroTilt
        footer={
          <div className="hero-footer">
            <div className="hero-footer-col">
              <p className="micro">{perfil.ubicacion}</p>
              <p className="micro">
                {pasos.map((p) => p.titulo).join(" · ")}
              </p>
            </div>
            <div className="hero-footer-col">
              <p className="micro">{perfil.disponibilidad}</p>
            </div>
          </div>
        }
      >
        <h1
          data-animate-variant="slide-words"
          data-animate-on-scroll="false"
          data-animate-delay="0.8"
          data-animate-stagger="0.1"
        >
          {perfil.nombre}
        </h1>
        <p
          className="hero-role"
          data-animate-variant="slide-words"
          data-animate-on-scroll="false"
          data-animate-delay="1.05"
        >
          {perfil.rol}
        </p>
      </HeroTilt>

      <section className="section" id="sobre-mi">
        <div className="container">
          <SectionHead n="01" titulo="Sobre mí" />
          {sobreMi.map((b, i) => (
            <div
              className={i % 2 === 1 ? "about-row flip" : "about-row"}
              key={b.titular}
            >
              <div className="about-col">
                <h2 data-animate-variant="slide" data-animate-on-scroll="true">
                  {b.titular}
                </h2>
              </div>
              <div className="about-col about-col-copy">
                <p
                  data-animate-variant="slide-lines"
                  data-animate-on-scroll="true"
                >
                  {b.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="como-trabajo">
        <div className="container">
          <SectionHead n="02" titulo="Cómo trabajo" />
          {pasos.map((paso, i) => (
            <div className="step" key={paso.titulo}>
              <div className="step-title">
                <span className="step-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 data-animate-variant="slide" data-animate-on-scroll="true">
                  {paso.titulo}
                </h3>
              </div>
              <ul className="step-list">
                {paso.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="herramientas">
        <div className="container">
          <SectionHead n="03" titulo="Herramientas" />
          <div className="tools">
            {herramientas.map((h) => (
              <div className="tool-group" key={h.grupo}>
                <span className="micro">{h.grupo}</span>
                <p>{h.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="trayectoria">
        <div className="container">
          <SectionHead n="04" titulo="Trayectoria" />
          <div className="two-col">
            <div>
              <p className="micro col-label">Experiencia</p>
              <Entradas items={experiencia} />
            </div>
            <div>
              <p className="micro col-label">Formación</p>
              <Entradas items={formacion} />
            </div>
          </div>
        </div>
      </section>

      <section className="contacto" id="contacto">
        <div className="container contacto-inner">
          <p className="micro contacto-eyebrow">{contacto.eyebrow}</p>
          <h3 data-animate-variant="slide" data-animate-on-scroll="true">
            {contacto.titular}
          </h3>
          <div className="contacto-links">
            <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
            <a href={perfil.whatsapp} target="_blank" rel="noopener">
              {perfil.telefono}
            </a>
            <a href={perfil.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
          <div className="contacto-bottom">
            <p className="micro">{perfil.nombre} — 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
