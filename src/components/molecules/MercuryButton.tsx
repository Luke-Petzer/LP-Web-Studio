"use client";

import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };

/**
 * MercuryButton — Client Molecule
 * Owns the magnetic hover physics (direct DOM manipulation for performance).
 * Passed as a child to the HeroSection Server Component.
 * Protocol §4: Molecules are 'use client' for interaction.
 */
export function MercuryButton() {
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef<HTMLAnchorElement>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (shouldReduceMotion) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.03)`;
    }, [shouldReduceMotion]);

    const onMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0, 0) scale(1)";
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Primary — Mercury magnetic CTA */}
            <a
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                href="#contact"
                className="mercury-btn px-[40px] py-[16px] rounded-full text-sm font-bold w-full md:w-auto text-white shadow-xl"
            >
                Run Performance Audit
            </a>

            {/* Secondary — Spring hover, no CSS transition */}
            <motion.a
                href="#work"
                className="text-white/80 px-[32px] py-[16px] text-sm font-bold flex items-center gap-2"
                whileHover={shouldReduceMotion ? {} : { color: "#ffffff", x: 4 }}
                transition={spring}
            >
                View Case Studies{" "}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </motion.a>
        </div>
    );
}
