"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
    label: string;
    value: string | number;
    suffix?: string;
    className?: string;
}

const luxurySpring = {
    stiffness: 150,
    damping: 25,
    mass: 1,
};

export function MetricCard({
    label,
    value,
    suffix = "",
    className = "",
}: MetricCardProps) {
    return (
        <motion.div
            className={`glass-card p-sectional flex flex-col gap-base ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", ...luxurySpring }}
            whileHover={{ scale: 1.02 }}
        >
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
                {label}
            </span>
            <div className="flex items-baseline gap-hairline">
                <span className="text-3xl font-heading font-bold text-accent glow-text">
                    {value}
                </span>
                {suffix && (
                    <span className="text-lg text-secondary-light font-mono">
                        {suffix}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
