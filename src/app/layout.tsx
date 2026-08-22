import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SiteBackdrop from "@/components/fx/SiteBackdrop";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { site } from "@/data/site";
import { JsonLd, personJsonLd, robotsMeta } from "@/lib/seo";

import "./globals.css";

/** DM Sans para todo el sitio: display y cuerpo, una sola familia. */
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
  display: "swap",
});

/**
 * `viewportFit: "cover"` es la diferencia entre que la página llegue al borde
 * de la pantalla o que Safari rellene la franja de su barra inferior con el
 * color de fondo — el bloque blanco que aparecía en iPhone al abrir y cerrar
 * el menú. Con cover, el contenido pinta por debajo de la barra y lo que se ve
 * detrás del toolbar flotante es el sitio.
 *
 * El precio: hay zonas que quedan tapadas por la barra, así que todo lo que
 * toca el borde de abajo lleva `env(safe-area-inset-bottom)`.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — ${site.rol}`,
    template: `%s — ${site.nombre}`,
  },
  description: site.descripcion,
  authors: [{ name: site.nombre }],
  creator: site.nombre,
  applicationName: site.nombre,
  keywords: [...site.sabeSobre],
  alternates: { canonical: site.url },
  // El interruptor vive en src/data/site.ts (INDEXABLE).
  robots: robotsMeta,
  formatDetection: { telephone: false, address: false, email: false },
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
        <JsonLd data={personJsonLd()} />
        <div className="hidden lg:block">
          <SiteBackdrop />
        </div>
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
