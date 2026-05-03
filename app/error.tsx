"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="noise-overlay relative flex min-h-screen flex-col items-center justify-center bg-deep-green px-6 text-center">
      <p
        className="font-display text-[clamp(4rem,15vw,8rem)] font-extrabold leading-none text-accent/20"
        aria-hidden="true"
      >
        Error
      </p>

      <h1 className="-mt-4 mb-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-offwhite">
        Algo salió mal
      </h1>

      <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-offwhite/60">
        Lo sentimos, ocurrió un error inesperado. Podés intentar de nuevo o
        volver al inicio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="btn-shine inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-transparent bg-accent px-7 py-3.5 font-display text-sm font-semibold text-charcoal-deep shadow-[var(--shadow-cta)] hover:bg-accent-light hover:shadow-[var(--shadow-cta-hover)] focus-ring-accent"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border-2 border-offwhite/30 px-7 py-3.5 font-display text-sm font-semibold text-offwhite hover:border-accent hover:text-accent focus-ring-accent"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
