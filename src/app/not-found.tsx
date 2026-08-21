import Link from "next/link";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <section className="u-shell flex min-h-[60svh] flex-col justify-center gap-6">
      <h1 className="text-step-3">Esta página no existe.</h1>
      <p className="u-measure text-ink/80">
        Puede que el link esté mal escrito o que la página haya cambiado de
        lugar.
      </p>
      <Link href="/" className="u-link u-eyebrow w-max text-ink">
        Volver al inicio
      </Link>
    </section>
  );
}
