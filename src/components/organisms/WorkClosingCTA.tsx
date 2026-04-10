// src/components/organisms/WorkClosingCTA.tsx
"use client";

import React from "react";
import { useDrawer } from "@/lib/contact-drawer-context";

export function WorkClosingCTA() {
  const { openDrawer } = useDrawer();
  return (
    <section className="w-full bg-[#0A0A0A] py-16 md:py-[120px] px-6 flex flex-col items-center text-center gap-6">
      <h2
        className="font-headline font-black uppercase text-white leading-tight"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
      >
        WHAT DOES YOUR BUSINESS LOOK LIKE ONLINE?
      </h2>

      <p className="text-white/60 text-base max-w-md leading-relaxed">
        Every slow website is a lead that didn&apos;t convert.{" "}
        Let&apos;s fix that.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <button
          onClick={openDrawer}
          className="inline-flex items-center justify-center bg-white text-black font-headline font-bold uppercase text-sm border-none cursor-pointer"
          style={{
            padding: "14px 28px",
            borderRadius: "4px",
            letterSpacing: "0.08em",
          }}
        >
          RUN FREE AUDIT
        </button>
        <a
          href="/pricing"
          className="inline-flex items-center justify-center bg-transparent text-white border border-white font-headline font-bold uppercase text-sm"
          style={{
            padding: "14px 28px",
            borderRadius: "4px",
            letterSpacing: "0.08em",
          }}
        >
          VIEW PRICING
        </a>
      </div>
    </section>
  );
}
