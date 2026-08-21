"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNav } from "./PageTransition";

/**
 * <Link> que dispara la transición de página en vez de saltar directo.
 * Mantiene el <a> real (href, prefetch, cmd/ctrl-click, SEO); sólo se
 * intercepta el click normal.
 */
export default function TransitionLink({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof Link>) {
  const navigate = useTransitionNav();

  return (
    <Link
      href={href}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        // dejamos pasar: modificadores (nueva pestaña), botón no primario, o ya cancelado
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        )
          return;
        e.preventDefault();
        navigate(String(href));
      }}
      {...rest}
    />
  );
}
