"use client";

import { useRef } from "react";
import { initSteps } from "@/lib/lemon/team-cards";
import { pasosCards, titulares } from "@/content/ailu";
import { useLemonModule } from "./useLemonModule";

/**
 * Sección pinneada de 5×viewport: el titular gigante paneando a la izquierda
 * mientras las 5 tarjetas del proceso cruzan la pantalla. En mobile el mismo
 * módulo cae a una lista apilada (lo resuelve el CSS + matchMedia).
 */
export default function Steps() {
  const mount = useRef<HTMLElement>(null);

  useLemonModule(() => {
    if (!mount.current) return;
    return initSteps(mount.current, pasosCards, {
      desktop: titulares.pasosDesktop,
      mobile: titulares.pasosMobile,
    });
  });

  return <section id="team-cards" ref={mount} />;
}
