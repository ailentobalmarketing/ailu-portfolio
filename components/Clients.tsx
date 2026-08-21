"use client";

import { initClients } from "@/lib/lemon/clients";
import { proyectos } from "@/content/proyectos";
import { useLemonModule } from "./useLemonModule";

/**
 * Marquesina infinita de marcas, dos filas en direcciones opuestas que aceleran
 * con el scroll. Sin logos todavía: cada tile muestra el nombre en Humane.
 */
export default function Clients() {
  useLemonModule(() =>
    initClients(proyectos.map((p) => ({ name: p.nombre, logo: null }))),
  );
  return null;
}
