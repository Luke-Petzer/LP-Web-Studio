"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function WorkScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.p
          className="font-headline font-black uppercase text-white text-center leading-tight max-w-5xl mx-auto px-8"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)",
            opacity,
            y,
          }}
        >
          ENGINEERING AT THE THRESHOLD OF HARDWARE LIMITATION
          <span style={accentStyle}>.</span>
        </motion.p>
      </div>
    </div>
  );
}
