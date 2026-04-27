"use client";

import Image from "next/image";
import { useDrawer } from "@/lib/contact-drawer-context";

export function HeroContent() {
    const { openDrawer } = useDrawer();
    return (
        <div className="px-4 md:px-6 pt-4">
            {/* ── Gradient Card ── */}
            <div
                className="relative min-h-[90vh] md:min-h-[88vh] rounded-[3rem] md:rounded-[5rem] overflow-hidden flex items-end md:items-center px-8 md:px-16 lg:px-24 py-20 md:py-0"
                style={{ background: "linear-gradient(135deg, #FF4D00 0%, #B81D1D 100%)" }}
            >
                {/* Portrait image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/founder-portrait.jpg"
                        alt="Luke Petzer — LP Web Studio"
                        fill
                        priority
                        className="object-cover object-center md:object-right grayscale mix-blend-multiply opacity-30"
                        sizes="100vw"
                    />
                    {/* Left-to-right colour bleed */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/70 via-transparent to-transparent" />
                </div>

                {/* ── Content grid ── */}
                <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                    {/* Left: headline + CTAs */}
                    <div className="md:col-span-7">
                        {/* Eyebrow */}
                        <div className="mb-8 flex items-center gap-4 opacity-80">
                            <div className="w-8 h-[2px] bg-white" />
                            <span className="font-headline text-[10px] tracking-[0.25em] uppercase text-white font-bold">
                                Established MMXXIV
                            </span>
                        </div>

                        {/* H1 */}
                        <h1 className="font-headline font-bold uppercase tracking-[-0.05em] leading-[0.85] text-white mb-10"
                            style={{ fontSize: "clamp(3rem, 8vw, 8.5rem)" }}>
                            Forging the<br />
                            Future of<br />
                            <span className="text-white/40">Systems.</span>
                        </h1>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={openDrawer}
                                className="btn-primary px-10 py-5 text-sm border-none cursor-pointer"
                            >
                                Deploy System
                            </button>
                            <a
                                href="#capabilities"
                                className="btn-ghost px-10 py-5 text-sm backdrop-blur-sm"
                            >
                                View Schematics
                            </a>
                        </div>
                    </div>

                    {/* Right: descriptor card + pillars */}
                    <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8">
                        {/* Glass descriptor */}
                        <div className="p-8 border border-white/20 backdrop-blur-md bg-white/5 rounded-tight">
                            <p className="font-body text-sm md:text-base text-white tracking-normal leading-relaxed uppercase font-medium">
                                Eliminate operational fragility. We engineer high-performance automation systems and custom web applications for businesses ready to scale.
                            </p>
                        </div>

                        {/* Numbered pillars */}
                        <div className="flex flex-wrap gap-6 sm:gap-10 text-white/60">
                            {[
                                { num: "01", label: "Infrastructure" },
                                { num: "02", label: "Automation" },
                                { num: "03", label: "Scalability" },
                            ].map(({ num, label }) => (
                                <div key={num} className="flex flex-col gap-1">
                                    <span className="font-headline text-2xl font-bold text-white">{num}</span>
                                    <span className="font-body text-[10px] tracking-widest uppercase">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
