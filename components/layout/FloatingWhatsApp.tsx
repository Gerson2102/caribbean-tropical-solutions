"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_URL_WITH_MESSAGE } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastThreshold = false;
    let contactVisible = false;

    // Observer for the 400px scroll threshold
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:400px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.appendChild(sentinel);
    const thresholdObserver = new IntersectionObserver(
      ([entry]) => {
        pastThreshold = !entry.isIntersecting;
        setVisible(pastThreshold && !contactVisible);
      },
      { threshold: 1 }
    );
    thresholdObserver.observe(sentinel);

    // Observer for contact section
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        contactVisible = entry.isIntersecting;
        setVisible(pastThreshold && !contactVisible);
      },
      { threshold: 0.3 }
    );
    const contactEl = document.getElementById("contacto");
    if (contactEl) contactObserver.observe(contactEl);

    return () => {
      thresholdObserver.disconnect();
      contactObserver.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="whatsapp-float"
          href={WHATSAPP_URL_WITH_MESSAGE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg animate-pulse-glow md:h-14 md:w-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
