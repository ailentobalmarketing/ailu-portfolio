"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Transición entre páginas con la View Transitions API. Al clickear un link el
 * navegador saca una foto de la página actual (X), navegamos, y la nueva (Y) se
 * revela con un rectángulo que crece desde el centro por encima de X, que se
 * difumina. Las dos conviven como snapshots durante la transición: eso es lo
 * que la VT resuelve gratis — con navegación normal X se desmonta y no se
 * podría mostrar por afuera.
 *
 * El CSS del efecto vive en globals.css, scopeado con `html[data-vt="page"]`.
 * Sin soporte de VT o con reduced-motion → navegación directa.
 */
const NavCtx = createContext<(href: string) => void>(() => {});
export const useTransitionNav = () => useContext(NavCtx);

type VTDocument = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => {
    finished: Promise<void>;
  };
};

/** Si el pathname nunca cambia (redirect o no-op), resolvemos igual y no cuelga. */
const SAFETY = 2000;

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);
  const resolve = useRef<(() => void) | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || pending.current) return;

      const startVT = (document as VTDocument).startViewTransition?.bind(
        document,
      );
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!startVT || reduce) {
        router.push(href);
        return;
      }

      pending.current = href;
      document.documentElement.setAttribute("data-vt", "page");

      const vt = startVT(
        () =>
          new Promise<void>((res) => {
            resolve.current = res;
            router.push(href); // Y monta async; el efecto de abajo resuelve al cambiar el pathname
            window.setTimeout(() => {
              if (resolve.current === res) {
                resolve.current = null;
                res();
              }
            }, SAFETY);
          }),
      );

      // El flag se saca recién al terminar todo el reveal, para que ambas
      // capturas lo hayan visto.
      vt.finished.finally(() => {
        document.documentElement.removeAttribute("data-vt");
        pending.current = null;
        resolve.current = null;
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    if (pending.current && pathname === pending.current) {
      resolve.current?.();
      resolve.current = null;
    }
  }, [pathname]);

  return <NavCtx.Provider value={navigate}>{children}</NavCtx.Provider>;
}
