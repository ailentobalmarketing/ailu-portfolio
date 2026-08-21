import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Junta clases y resuelve conflictos de Tailwind (la última gana). */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
