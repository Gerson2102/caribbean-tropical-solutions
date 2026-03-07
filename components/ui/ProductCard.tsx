"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Product, WHATSAPP_URL } from "@/lib/constants";

export default function ProductCard({ product }: { product: Product }) {
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)}`;

  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-charcoal/[0.06] bg-[#f7f6f3] transition-shadow duration-300 hover:shadow-lg"
      style={{ boxShadow: "var(--shadow-card)", transitionProperty: "box-shadow" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Warm background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f6f3] via-[#f2f0eb] to-[#eae7e0]" />

        <motion.div
          className="relative h-full w-full"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.03, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
          }}
        >
          <Image
            src={product.image}
            alt={product.altText}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-display text-[13px] font-semibold text-charcoal-deep leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.price ? (
          <p className="mt-1 text-xs font-bold text-accent-dark">{product.price}</p>
        ) : (
          <p className="mt-1 text-[11px] text-charcoal-light">{product.brand}</p>
        )}
      </div>
    </motion.a>
  );
}
