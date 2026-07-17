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
        IS MANUAL ADMIN COSTING YOU GROWTH?
      </h2>

      <p className="text-white/60 text-base max-w-md leading-relaxed">
        Every order taken over WhatsApp is a mistake waiting to happen.
        Every manual spreadsheet is time you&apos;re not spending on the business.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <button
          onClick={openDrawer}
          className="btn-primary"
          style={{ padding: "14px 28px", borderRadius: "4px" }}
        >
          BOOK A DISCOVERY CALL
        </button>
      </div>
    </section>
  );
}
