"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { PRELOADER_SEEN_KEY } from "@/lib/preloader-state";
import { perfil, tags } from "@/content/ailu";

gsap.registerPlugin(CustomEase, SplitText);

const START_DELAY_S = 1;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const nodes = scope.querySelectorAll<HTMLElement>(
      ".preloader, .split-overlay, .tags-overlay",
    );
    const hide = () => nodes.forEach((n) => (n.style.display = "none"));

    if (sessionStorage.getItem(PRELOADER_SEEN_KEY) === "true") {
      hide();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      CustomEase.create("hop", ".8, 0, .3, 1");

      const titles = scope.querySelectorAll(
        ".preloader h1, .split-overlay h1, .tags-overlay p",
      );
      gsap.set(titles, { opacity: 0 });

      // Cada char se envuelve en un span propio: el .char recorta y el span
      // interno es el que sube. Sin ese par no hay máscara.
      scope.querySelectorAll(".intro-title h1").forEach((el) => {
        const split = new SplitText(el, {
          type: "words, chars",
          wordsClass: "word",
          charsClass: "char",
        });
        split.chars.forEach((char) => {
          char.innerHTML = `<span>${char.textContent}</span>`;
        });
      });
      scope.querySelectorAll(".tag p").forEach((el) => {
        new SplitText(el, { type: "words", wordsClass: "word" });
      });

      gsap.set(
        scope.querySelectorAll(".split-overlay .intro-title .char span"),
        {
          y: "0%",
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "hop" },
        delay: START_DELAY_S,
        onComplete: () => {
          sessionStorage.setItem(PRELOADER_SEEN_KEY, "true");
          document.documentElement.style.overflow = "";
          hide();
        },
      });

      const reveal = () =>
        gsap.delayedCall(START_DELAY_S, () => gsap.set(titles, { opacity: 1 }));
      if (document.fonts?.ready) {
        document.fonts.ready.then(reveal).catch(reveal);
      } else {
        reveal();
      }

      const tagEls = gsap.utils.toArray<HTMLElement>(
        scope.querySelectorAll(".tag"),
      );

      tagEls.forEach((tag, i) => {
        tl.to(
          tag.querySelectorAll("p .word"),
          { y: "0%", duration: 0.75 },
          0.5 + i * 0.1,
        );
      });

      tl.to(
        scope.querySelectorAll(".preloader .intro-title .char span"),
        { y: "0%", duration: 0.75, stagger: 0.05 },
        0.5,
      ).to(
        scope.querySelectorAll(".split-overlay .intro-title .char span"),
        { y: "0%", duration: 0.75, stagger: 0.05 },
        0.5,
      );

      tagEls.forEach((tag, i) => {
        tl.to(
          tag.querySelectorAll("p .word"),
          { y: "110%", duration: 0.75 },
          2 + i * 0.1,
        );
      });

      // El telón se parte al medio y las dos mitades se van para afuera.
      tl.set(
        scope.querySelectorAll(".preloader, .split-overlay"),
        {
          clipPath: (i: number) =>
            i === 0
              ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
              : "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
        },
        2.5,
      ).to(
        scope.querySelectorAll(".preloader, .split-overlay"),
        { y: (i: number) => (i === 0 ? "-50%" : "50%"), duration: 1 },
        2.5,
      );
    }, scope);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true">
      <div className="preloader">
        <div className="intro-title">
          <h1>{perfil.nombre}</h1>
        </div>
      </div>

      <div className="split-overlay">
        <div className="intro-title">
          <h1>{perfil.nombre}</h1>
        </div>
      </div>

      <div className="tags-overlay">
        {tags.map((tag, i) => (
          <div className={`tag tag-${i + 1}`} key={tag}>
            <p>{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
