import type { Metadata } from "next";
import { humane, dmMono, inter } from "./fonts";
import { perfil } from "@/content/ailu";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";

import "./globals.css";
import "./nav.css";
import "./preloader.css";
import "./site.css";

const url = "https://ailentobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${perfil.nombre} — ${perfil.rol}`,
    template: `%s — ${perfil.nombre}`,
  },
  description: perfil.descripcion,
  authors: [{ name: perfil.nombre }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url,
    siteName: perfil.nombre,
    title: `${perfil.nombre} — ${perfil.rol}`,
    description: perfil.descripcion,
  },
  twitter: {
    card: "summary_large_image",
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
