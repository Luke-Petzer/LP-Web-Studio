// src/components/organisms/WorkScrollReveal.tsx
"use client";

import React, { useEffect, useRef } from "react";

const lines = [
  "Every project starts with a problem.",
  "Every solution leaves a mark.",
  "This is how we grew.",
];

export function WorkScrollReveal() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Respect reduced motion — skip animation
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      lineRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
      return;
    }

    const observers: IntersectionObserver[] = [];

    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      // Initial state
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.8s ease ${i * 200}ms, transform 0.8s ease ${i * 200}ms`;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="min-h-[60vh] md:min-h-screen px-8 md:px-16 flex flex-col items-center justify-center text-center gap-4">
      {lines.map((line, i) => (
        <span
          key={i}
          ref={(el) => { lineRefs.current[i] = el; }}
          className="block font-headline font-black uppercase text-white leading-snug max-w-[600px]"
          style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)", opacity: 0, transform: "translateY(16px)" }}
        >
          {line}
        </span>
      ))}
    </section>
  );
}
