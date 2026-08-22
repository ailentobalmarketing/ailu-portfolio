"use client";

import { useEffect, useRef } from "react";

/**
 * Una pieza en video dentro del mosaico: arranca sola, en loop y sin sonido.
 *
 * Tres cosas que no son negociables:
 * · `muted` + `playsInline`, o iOS no deja arrancar solo y encima lo abre a
 *   pantalla completa.
 * · El `play()` va por JS y no por el atributo `autoplay`, para poder caer a
 *   los controles si el navegador lo bloquea igual. Un video parado y sin
 *   controles es una pieza que el visitante no puede ver.
 * · Sólo reproduce mientras está en pantalla. Cuatro loops corriendo abajo del
 *   scroll es batería regalada, y en iOS hay un techo de decoders simultáneos.
 *
 * Con reduced-motion no arranca solo: se muestran los controles y decide quien
 * mira. Son piezas de 15 a 33 segundos, muy por encima del umbral donde algo
 * que se mueve solo tiene que poder frenarse.
 */
export default function VideoPieza({
  src,
  poster,
  w,
  h,
  alt,
}: {
  src: string;
  poster?: string;
  w: number;
  h: number;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.controls = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        el.play().catch(() => {
          el.controls = true;
        });
      },
      { rootMargin: "150px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={w}
      height={h}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className="w-full"
    />
  );
}
