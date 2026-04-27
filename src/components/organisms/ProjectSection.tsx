// src/components/organisms/ProjectSection.tsx
import React from "react";
import Image from "next/image";

export type ProjectSectionProps = {
  ident: string;
  sector: string;
  timeline: string;
  status: string;
  statusActive: boolean;
  authority: string;
  score: number;
  stack: string[];
  descriptionHeading: string;
  descriptionBody: string;
  videoSrc: string;
  images: [string, string];
  imageAlts: [string, string];
  siteUrl: string;
};

const accentStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export function ProjectSection({
  ident,
  sector,
  timeline,
  status,
  statusActive,
  authority,
  score,
  stack,
  descriptionHeading,
  descriptionBody,
  videoSrc,
  images,
  imageAlts,
  siteUrl,
}: ProjectSectionProps) {
  // Split ident into words so each line is large — e.g. "CAFE\nCRAVE"
  const identLines = ident.split(" ");

  return (
    <section aria-label={`${ident} project`} className="flex flex-col md:flex-row py-16 md:py-24 px-6 md:px-16 gap-12 md:gap-16">

      {/* ── LEFT (60%) — Media + Description ── */}
      {/* On mobile: order-2 (below metadata) */}
      <div className="w-full md:w-[60%] flex flex-col gap-8 order-2 md:order-1">

        {/* Video with corner brackets */}
        <div className="relative">
          {/* Top-left bracket */}
          <div
            className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderTop: "2px solid #FF4D00",
              borderLeft: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Top-right bracket */}
          <div
            className="absolute -top-3 -right-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderTop: "2px solid #FF4D00",
              borderRight: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Bottom-left bracket */}
          <div
            className="absolute -bottom-3 -left-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderBottom: "2px solid #FF4D00",
              borderLeft: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />
          {/* Bottom-right bracket */}
          <div
            className="absolute -bottom-3 -right-3 w-6 h-6 pointer-events-none z-10"
            style={{
              borderBottom: "2px solid #FF4D00",
              borderRight: "2px solid #FF4D00",
            }}
            aria-hidden="true"
          />

          <figure>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={images[0]}
              className="w-full aspect-video object-cover"
              aria-label={`${ident} project video preview`}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <figcaption className="sr-only">{ident} project preview</figcaption>
          </figure>
        </div>

        {/* Two images side by side */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-square w-full overflow-hidden">
              <Image
                src={src}
                alt={imageAlts[i]}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <h3 className="font-headline font-black uppercase text-white text-2xl md:text-3xl">
            {descriptionHeading}
          </h3>
          <p className="text-white/60 text-base leading-relaxed">
            {descriptionBody}
          </p>
        </div>
      </div>

      {/* ── RIGHT (40%) — Metadata, sticky on desktop ── */}
      {/* On mobile: order-1 (above media) */}
      <div className="w-full md:w-[40%] flex flex-col gap-8 order-1 md:order-2 md:sticky md:top-24 md:self-start">

        {/* Label row */}
        <div className="flex justify-between items-start">
          <span className="mono-label">PROJECT_IDENT</span>
          <span className="mono-label">PERFORMANCE</span>
        </div>

        {/* Name + Score row */}
        <div className="flex justify-between items-end gap-4">
          <h2
            className="font-headline font-black uppercase text-white leading-none min-w-0 break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            {identLines.map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < identLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <span
            className="font-headline font-black leading-none shrink-0"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", ...accentStyle }}
          >
            {score}/100
          </span>
        </div>

        {/* 2×2 metadata grid */}
        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="mono-label mb-1">SECTOR</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {sector}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">TIMELINE</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {timeline}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">STATUS</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base flex items-center gap-2">
              {statusActive && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              )}
              {status}
            </p>
          </div>
          <div>
            <p className="mono-label mb-1">AUTHORITY</p>
            <p className="font-headline font-bold uppercase text-white text-sm md:text-base">
              {authority}
            </p>
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={siteUrl}
          aria-label={`Launch ${ident} experience`}
          target={siteUrl !== "#" ? "_blank" : undefined}
          rel={siteUrl !== "#" ? "noopener noreferrer" : undefined}
          className="w-full flex items-center justify-between px-6 py-5 border border-white/10 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/5 transition-all duration-300 font-headline font-black uppercase tracking-widest text-white text-sm"
        >
          LAUNCH_EXPERIENCE
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
