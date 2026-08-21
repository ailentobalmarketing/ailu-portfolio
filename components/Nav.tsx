"use client";

import { initNav } from "@/lib/lemon/nav";
import { menuCopy, menuLinks, perfil } from "@/content/ailu";
import { useLemonModule } from "./useLemonModule";

/**
 * La barra fija. El overlay del menú —con el rail horizontal de links, el
 * highlighter que sigue al cursor y las columnas de contacto— lo construye
 * `lib/lemon/nav.js`, que es el módulo original de Lemon Bureau.
 */
export default function Nav() {
  useLemonModule(() => initNav({ items: menuLinks, copy: menuCopy }));

  return (
    <nav>
      <div className="nav-logo">
        <a href="/">
          <span className="nav-wordmark">{perfil.nombre}</span>
        </a>
      </div>
      <div className="nav-icon">
        <span className="nav-mark" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="nav-toggler">
        <p>Menu</p>
      </div>
    </nav>
  );
}
