"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

export function TechStackAdvantage() {
    return (
        <section className="relative px-6 md:px-10 lg:px-16 py-32 bg-[#050505] overflow-hidden text-white border-t border-white/5">
            <GrainOverlay className="opacity-30" />
            
            {/* Minimalist abstract code visual / geometric lines */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6 text-white/30">
                        The Golden Engine
                    </p>
                    <h2 className="font-heading font-black text-[clamp(32px,5vw,72px)] tracking-[-0.03em] leading-[0.95] mb-10 text-white">
                        Built on Enterprise-Grade Infrastructure.
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-mono">
                        We don’t use slow, bloated website builders. Every system we deploy is custom-engineered using React and Next.js—the same architecture powering modern tech giants. This means your software is lightning-fast, infinitely scalable, and never crashes under load.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
