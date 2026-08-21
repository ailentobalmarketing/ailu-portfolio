import type { Metadata } from "next";
import WorkCarousel from "@/components/WorkCarousel";

export const metadata: Metadata = { title: "Trabajos" };

export default function Trabajos() {
  return <WorkCarousel />;
}
