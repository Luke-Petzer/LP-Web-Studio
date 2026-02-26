"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const luxurySpring = {
    stiffness: 150,
    damping: 25,
    mass: 1,
};

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    ctaText?: string;
    ctaHref?: string;
    recommended?: boolean;
    className?: string;
    children?: ReactNode;
}

export function PricingCard({
    title,
    price,
    period,
    description,
    features,
    ctaText = "Get Started",
    ctaHref = "/contact",
    recommended = false,
    className = "",
}: PricingCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            className={`group relative overflow-hidden glass-card p-atmospheric flex flex-col gap-sectional transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-accent-glow hover:border-accent/50 ${recommended ? "border-accent/40 shadow-accent-glow-sm" : ""} ${className}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...luxurySpring }}
        >
            {/* Shine Sweep — diagonal translate sweep on hover, CSS only */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%] z-0 pointer-events-none"
            />

            {/* All card content lifted above the glow */}
            <div className="relative z-10 flex flex-col gap-sectional flex-1">

                {/* Recommended Badge */}
                {recommended && (
                    <div className="absolute -top-[14px] left-1/2 -translate-x-1/2">
                        <span className="px-component py-[8px] bg-accent text-brand-black text-xs font-mono font-semibold rounded-full uppercase tracking-wider">
                            Recommended
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col gap-base">
                    <h3 className="text-lg font-heading font-semibold text-white">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-secondary">{description}</p>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-base">
                    <span className="text-3xl font-heading font-bold text-white">
                        {price}
                    </span>
                    {period && (
                        <span className="text-sm font-mono text-secondary">{period}</span>
                    )}
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-component flex-1">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-component">
                            <Check className="w-[16px] h-[16px] text-accent mt-[2px] shrink-0" strokeWidth={2.5} />
                            <span className="text-sm text-secondary-light">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Button
                    href={ctaHref}
                    variant={recommended ? "primary" : "outline"}
                    size="md"
                    className="w-full justify-center mt-component"
                >
                    {ctaText}
                </Button>

            </div>{/* end z-10 content wrapper */}
        </motion.div>
    );
}
