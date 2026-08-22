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
import { useLenis } from "lenis/react";

/**
 * Transición entre páginas con la View Transitions API. Al clickear un link el
 * navegador saca una foto de la página actual (X), navegamos, y la nueva (Y) se
 * destapa de arriba hacia abajo por encima de X, que se difumina. Las dos conviven como snapshots durante la transición: eso es lo
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
  const lenis = useLenis();
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
      /**
       * Arriba de todo y sin animar. Dos motivos:
       *
       * Next hace scroll al tope solo, pero acá el scroll real lo maneja
       * Lenis: el `window.scrollTo` de Next queda pisado en el siguiente
       * frame, cuando Lenis vuelve a escribir SU posición. Hay que moverlo
       * por la API de Lenis para que los dos queden en cero.
       *
       * Y va `immediate`: con scroll suave, entrar a un proyecto desde media
       * grilla se ve como un tirón hacia arriba en vez de una página nueva.
       *
       * Sucede ANTES de resolver la transición, así que la foto que saca el
       * navegador de la página nueva ya sale desde arriba.
       */
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);

      resolve.current?.();
      resolve.current = null;
    }
  }, [pathname, lenis]);

  return <NavCtx.Provider value={navigate}>{children}</NavCtx.Provider>;
}
