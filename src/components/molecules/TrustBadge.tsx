"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface TrustBadgeProps {
    text?: string;
    className?: string;
}

export function TrustBadge({
    text = "90+ Google PageSpeed Score Guaranteed",
    className = "",
}: TrustBadgeProps) {
    return (
        <motion.div
            className={`inline-flex items-center gap-component px-sectional py-component bg-accent/5 border border-accent/20 rounded-full ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 25, mass: 1, delay: 0.3 }}
        >
            <motion.div
                animate={{ boxShadow: ["0 0 8px rgba(100,255,218,0.3)", "0 0 16px rgba(100,255,218,0.6)", "0 0 8px rgba(100,255,218,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full"
            >
                <ShieldCheck className="w-[20px] h-[20px] text-accent" strokeWidth={2} />
            </motion.div>
            <span className="text-sm font-mono text-accent tracking-wide">
                {text}
            </span>
        </motion.div>
    );
}
