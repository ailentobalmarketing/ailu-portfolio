import Script from "next/script";
import { perfil, titulares } from "@/content/ailu";

/**
 * El cierre de Lemon Bureau: campo de partículas fluidas reactivo al mouse
 * detrás del llamado a la acción. La simulación es WebGL y vive en
 * /public/js (footer.js + wrappedgl + simulator + shaders), que se cargan
 * como scripts clásicos porque buscan los shaders por URL en runtime.
 */
export default function Contacto() {
  return (
    <>
      <footer id="contacto">
        <div id="footer-canvas" />
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
      <Script src="/js/wrappedgl.js" strategy="afterInteractive" />
      <Script src="/js/simulator.js" strategy="afterInteractive" />
      <Script src="/js/footer.js" strategy="afterInteractive" />
    </>
  );
}
