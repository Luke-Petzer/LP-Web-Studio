// src/components/organisms/SubpageHero.tsx
// Reusable subpage hero — matches the homepage orange-red gradient container.
// Gradient, border-radius, and side-margins extracted from HeroContent.tsx.

import React from "react";

export interface SubpageHeroProps {
  breadcrumb?: string; // e.g. "LP WEB / WORK"
  /**
   * The one-word design label (e.g. "WORK") — already uppercase. It is the big
   * ghost watermark behind the hero and is purely decorative (aria-hidden).
   */
  title: string;
  /**
   * The page's real <h1>: a descriptive line that says what the page is about,
   * e.g. "B2B ordering portal for wholesalers and distributors". Pass it on
   * every page that doesn't render its own <h1>. When omitted the hero renders
   * NO heading at all (the one-word `title` is shown as plain text instead) —
   * use that on pages that supply their own <h1>, such as articles, so the
   * page keeps exactly one.
   */
  heading?: string;
  subtitle: string;   // e.g. "SELECTED CLIENT ENGAGEMENTS"
}

export function SubpageHero({ breadcrumb, title, heading, subtitle }: SubpageHeroProps) {
  return (
    // Outer wrapper matches HeroContent: px-4 md:px-6 pt-4
    // This is what creates the dark page margins on left/right
    <div className="px-4 md:px-6 pt-4">
      {/* ── Gradient container — same radius + gradient as homepage hero ── */}
      <div
        className="relative min-h-[38dvh] md:min-h-[48dvh] rounded-[3rem] md:rounded-[5rem] overflow-hidden"
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

        {heading ? (
          /* Descriptive <h1> + subtitle — anchored to the bottom so a two- or
             three-line heading grows upward instead of running off the card.
             Same face, weight, case and tight tracking as the old one-word
             title; the one-word label lives on as the ghost watermark above. */
          <div
            className="absolute flex flex-col gap-3"
            style={{
              bottom: "clamp(36px, 7vh, 64px)",
              left: "clamp(20px, 4vw, 32px)",
              right: "clamp(56px, 9vw, 128px)",
            }}
          >
            <h1
              className="font-headline font-black uppercase text-white leading-[0.95]"
              style={{
                fontSize: "clamp(26px, 4.4vw, 60px)",
                letterSpacing: "-0.02em",
                maxWidth: "20em",
              }}
            >
              {heading}<span>.</span>
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
        ) : (
          /* No heading: the page owns its <h1>, so the one-word label is plain
             text here (not a heading) and the hero looks exactly as before. */
          <div
            className="absolute flex flex-col gap-2"
            style={{ top: "60%", left: "clamp(20px, 4vw, 32px)" }}
          >
            <p
              className="font-headline font-black uppercase text-white leading-[0.9]"
              style={{
                fontSize: "clamp(40px, 8vw, 96px)",
                letterSpacing: "-0.02em",
              }}
            >
              {title}<span>.</span>
            </p>
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
        )}

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
