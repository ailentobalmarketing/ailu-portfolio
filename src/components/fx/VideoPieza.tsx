"use client";

import { useEffect, useRef, useState } from "react";

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
 *
 * Con `sonido`, un botón deja activar el audio. Es para los videos donde la
 * voz ES la pieza (UGC, alguien hablando a cámara): arrancan mudos igual,
 * porque ningún navegador deja arrancar solo un video con sonido.
 */
export default function VideoPieza({
  src,
  poster,
  w,
  h,
  alt,
  sonido = false,
}: {
  src: string;
  poster?: string;
  w: number;
  h: number;
  alt: string;
  sonido?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mudo, setMudo] = useState(true);

  const alternarSonido = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !mudo;
    setMudo(!mudo);
    // Si estaba parado (reduced-motion o autoplay bloqueado), activar el
    // sonido es pedir verlo: arranca.
    if (mudo && el.paused) el.play().catch(() => {});
  };

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

  const video = (
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

  if (!sonido) return video;

  return (
    <div className="relative">
      {video}
      <button
        type="button"
        onClick={alternarSonido}
        aria-pressed={!mudo}
        className="absolute bottom-2 right-2 rounded-full bg-ink/75 px-3 py-1.5 text-[length:var(--step--1)] leading-none text-paper backdrop-blur-sm transition-colors hover:bg-ink"
      >
        {mudo ? "Activar sonido" : "Silenciar"}
      </button>
    </div>
  );
}
