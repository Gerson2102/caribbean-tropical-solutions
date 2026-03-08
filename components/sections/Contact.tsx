import {
  WHATSAPP_URL,
  EMAIL,
  PHONE,
  ADDRESS,
} from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/ui/ContactForm";
import { WhatsAppIcon, MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/Icons";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="noise-overlay relative overflow-hidden bg-deep-green py-20 lg:py-28"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <ScrollReveal selector=".contact-animate" stagger={0.12}>
          {/* Header */}
          <div className="contact-animate mb-6 text-center">
            <SectionLabel>Contacto</SectionLabel>
          </div>
          <div className="contact-animate">
            <ScrollTextReveal className="text-section text-center font-display font-extrabold text-offwhite">
              ¿Listo para Hacer tu Pedido?
            </ScrollTextReveal>
          </div>
          <p className="contact-animate mx-auto mt-4 max-w-xl text-center text-offwhite/70">
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
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
            <ContactForm />

            {/* Contact Info */}
            <div className="contact-animate flex flex-col justify-center gap-8">
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, necesito información.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-start gap-4 rounded-xl py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <WhatsAppIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-offwhite">WhatsApp</h4>
                  <span className="text-sm text-offwhite/70 group-hover/link:text-accent transition-colors duration-200">
                    {PHONE}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group/link flex items-start gap-4 rounded-xl py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <MailIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-offwhite">Email</h4>
                  <span className="text-sm text-offwhite/70 group-hover/link:text-accent transition-colors duration-200">
                    {EMAIL}
                  </span>
                </div>
              </a>

              <a
                href={`tel:+506${PHONE.replace("-", "")}`}
                className="group/link flex items-start gap-4 rounded-xl py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <PhoneIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-offwhite">Teléfono</h4>
                  <span className="text-sm text-offwhite/70 group-hover/link:text-accent transition-colors duration-200">
                    +506 {PHONE}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <MapPinIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-offwhite">Ubicación</h4>
                  <p className="text-sm text-offwhite/70">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
