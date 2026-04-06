"use client";

import React from "react";
import { motion } from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function WorkHero() {
  return (
    <section className="relative flex items-end px-4 md:px-6 pt-4 pb-4" style={{ height: "100svh" }}>
      {/* Floating black container — mirrors homepage hero card, black instead of gradient */}
      <div className="relative w-full h-[92vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-[#0A0A0A] border border-white/10 flex flex-col justify-end pb-16 px-8 md:px-16">

        {/* Top-left label */}
        <div className="absolute top-8 left-8 md:left-16 z-10 flex items-center gap-4">
          <div className="w-8 h-[1px] bg-white/40" />
          <span className="section-label font-mono">SYSTEM_PROTOCOL_001</span>
        </div>

        {/* Top-right corner bracket */}
        <svg
          className="absolute top-6 right-6 z-10"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <polyline
            points="0,40 0,0 40,0"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Headline */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
        >
          <h1
            className="font-headline font-black uppercase text-white leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
          >
            WE DON&apos;T BUILD,
            <br />
            WE BENCHMARK<span style={accentStyle}>.</span>
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute right-6 bottom-24 z-10 hidden md:flex flex-col items-center gap-2">
          <span
            className="font-mono text-[10px] tracking-widest text-white/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            SCROLL
          </span>
          <div className="w-[1px] h-12 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
