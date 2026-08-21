import type { Metadata } from "next";
import { humane, dmMono, inter } from "./fonts";
import { perfil } from "@/content/ailu";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";

import "./globals.css";
import "./preloader.css";
import "./nav.css";
import "./home.css";
import "./studio.css";
import "./work.css";
import "./project.css";
import "./footer.css";
import "./contact.css";
import "./extra.css";

const url = "https://ailentobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${perfil.nombre} — ${perfil.rol}`,
    template: `%s — ${perfil.nombre}`,
  },
  description: perfil.descripcion,
  authors: [{ name: perfil.nombre }],
  // ⚠️ TEMPORAL: ver app/robots.ts. El robots.txt no alcanza si alguien linkea
  // el sitio; el meta sí lo saca del índice.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url,
    siteName: perfil.nombre,
    title: `${perfil.nombre} — ${perfil.rol}`,
    description: perfil.descripcion,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${humane.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body>
        <Preloader />
        <Nav />
        {children}
        <Motion />
      </body>
    </html>
  );
}
