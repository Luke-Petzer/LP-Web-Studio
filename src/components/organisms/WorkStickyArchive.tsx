// src/components/organisms/WorkStickyArchive.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  type Variants,
} from "framer-motion";

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

// Canvas slides up from below — no opacity, solid block
const canvasVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: "circOut" },
  },
  exit: {
    y: 0,
    // Stays stationary for 0.55s — new canvas slides over it
    transition: { duration: 0.55 },
  },
};

// Inner content settles after the canvas lands
const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.35 },
  },
  exit: {},
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {},
};

type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  score: string;
  stack: string[];
  siteUrl: string;
  videoSrc: string;
};

const projects: Project[] = [
  {
    id: "nova-studio",
    index: "001",
    title: "Nova Studio",
    category: "Agency Demo",
    description:
      "Premium visual experience engineered without sacrificing technical SEO. Tailwind v4 with optimised Next.js image components and CSS-native masking.",
    score: "91",
    stack: ["Next.js 15", "Tailwind v4", "Vercel"],
    siteUrl: "#",
    videoSrc: "/videos/nova-studio.mp4",
  },
  {
    id: "cafe-crave",
    index: "002",
    title: "Cafe Crave",
    category: "Hospitality",
    description:
      "Real-time ordering engine built to bypass delivery apps and own customer data directly. Engineered for sub-100ms latency in retail environments.",
    score: "93",
    stack: ["Next.js", "Tailwind", "Railway"],
    siteUrl: "#",
    videoSrc: "/videos/CafeCrave.mp4",
  },
  {
    id: "big-six",
    index: "003",
    title: "The Big Six",
    category: "Branding",
    description:
      "Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
    score: "95",
    stack: ["React", "Tailwind CSS", "Vercel"],
    siteUrl: "#",
    videoSrc: "/videos/BigSix.mp4",
  },
];

export function WorkStickyArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActiveIndex(0);
    else if (v < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const active = projects[activeIndex];

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport — centers the floating canvas */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* ── Guillotine Stack: entire canvas is the animating unit ── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            variants={canvasVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-[95%] max-w-7xl rounded-xl bg-[#0C0C0C] border border-white/10 overflow-hidden"
            style={{
              height: "85vh",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* ── Content stagger wrapper ── */}
            <motion.div
              variants={contentVariants}
              className="flex flex-col md:flex-row h-full"
            >

              {/* ── Left column (35%) ── */}
              <div className="w-full md:w-[35%] h-[55%] md:h-full flex flex-col justify-center px-8 md:px-12 py-8 md:py-16 md:border-r border-white/5 overflow-y-auto">

                {/* Static section label — outside stagger */}
                <span className="section-label font-mono">PORTFOLIO.SYS</span>

                {/* Project ID */}
                <motion.span
                  variants={itemVariants}
                  className="font-mono text-xs tracking-widest mt-8"
                  style={accentStyle}
                >
                  //:.ID:.{active.index}
                </motion.span>

                {/* Title */}
                <motion.h2
                  variants={itemVariants}
                  className="font-headline font-black uppercase text-white leading-none mt-4"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
                >
                  {active.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-white/60 text-sm leading-relaxed mt-6 max-w-sm"
                >
                  {active.description}
                </motion.p>

                {/* Performance metric */}
                <motion.div variants={itemVariants} className="mt-8">
                  <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    Performance Metric
                  </p>
                  <div className="flex items-start leading-none mt-1">
                    <span
                      className="font-headline font-black leading-none"
                      style={{
                        fontSize: "clamp(4rem, 7vw, 8rem)",
                        ...accentStyle,
                      }}
                    >
                      {active.score}
                    </span>
                    <span className="font-headline text-2xl text-white/40 mt-3 ml-1">
                      /100
                    </span>
                  </div>
                </motion.div>

                {/* Stack pills */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-6">
                  {active.stack.map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.a
                  variants={itemVariants}
                  href={active.siteUrl}
                  className="btn-ghost text-sm mt-8 w-fit"
                  target={active.siteUrl !== "#" ? "_blank" : undefined}
                  rel={
                    active.siteUrl !== "#" ? "noopener noreferrer" : undefined
                  }
                >
                  VISIT SITE ↗
                </motion.a>
              </div>

              {/* ── Right column (65%) ── */}
              <motion.div
                variants={itemVariants}
                className="w-full md:w-[65%] flex-1 md:flex-none relative"
              >
                {/* Live preview label */}
                <span className="absolute top-6 right-6 z-20 font-mono text-[10px] text-white/30 tracking-widest">
                  LIVE_PREVIEW_{active.index}.EXE
                </span>

                {/* Corner bracket */}
                <svg
                  className="absolute top-6 left-6 z-20"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <polyline
                    points="32,0 0,0 0,32"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>

                {/* Video — fills the column, no individual animation */}
                <video
                  key={active.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={active.videoSrc} type="video/mp4" />
                </video>
              </motion.div>

            </motion.div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
