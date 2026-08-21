import HeroTilt from "@/components/HeroTilt";
import { titulares } from "@/content/ailu";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-header">
          <h1
            data-animate-variant="slide-words"
            data-animate-on-scroll="false"
            data-animate-delay="0.8"
            data-animate-stagger="0.1"
          >
            {titulares.homeHero}
          </h1>
        </div>
        <div className="hero-footer">
          <div className="hero-footer-col">
            {titulares.homeFooterIzq.map((t, i) => (
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
              {titulares.homeFooterDer}
            </p>
          </div>
        </div>
      </section>
      <HeroTilt />
    </>
  );
}
