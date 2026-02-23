"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";

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

const luxurySpring = {
    stiffness: 150,
    damping: 25,
    mass: 1,
};

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
    return (
        <motion.div
            className={`relative glass-card p-atmospheric flex flex-col gap-sectional ${recommended ? "border-accent/40 shadow-eclipse-glow-sm" : ""} ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", ...luxurySpring }}
            whileHover={{ y: -4 }}
        >
            {/* Recommended Badge */}
            {recommended && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2">
                    <span className="px-component py-[6px] bg-accent text-brand-black text-xs font-mono font-semibold rounded-full uppercase tracking-wider">
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
        </motion.div>
    );
}
