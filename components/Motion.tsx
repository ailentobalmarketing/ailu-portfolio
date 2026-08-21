"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { PRELOADER_SEEN_KEY } from "@/lib/preloader-state";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Cuánto esperan los elementos del hero cuando el preloader está corriendo. */
const PRELOADER_HERO_DELAY_S = 3.25;

function splitTypeFor(el: Element): "words" | "lines" {
  const variant = (el.getAttribute("data-animate-variant") || "").trim();
  if (variant === "slide-words") return "words";
  if (variant === "slide-lines") return "lines";
  return (el.getAttribute("data-animate-split") || "").trim() === "words"
    ? "words"
    : "lines";
}

function animateElement(
  el: HTMLElement,
  opts: { preloaderShowing: boolean; hero: Element | null },
) {
  const onScroll = el.getAttribute("data-animate-on-scroll") === "true";

  let delay = parseFloat(el.getAttribute("data-animate-delay") || "") || 0;
  if (opts.preloaderShowing && !onScroll && opts.hero?.contains(el)) {
    delay += PRELOADER_HERO_DELAY_S;
  }

  const duration =
    parseFloat(el.getAttribute("data-animate-duration") || "") || 0.75;
  const stagger =
    parseFloat(el.getAttribute("data-animate-stagger") || "") || 0.1;
  const start = (el.getAttribute("data-animate-start") || "top 70%").trim();
  const type = splitTypeFor(el);

  SplitText.create(el, {
    type,
    mask: type,
    autoSplit: true,
    linesClass: "line",
    wordsClass: "word",
    onSplit(self) {
      const targets = type === "words" ? self.words : self.lines;
      gsap.set(targets, { yPercent: 100 });

      const animation = gsap.to(targets, {
        yPercent: 0,
        duration,
        ease: "power3.out",
        delay,
        stagger,
        paused: onScroll,
      });

      if (onScroll) {
        ScrollTrigger.create({
          trigger: el,
          start,
          animation,
          toggleActions: "play none none none",
        });
      }

      return animation;
    },
  });
}

/**
 * Scroll suave (Lenis) + los reveals declarativos por `data-animate-variant`.
 *
 * Van juntos a propósito: Lenis tiene que estar manejando el rAF **antes** de
 * que se creen los ScrollTrigger, o los triggers miden contra un scroll que ya
 * no es el del navegador y los reveals no disparan nunca. Separarlos en dos
 * componentes deja ese orden librado a en qué orden React corre los efectos.
 */
export default function Motion() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 1000;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      lerp: isMobile ? 0.075 : 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: isMobile ? 1.5 : 2,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    if (process.env.NODE_ENV === "development") {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {});

    const scan = () => {
      const preloaderShowing =
        !!document.querySelector(".preloader") &&
        sessionStorage.getItem(PRELOADER_SEEN_KEY) !== "true";
      const hero = document.querySelector(".hero");

      ctx.add(() => {
        document
          .querySelectorAll<HTMLElement>("[data-animate-variant]")
          .forEach((el) => {
            const variant = el.getAttribute("data-animate-variant");
            if (
              variant === "slide" ||
              variant === "slide-lines" ||
              variant === "slide-words"
            ) {
              animateElement(el, { preloaderShowing, hero });
            }
          });
      });

      ScrollTrigger.refresh();
    };

    // SplitText mide texto. Si parte antes de que cargue la fuente real, usa
    // las métricas del fallback y las líneas quedan cortadas — con Humane, que
    // es condensadísima, el error es enorme. Por eso se espera a fonts.ready.
    let cancelled = false;
    const run = () => {
      if (!cancelled) scan();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      ctx.revert();
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
