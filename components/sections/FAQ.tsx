"use client";

import { useId, useState, type ReactNode } from "react";
import { FAQS, WHATSAPP_URL, WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import ScrollTextReveal from "@/components/ui/ScrollTextReveal";
import Button from "@/components/ui/Button";
import { ChevronDownIcon, WhatsAppIcon } from "@/components/ui/Icons";

const ASK_URL = `${WHATSAPP_URL}?text=${encodeURIComponent("Hola, tengo una pregunta.")}`;

// Unfolds to the answer's natural height (grid rows 0fr → 1fr) on the Lenis
// expo-out curve. ~1s matches Lenis' lerp 0.1 (half the distance in ~110ms,
// settled by ~700ms); closing is quicker. Answers stay in the HTML for crawlers.
function Collapse({ open, id, labelledBy, children }: { open: boolean; id: string; labelledBy: string; children: ReactNode }) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={`grid transition-[grid-template-rows] ease-out-expo motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] duration-[1000ms]" : "grid-rows-[0fr] duration-[700ms]"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`transition-[opacity,transform] ease-out-expo motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100 delay-75 duration-[1000ms]" : "-translate-y-2 opacity-0 duration-300"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Each "WhatsApp" in an answer links straight to the chat; FAQS stays plain
// text so the JSON-LD and /llms.txt read cleanly.
function linkWhatsApp(text: string) {
  return text.split(/(WhatsApp)/).map((part, i) =>
    part === "WhatsApp" ? (
      <a
        key={i}
        href={WHATSAPP_URL_WITH_MESSAGE}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring-accent rounded-sm font-semibold whitespace-nowrap text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:text-accent-light hover:decoration-accent-light active:opacity-80"
      >
        <WhatsAppIcon aria-hidden="true" className="mr-1 inline h-[1em] w-[1em] -translate-y-px" />
        WhatsApp
      </a>
    ) : (
      part
    )
  );
}

function AskCta() {
  return (
    <div>
      <p className="font-display text-sm font-bold text-offwhite">¿No encontrás tu pregunta?</p>
      <div className="mt-4">
        <Button href={ASK_URL} icon={<WhatsAppIcon className="h-5 w-5" />}>
          Preguntanos por WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="preguntas-frecuentes" className="noise-overlay relative bg-charcoal-deep py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
            // Answers embed CMS values: escape "<" so none can close the <script> tag.
          }).replace(/</g, "\\u003c"),
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-8">
        {/* Heading column stays pinned while the questions scroll past */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ScrollTextReveal className="text-section font-display font-extrabold tracking-[-0.03em] text-offwhite">
            Preguntas Frecuentes
          </ScrollTextReveal>
          <p className="mt-5 max-w-md text-base leading-relaxed text-offwhite/70 lg:text-lg">
            Lo que más nos consultan antes de cotizar: envíos, precios, productos y marcas.
          </p>
          <div className="mt-10 hidden lg:block">
            <AskCta />
          </div>
        </div>

        <div>
          {/* One answer open at a time */}
          <div className="space-y-2">
            {FAQS.map((f, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={f.question}
                  className={`rounded-2xl transition-colors duration-500 ${open ? "bg-offwhite/[0.06]" : "hover:bg-offwhite/[0.03]"}`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`${id}-q${i}`}
                      aria-expanded={open}
                      aria-controls={`${id}-a${i}`}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="focus-ring-accent flex w-full cursor-pointer items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left font-display text-base font-bold text-offwhite active:bg-offwhite/[0.04] sm:px-7 sm:py-6 sm:text-xl"
                    >
                      {f.question}
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                          open ? "bg-accent text-charcoal-deep" : "bg-accent/15 text-accent"
                        }`}
                      >
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform duration-[1000ms] ease-out-expo motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                  </h3>
                  <Collapse open={open} id={`${id}-a${i}`} labelledBy={`${id}-q${i}`}>
                    <p className="max-w-[60ch] px-5 pb-6 text-base leading-relaxed text-offwhite/75 sm:px-7 sm:pb-7 sm:text-lg">
                      {linkWhatsApp(f.answer)}
                    </p>
                  </Collapse>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center lg:hidden">
            <AskCta />
          </div>
        </div>
      </div>
    </section>
  );
}
