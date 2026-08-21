"use client";

import { initStudioHero } from "@/lib/lemon/studio-hero";
import { useLemonModule } from "./useLemonModule";

/** Pinea el hero de /perfil: la imagen se endereza y se abre a pantalla completa
 *  mientras las dos palabras se separan hacia los costados. */
export default function StudioHero() {
  useLemonModule(() => initStudioHero());
  return null;
}
