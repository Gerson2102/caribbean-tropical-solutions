import Link from "next/link";

export default function NotFound() {
  return (
    <div className="noise-overlay relative flex min-h-screen flex-col items-center justify-center bg-deep-green px-6 text-center">
      <p
        className="font-display text-[clamp(6rem,20vw,12rem)] font-extrabold leading-none text-accent/20"
        aria-hidden="true"
      >
        404
      </p>

      <h1 className="-mt-6 mb-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-offwhite">
        Página no encontrada
      </h1>

      <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-offwhite/60">
        Lo sentimos, la página que buscás no existe o fue movida.
      </p>

      <Link
        href="/"
        className="btn-shine inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-transparent bg-accent px-7 py-3.5 font-display text-sm font-semibold text-charcoal-deep shadow-[var(--shadow-cta)] hover:bg-accent-light hover:shadow-[var(--shadow-cta-hover)] focus-ring-accent"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
