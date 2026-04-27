// src/components/organisms/SubpageHero.tsx
// Reusable subpage hero — matches the homepage orange-red gradient container.
// Gradient, border-radius, and side-margins extracted from HeroContent.tsx.

import React from "react";

export interface SubpageHeroProps {
  breadcrumb?: string; // e.g. "LP WEB / WORK"
  title: string;      // e.g. "WORK" — already uppercase
  subtitle: string;   // e.g. "SELECTED CLIENT ENGAGEMENTS"
}

export function SubpageHero({ breadcrumb, title, subtitle }: SubpageHeroProps) {
  return (
    // Outer wrapper matches HeroContent: px-4 md:px-6 pt-4
    // This is what creates the dark page margins on left/right
    <div className="px-4 md:px-6 pt-4">
      {/* ── Gradient container — same radius + gradient as homepage hero ── */}
      <div
        className="relative min-h-[38vh] md:min-h-[48vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)" }}
        aria-label={`${title} page hero`}
      >

        {/* Breadcrumb — top-left (optional) */}
        {breadcrumb && (
          <p
            className="absolute font-headline text-white/45 uppercase"
            style={{
              top: "clamp(16px, 3vh, 24px)",
              left: "clamp(20px, 4vw, 32px)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              fontWeight: 400,
            }}
          >
            {breadcrumb}
          </p>
        )}

        {/* Ghost watermark — right side, vertically centred, bleeds off edge */}
        <p
          className="absolute top-1/2 font-headline font-black uppercase text-white/15 select-none pointer-events-none leading-none"
          style={{
            transform: "translateY(-50%)",
            right: "clamp(-10px, -1vw, -20px)",
            fontSize: "clamp(80px, 22vw, 280px)",
            letterSpacing: "-0.02em",
          }}
          aria-hidden="true"
        >
          {title}
        </p>

        {/* Title + Subtitle — anchored at 60% from top, grounded in lower half */}
        <div
          className="absolute flex flex-col gap-2"
          style={{ top: "60%", left: "clamp(20px, 4vw, 32px)" }}
        >
          <h1
            className="font-headline font-black uppercase text-white leading-[0.9]"
            style={{
              fontSize: "clamp(40px, 8vw, 96px)",
              letterSpacing: "-0.02em",
            }}
          >
            {title}<span>.</span>
          </h1>
          <p
            className="font-headline text-white/55 uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Corner bracket — bottom-right, CSS only */}
        <div
          className="absolute"
          style={{
            bottom: "20px",
            right: "24px",
            width: "20px",
            height: "20px",
            borderRight: "2px solid rgba(255,255,255,0.35)",
            borderBottom: "2px solid rgba(255,255,255,0.35)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
