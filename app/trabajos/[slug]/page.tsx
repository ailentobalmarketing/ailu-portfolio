import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contacto from "@/components/Contacto";
import { proyectos } from "@/content/proyectos";

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  return p ? { title: p.nombre, description: p.resumen } : {};
}

export default async function Caso({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <div className="sample-project">
        <section className="sample-project-hero">
          <div className="sample-project-hero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imagen} alt="" />
          </div>
          <div className="sample-project-hero-overlay" />
          <div className="container">
            <div className="sample-project-hero-header">
              <h1
                data-animate-variant="slide"
                data-animate-on-scroll="false"
                data-animate-delay="0.4"
              >
                {p.nombre}
              </h1>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="sample-project-content">
            <div className="sample-project-col">
              <div className="sample-project-meta">
                <div className="sample-project-hero-row">
                  <div className="sample-project-hero-sub-col">
                    <p className="micro">Rubro</p>
                    <p>{p.rubro}</p>
                  </div>
                  <div className="sample-project-hero-sub-col">
                    <p className="micro">Lugar</p>
                    <p>{p.ubicacion}</p>
                  </div>
                  <div className="sample-project-hero-sub-col">
                    <p className="micro">Año</p>
                    <p>{p.anio}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sample-project-col">
              <h3 data-animate-variant="slide" data-animate-on-scroll="true">
                {p.resumen}
              </h3>
              <p
                className="prose lg"
                data-animate-variant="slide-lines"
                data-animate-on-scroll="true"
              >
                {p.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="sample-project-details sample-project-details-1">
        <div className="container">
          <div className="sample-project-col">
            <div className="sample-project-meta">
              <div className="sample-project-hero-row">
                <div className="sample-project-hero-sub-col">
                  <p className="micro">Qué hice</p>
                  {p.servicios.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="sample-project-details-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imagenesCaso[0]} alt="" />
            </div>
          </div>
          <div className="sample-project-col">
            <ul className="caso-resultados">
              {p.resultados.map((r) => (
                <li key={r.etiqueta}>
                  <h4
                    data-animate-variant="slide"
                    data-animate-on-scroll="true"
                  >
                    {r.valor}
                  </h4>
                  <p className="micro">{r.etiqueta}</p>
                </li>
              ))}
            </ul>
            {p.demo && (
              <p className="micro caso-aviso">
                Proyecto de prueba — marca y números inventados
              </p>
            )}
            <div className="sample-project-details-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imagenesCaso[1]} alt="" />
            </div>
          </div>
        </div>
      </section>

      <Contacto />
    </>
  );
}
