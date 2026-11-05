"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  // Trailing space inside the span is invisible (trimmed by whitespace
  // collapsing — the gap comes from mr) but keeps the extracted text real
  // words: without it, Google and screen readers see "NuestrasLíneas".
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}{" "}
    </motion.span>
  );
}

export default function ScrollTextReveal({
  children,
  className = "",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Fully lit by the time the heading is 60% down the screen: on phones the old 40% end
    // left headings grey while their section was already being read.
    offset: ["start 0.95", "start 0.6"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef}>
      <h2 className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word
              key={`${word}-${i}`}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </h2>
    </div>
  );
}
