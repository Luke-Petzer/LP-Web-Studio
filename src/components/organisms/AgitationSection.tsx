"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

export function AgitationSection() {
    return (
        <section className="relative px-6 md:px-10 lg:px-16 py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
            <GrainOverlay className="opacity-30" />
            
            {/* Geometric grid background */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6 text-red-500">
                        System Bottleneck Detected
                    </p>
                    <h2 className="font-heading font-black text-[clamp(32px,5vw,72px)] tracking-[-0.03em] leading-[0.95] mb-10 text-white">
                        Off-the-shelf software is <br className="hidden md:block" />
                        <span className="text-white/40">slowing you down.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-mono">
                        You are losing hours every week to manual data entry, scattered WhatsApp orders, and fragmented systems that don’t talk to each other. Your business has outgrown generic templates. You need a system built specifically for how you operate.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
