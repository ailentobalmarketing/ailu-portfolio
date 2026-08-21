import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { site } from "@/data/site";

import "./globals.css";

/** DM Sans para todo el sitio: display y cuerpo, una sola familia. */
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — ${site.rol}`,
    template: `%s — ${site.nombre}`,
  },
  description: site.descripcion,
  authors: [{ name: site.nombre }],
  // ⚠️ TEMPORAL: ver src/app/robots.ts. Sale cuando entren los proyectos reales.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.nombre,
    title: `${site.nombre} — ${site.rol}`,
    description: site.descripcion,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={dm.variable}>
      <body>
        <SmoothScroll>
          <PageTransition>
            <Nav />
            <main id="top">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
