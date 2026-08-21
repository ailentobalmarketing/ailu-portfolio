import { perfil, titulares } from "@/content/ailu";

/** El cierre: llamado a la acción y datos de contacto sobre el panel oscuro. */
export default function Contacto() {
  return (
    <footer id="contacto">
      <div className="footer-inner">
        <div className="footer-cta">
          <span className="footer-cta-eyebrow">
            {titulares.contactoEyebrow}
          </span>
          <h3
            className="footer-cta-heading"
            data-animate-variant="slide"
            data-animate-on-scroll="true"
          >
            {titulares.contactoTitular}
          </h3>
          <div className="footer-contact">
            <a href={`mailto:${perfil.email}`}>{perfil.email}</a>
            <a href={perfil.whatsapp} target="_blank" rel="noopener">
              {perfil.telefono}
            </a>
            <a href={perfil.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-logo">{perfil.nombre} — 2026</p>
        </div>
      </div>
    </footer>
  );
}
