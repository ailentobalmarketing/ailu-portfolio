import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Humane — display ultra-condensada (Rajesh Rajput). Libre para uso personal
 * y comercial. Se usa en pesos livianos (200/300); en bold es la cara del
 * brutalismo y acá no la queremos.
 */
export const humane = localFont({
  src: [
    { path: "./fonts/humane/humane-thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/humane/humane-extralight.woff2", weight: "200", style: "normal" },
    { path: "./fonts/humane/humane-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/humane/humane-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/humane/humane-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/humane/humane-semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/humane/humane-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--f-h",
  display: "swap",
  // Humane es condensadísima: sin ajuste, el fallback reserva el doble de ancho
  // y el título salta al cargar.
  adjustFontFallback: "Arial",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

/** DM Mono — micro-tipografía de esquina y numeración. OFL. */
export const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono/dm-mono-light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/dm-mono/dm-mono-regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/dm-mono/dm-mono-medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--f-m",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

/**
 * Inter — texto. Reemplaza a Neue Montreal, que traía la plantilla original:
 * es de Pangram Pangram (paga) y los .ttf del pack eran piratas.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--f-nm",
  display: "swap",
});
