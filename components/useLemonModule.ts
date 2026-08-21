"use client";

import { useEffect } from "react";

/**
 * Monta uno de los módulos portados de Lemon Bureau.
 *
 * Todos construyen DOM y timelines de forma imperativa y devuelven su limpieza.
 * Se corren después de `document.fonts.ready` porque varios miden texto
 * (SplitText, el ancho del header pinneado) y con Humane —que es
 * condensadísima— medir con la fuente de fallback da un error enorme.
 */
export function useLemonModule(
  init: () => (() => void) | void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    let cleanup: (() => void) | void;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      cleanup = init();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
