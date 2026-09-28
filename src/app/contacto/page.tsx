import Reveal from "@/components/layout/Reveal";
import { site } from "@/data/site";
import { meta } from "@/lib/seo";

export const metadata = meta({
  title: "Contacto",
  description:
    "Escribime por mail, WhatsApp o LinkedIn. Estrategia, contenido y campañas de Meta Ads para marcas de Argentina.",
  path: "/contacto",
});

const canales = [
  { label: "Mail", valor: site.email, href: `mailto:${site.email}` },
  {
    label: "WhatsApp",
    valor: site.telefono,
    href: site.whatsapp,
    externo: true,
  },
  {
    label: "LinkedIn",
    valor: "linkedin.com/in/ailén-tobal",
    href: site.linkedin,
    externo: true,
  },
  { label: "Base", valor: site.ubicacion },
];

/** Contacto: un titular, los canales y nada más. */
export default function Contacto() {
  return (
    <section className="u-shell pt-[clamp(3rem,2rem+6vw,7rem)] pb-[clamp(2rem,1rem+4vw,5rem)] text-center">
      <Reveal as="h1" className="u-measure mx-auto text-step-3">
        Contame qué necesita tu marca.
      </Reveal>

      <Reveal as="p" delay={0.08}>
        <span className="u-measure mx-auto mt-8 block text-step-0 text-ink/80">
          Escribime por donde te quede más cómodo. Si me contás en qué está la
          marca hoy y a dónde querés llegar, te respondo con una idea de por
          dónde empezaría.
        </span>
      </Reveal>

      <dl className="mx-auto mt-[clamp(3rem,2rem+4vw,6rem)] max-w-xl border-t border-line">
        {canales.map((c, i) => (
          <Reveal key={c.label} delay={0.05 * i}>
            <div className="flex flex-col items-center gap-2 border-b border-line py-5">
              <dt className="u-eyebrow">{c.label}</dt>
              <dd className="text-step-1 tracking-[-0.02em]">
                {c.href ? (
                  <a
                    href={c.href}
                    className="u-link"
                    {...(c.externo
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {c.valor}
                  </a>
                ) : (
                  c.valor
                )}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
