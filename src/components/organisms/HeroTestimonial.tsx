"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";

export function HeroTestimonial() {
    return (
        <section
            className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24 border-t border-white/5 bg-[#050505] overflow-hidden"
        >
            <GrainOverlay className="opacity-30" />
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">
                        Verified Client Protocol
                    </p>
                    <blockquote className="font-heading text-lg md:text-2xl leading-relaxed text-white/90 border-l-2 border-white/20 pl-6 mb-8">
                        "Luke has been exceptional from start to finish on the project. I was skeptical at first, but all I can say is that I do not regret opening dialogue with him. His professionalism and work ethic is above what I’ve experienced in the industry and his execution of planning is pinpoint. Please, save yourself from having to run around after designers and use Luke — phenomenal individual."
                    </blockquote>
                    <p className="font-mono text-sm text-white/50 tracking-wide uppercase">
                        — Gio, Owner, Cafe Crave
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
