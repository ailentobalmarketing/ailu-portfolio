"use client";

import { initHomeHero } from "@/lib/lemon/home-hero";
import { useLemonModule } from "./useLemonModule";

/** Inclina el titular del hero siguiendo al cursor. */
export default function HeroTilt() {
  useLemonModule(() => initHomeHero());
  return null;
}
