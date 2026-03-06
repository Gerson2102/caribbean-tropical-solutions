"use client";

import { useState, useEffect } from "react";
import { WhatsAppIcon } from "./icons";

const WHATSAPP_URL =
  "https://wa.me/50671035467?text=Hola,%20me%20gustaría%20obtener%20más%20información";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
      style={{
        background: "#25D366",
        color: "#ffffff",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.5)",
        transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: visible ? "auto" : "none",
        animation: visible ? "pulse-glow 2s cubic-bezier(0.4,0,0.2,1) infinite" : "none",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
