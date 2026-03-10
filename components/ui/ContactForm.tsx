"use client";

import { useRef, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const nombreRef = useRef<HTMLInputElement>(null);
  const empresaRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const nombre = nombreRef.current?.value || "";
    const empresa = empresaRef.current?.value || "";
    const telefono = telefonoRef.current?.value || "";
    const mensaje = mensajeRef.current?.value || "";
    const msg = `Hola, soy ${nombre}${empresa ? ` de ${empresa}` : ""}. ${mensaje}${telefono ? ` Mi teléfono: ${telefono}` : ""}`;
    setTimeout(() => {
      window.open(
        `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
      setSubmitting(false);
    }, 400);
  }

  const inputClass =
    "w-full rounded-xl border border-offwhite/20 bg-offwhite/[0.08] px-4 py-3 text-offwhite placeholder-offwhite/25 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green";

  return (
    <form onSubmit={handleSubmit} className="contact-animate space-y-5">
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-offwhite/70">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          autoComplete="name"
          required
          ref={nombreRef}
          className={inputClass}
          placeholder="Tu nombre completo…"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="empresa" className="mb-1.5 block text-sm font-medium text-offwhite/70">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            autoComplete="organization"
            ref={empresaRef}
            className={inputClass}
            placeholder="Nombre de empresa…"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-offwhite/70">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            autoComplete="tel"
            ref={telefonoRef}
            className={inputClass}
            placeholder="8888-8888"
          />
        </div>
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-offwhite/70">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          ref={mensajeRef}
          className="w-full resize-none rounded-xl border border-offwhite/20 bg-offwhite/[0.08] px-4 py-3 text-offwhite placeholder-offwhite/25 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
          placeholder="¿En qué podemos ayudarte?…"
        />
      </div>
      <Button variant="primary" type="submit" className="w-full">
        {submitting ? "Abriendo WhatsApp..." : "Enviar por WhatsApp"}
      </Button>
    </form>
  );
}
