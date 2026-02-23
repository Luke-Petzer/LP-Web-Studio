"use client";

import { useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Spring Animations ─── */
const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Mercury Button Hook (Magnetic Follow — No Morph) ─── */
function useMercuryButton() {
    const ref = useRef<HTMLAnchorElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic follow with tighter spring (30% strength, scale 1.05)
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
    }, []);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0, 0) scale(1)";
    }, []);

    return { ref, onMouseMove, onMouseLeave };
}

export function HeroSection() {
    const primaryBtn = useMercuryButton();

    return (
        <section
            id="hero"
            className="mesh-transition min-h-screen relative flex items-center justify-center pt-24 pb-32 px-6"
        >
            <motion.div
                className="max-w-7xl w-full text-center relative z-10"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={fadeUp}>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.3em] font-bold px-4 py-2 rounded-full mb-8 inline-block">
                        Precision Engineering
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="font-heading font-extrabold text-white text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-8"
                    variants={fadeUp}
                >
                    Stop Losing Leads <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                        to Slow Websites.
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    className="font-body text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                    variants={fadeUp}
                >
                    Get a blazing-fast website that converts visitors into paying
                    customers, guaranteed. Serving Cape Town small businesses.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                    variants={fadeUp}
                >
                    <a
                        ref={primaryBtn.ref}
                        onMouseMove={primaryBtn.onMouseMove}
                        onMouseLeave={primaryBtn.onMouseLeave}
                        href="#contact"
                        className="mercury-btn px-10 py-5 rounded-full text-sm font-bold w-full md:w-auto text-white shadow-xl"
                    >
                        Get a Free Speed Audit
                    </a>
                    <a
                        href="#work"
                        className="text-white/80 hover:text-white px-8 py-4 text-sm font-bold flex items-center gap-2 transition-all"
                    >
                        View Case Studies{" "}
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
