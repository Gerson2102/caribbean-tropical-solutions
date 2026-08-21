"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { handleSectionLinkClick } from "@/lib/smooth-scroll";

interface ButtonProps {
  variant?: "primary" | "outline";
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  href,
  children,
  icon,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold font-display cursor-pointer select-none";

  const variantStyles = isPrimary
    ? "bg-accent text-charcoal-deep border-2 border-transparent btn-shine shadow-[var(--shadow-cta)] hover:shadow-[var(--shadow-cta-hover)] hover:bg-accent-light focus-ring-accent"
    : "border-2 border-offwhite/50 text-offwhite bg-offwhite/5 hover:border-accent hover:text-accent hover:bg-accent/5 focus-ring-accent";

  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={(e) => {
          if (href.startsWith("#")) handleSectionLinkClick(e, href);
        }}
        className={combinedClasses}
        {...motionProps}
      >
        {icon && <span className="w-5 h-5 shrink-0">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      {...motionProps}
    >
      {icon && <span className="w-5 h-5 shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
