"use client";

import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 };

export function MercuryButton({ 
  primaryText = "Book a Systems Architecture Call",
  primaryHref = "#contact"
}: { 
  primaryText?: string;
  primaryHref?: string;
}) {
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
        <div className="flex items-center gap-8">
            {/* Primary — Mercury magnetic CTA */}
            <a
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                href={primaryHref}
                className="mercury-btn px-[40px] py-[16px] rounded-full text-sm font-bold text-white"
            >
                {primaryText}
            </a>
        </div>
    );
}
