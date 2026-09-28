"use client";

import type { CSSProperties } from "react";
import LiquidEther from "./LiquidEther";

/**
 * Fondo líquido de todo el sitio (LiquidEther de React Bits, WebGL sobre three).
 * Va montado una sola vez en el layout y queda fijo detrás de todo.
 *
 * Tres cosas que no son obvias y que definen cómo está montado:
 *
 * 1. `position: fixed` va por `style` y no por clase. El componente hace
 *    `container.style.position = container.style.position || 'relative'`, que
 *    lee el estilo INLINE: si lo posicionamos con una clase, lo pisa con
 *    `relative` y el fondo se va con el scroll.
 * 2. `pointerEvents: none` no lo deja sordo. Los listeners de mouse/touch se
 *    cuelgan de `window` y filtran por el rect del contenedor, así que el
 *    fluido sigue al cursor sin comerse un solo click del sitio.
 * 3. Las constantes viven acá, en un módulo de cliente, y no en el layout: si
 *    fueran props literales, cada render entregaría un array nuevo, el effect
 *    vería `colors` cambiado y reconstruiría toda la simulación WebGL de cero.
 */
// Gris muy suave a pedido de Ailu (28/09/2026): el #404040 de antes quedaba
// oscuro y le sacaba protagonismo a los trabajos.
const COLORS = ["#e4e4e4", "#e4e4e4"];

/**
 * `100lvh` y no `inset: 0`: en Safari de iPhone la barra de direcciones crece y
 * se achica con el scroll, y con `inset: 0` el contenedor la sigue. Cada vez
 * que cambia de alto el ResizeObserver rehace los FBOs de la simulación — de
 * ahí el parpadeo — y mientras Safari no reacomoda el elemento fijo queda una
 * franja sin canvas abajo.
 *
 * `lvh` es el viewport con la barra colapsada: el alto no cambia nunca, así que
 * no hay resize, no hay parpadeo, y el canvas siempre sobra por abajo.
 */
const STYLE: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100lvh",
  zIndex: -1,
  pointerEvents: "none",
};

export default function SiteBackdrop() {
  return (
    <LiquidEther
      className="site-backdrop"
      style={STYLE}
      colors={COLORS}
      mouseForce={2}
      cursorSize={150}
      isViscous={true}
      viscous={5}
      autoDemo={true}
      autoSpeed={0.6}
      autoIntensity={1.5}
      isBounce={false}
      resolution={0.5}
    />
  );
}
