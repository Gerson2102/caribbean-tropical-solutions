"use client";

import { useEffect, useRef, useState } from "react";
import { animateSectionEntrance } from "@/lib/animations";
import {
  WHATSAPP_URL,
  EMAIL,
  PHONE,
  ADDRESS,
} from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { WhatsAppIcon, MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/Icons";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".contact-animate");
    const tl = animateSectionEntrance(sectionRef.current, items, { stagger: 0.12 });
    return () => { tl?.kill(); };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hola, soy ${formData.nombre}${formData.empresa ? ` de ${formData.empresa}` : ""}. ${formData.mensaje}${formData.telefono ? ` Mi teléfono: ${formData.telefono}` : ""}`;
    window.open(
      `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="noise-overlay relative overflow-hidden bg-deep-green py-20 lg:py-28"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="contact-animate mb-6 text-center">
          <SectionLabel>Contacto</SectionLabel>
        </div>
        <h2 className="contact-animate text-section text-center font-display font-extrabold text-offwhite">
          ¿Listo para Hacer tu Pedido?
        </h2>
        <p className="contact-animate mx-auto mt-4 max-w-xl text-center text-offwhite/50">
          Escribinos por WhatsApp o completá el formulario. Te respondemos en minutos.
        </p>

        {/* Giant WhatsApp CTA */}
        <div className="contact-animate mt-10 flex justify-center">
          <Button
            variant="primary"
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, me gustaría hacer un pedido.")}`}
            icon={<WhatsAppIcon className="h-6 w-6" />}
            className="!px-10 !py-5 !text-lg"
          >
            Escríbenos por WhatsApp
          </Button>
        </div>

        {/* Form + Contact Info */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-animate space-y-5"
          >
            <div>
              <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                required
                value={formData.nombre}
                onChange={(e) => setFormData((d) => ({ ...d, nombre: e.target.value }))}
                className="w-full rounded-xl border border-offwhite/10 bg-offwhite/5 px-4 py-3 text-offwhite placeholder-offwhite/25 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                style={{ transitionProperty: "border-color, box-shadow" }}
                placeholder="Tu nombre completo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="empresa" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                  Empresa
                </label>
                <input
                  type="text"
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData((d) => ({ ...d, empresa: e.target.value }))}
                  className="w-full rounded-xl border border-offwhite/10 bg-offwhite/5 px-4 py-3 text-offwhite placeholder-offwhite/25 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  style={{ transitionProperty: "border-color, box-shadow" }}
                  placeholder="Nombre de empresa"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-offwhite/70">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData((d) => ({ ...d, telefono: e.target.value }))}
                  className="w-full rounded-xl border border-offwhite/10 bg-offwhite/5 px-4 py-3 text-offwhite placeholder-offwhite/25 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  style={{ transitionProperty: "border-color, box-shadow" }}
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
                required
                rows={4}
                value={formData.mensaje}
                onChange={(e) => setFormData((d) => ({ ...d, mensaje: e.target.value }))}
                className="w-full resize-none rounded-xl border border-offwhite/10 bg-offwhite/5 px-4 py-3 text-offwhite placeholder-offwhite/25 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                style={{ transitionProperty: "border-color, box-shadow" }}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <Button variant="primary" type="submit" className="w-full">
              Enviar por WhatsApp
            </Button>
          </form>

          {/* Contact Info */}
          <div className="contact-animate flex flex-col justify-center gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <WhatsAppIcon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-offwhite">WhatsApp</h4>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, necesito información.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-offwhite/50 transition-colors duration-200 hover:text-accent"
                  style={{ transitionProperty: "color" }}
                >
                  {PHONE}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <MailIcon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-offwhite">Email</h4>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-offwhite/50 transition-colors duration-200 hover:text-accent"
                  style={{ transitionProperty: "color" }}
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <PhoneIcon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-offwhite">Teléfono</h4>
                <a
                  href={`tel:+506${PHONE.replace("-", "")}`}
                  className="text-sm text-offwhite/50 transition-colors duration-200 hover:text-accent"
                  style={{ transitionProperty: "color" }}
                >
                  +506 {PHONE}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <MapPinIcon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-offwhite">Ubicación</h4>
                <p className="text-sm text-offwhite/50">{ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
