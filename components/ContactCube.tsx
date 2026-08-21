"use client";

import { useEffect } from "react";

/**
 * Cubo de alambre con bolitas rebotando adentro, de la página de contacto.
 *
 * Se importa dinámicamente porque el módulo original toca el DOM en el cuerpo
 * (no dentro de una función), así que en SSR revienta con "document is not
 * defined". De paso, three queda fuera del bundle de las demás páginas.
 */
export default function ContactCube() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("@/lib/lemon/contact").then(({ initContactCube }) => {
      if (!cancelled) cleanup = initContactCube();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
