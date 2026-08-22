import { site } from "@/data/site";

/** Cierre en tinta: contacto directo y el año. Nada más. */
export default function Footer() {
  return (
    <footer className="mt-[var(--section-y)] bg-ink text-paper">
      <div className="u-shell flex flex-col gap-8 pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))] md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="u-eyebrow text-paper/50">Escribime</span>
          <a
            href={`mailto:${site.email}`}
            className="u-link text-step-1 tracking-[-0.02em]"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="u-link text-step-0"
          >
            {site.telefono}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="u-link text-step-0"
          >
            LinkedIn
          </a>
          <p className="mt-4 text-[length:var(--step--1)] text-paper/50">
            © {new Date().getFullYear()} {site.nombre}
          </p>
          {/* Firma del estudio, igual que en trafull.com. Va `noopener` y NO
              `noreferrer` como los otros links de acá: es el único que interesa
              que llegue a rstudios.ar con el referrer puesto, para que el
              tráfico se pueda atribuir. */}
          <a
            href="https://rstudios.ar"
            target="_blank"
            rel="noopener"
            className="u-link text-[length:var(--step--1)] text-paper/50 transition-colors duration-500 ease-[var(--ease-soft)] hover:text-paper"
          >
            Hecho con ❤️ por R Studios
          </a>
        </div>
      </div>
    </footer>
  );
}
