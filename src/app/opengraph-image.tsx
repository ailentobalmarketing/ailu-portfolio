import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.nombre} — ${site.rol}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Tarjeta que se ve al compartir el link (WhatsApp, LinkedIn, Slack). Se genera
 * en build con la misma paleta del sitio: sin un archivo que mantener y sin
 * depender de que alguien acuerde una foto.
 *
 * DM Sans no se puede usar acá sin cargar el .ttf a mano; el peso visual lo da
 * el tamaño y el encuadre, no la familia.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#0a0a0a",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#8a8a8a",
        }}
      >
        Portfolio
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 104, letterSpacing: -3, lineHeight: 1 }}>
          {site.nombre}
        </div>
        <div style={{ fontSize: 36, color: "#8a8a8a" }}>{site.rol}</div>
      </div>

      <div style={{ display: "flex", fontSize: 24, color: "#8a8a8a" }}>
        {site.url.replace("https://", "")}
      </div>
    </div>,
    size,
  );
}
