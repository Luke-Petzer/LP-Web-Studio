"use client";

import { useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";

/* ─── Spring ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Data ─── */
const processCards = [
    {
        title: "Frictionless Experience",
        body: "Traditional forms are dead. We implement seamless direct-response channels like WhatsApp and Telegram to cut lead drop-off.",
    },
    {
        title: "Performance First",
        body: "Every millisecond costs money. Our stack is optimized at the edge, ensuring instant delivery regardless of user location.",
    },
    {
        title: "Strategic Whitespace",
        body: "We don\u2019t use bento grids or distracting borders. We use space to guide users toward your primary call-to-action.",
    },
];

export function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    /* Focus Lens: update CSS vars on mouse move */
    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--lens-x", `${e.clientX - rect.left}px`);
            el.style.setProperty("--lens-y", `${e.clientY - rect.top}px`);
        },
        []
    );

    return (
        <section id="process" className="bg-white py-structural px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-sectional items-start mb-structural"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div>
                        <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                            Philosophy
                        </p>
                        <h2 className="text-ink text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                            We remove the noise <br />
                            so your growth can speak.
                        </h2>
                    </div>
                </motion.div>

                {/* Focus Lens Grid */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="relative grid grid-cols-1 md:grid-cols-3 gap-sectional"
                    style={
                        {
                            "--lens-x": "50%",
                            "--lens-y": "50%",
                        } as React.CSSProperties
                    }
                >
                    {/* Base layer (greyed out) */}
                    {processCards.map((card) => (
                        <motion.div
                            key={card.title}
                            className="p-12 border border-black/5 rounded-[3rem] bg-zinc-50 hover:border-accent hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <h3 className="text-ink text-xl font-heading font-bold mb-4">
                                {card.title}
                            </h3>
                            <p className="text-slate leading-relaxed">{card.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
