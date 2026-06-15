"use client";

import { motion } from "framer-motion";
import { CartIcon } from "@/components/ui/Icons";
import { openDrawer, useQuoteCount } from "@/lib/quote-store";

export default function QuoteCartButton({ className = "" }: { className?: string }) {
  const count = useQuoteCount();
  const label =
    count > 0
      ? `Ver cotización (${count} ${count === 1 ? "producto" : "productos"})`
      : "Ver cotización";

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={label}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full text-offwhite transition-colors duration-200 hover:text-accent focus-ring-accent ${className}`}
      style={{ transitionProperty: "color" }}
    >
      <CartIcon className="h-6 w-6" />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          aria-hidden="true"
          className="absolute right-0 top-0 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold leading-none tabular-nums text-charcoal-deep"
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}
