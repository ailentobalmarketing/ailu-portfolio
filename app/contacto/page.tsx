import type { Metadata } from "next";
import Contacto from "@/components/Contacto";
import ContactCube from "@/components/ContactCube";
import { perfil } from "@/content/ailu";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <>
      <section className="contact">
        <div className="contact-headline">
          <h3
            data-animate-variant="slide-lines"
            data-animate-on-scroll="false"
            data-animate-delay="0.4"
          >
            Tenés una marca que merece contarse mejor de como se está contando
            hoy. Escribime y lo vemos.
          </h3>
        </div>
        <div className="contact-cube-wrap">
          <canvas id="cube-canvas" />
        </div>
        <div className="contact-footer">
          <p data-animate-variant="slide-lines" data-animate-on-scroll="true">
            {perfil.email} <br />
            Estrategia, contenido, pauta y medición <br />
            {perfil.ubicacion} <br />
            {perfil.disponibilidad}
          </p>
        </div>
      </section>
      <ContactCube />
      <Contacto />
    </>
  );
}
