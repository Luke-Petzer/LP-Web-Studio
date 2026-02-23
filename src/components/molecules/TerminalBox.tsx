"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalBoxProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

const luxurySpring = {
    stiffness: 150,
    damping: 25,
    mass: 1,
};

export function TerminalBox({
    title = "terminal",
    children,
    className = "",
}: TerminalBoxProps) {
    return (
        <motion.div
            className={`terminal-border rounded-glass bg-brand-elevated overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", ...luxurySpring }}
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-base px-component py-base border-b border-glass-border">
                <div className="flex gap-[6px]">
                    <span className="w-[12px] h-[12px] rounded-full bg-red-500/80" />
                    <span className="w-[12px] h-[12px] rounded-full bg-yellow-500/80" />
                    <span className="w-[12px] h-[12px] rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-secondary">{title}</span>
            </div>

            {/* Terminal Content */}
            <div className="p-component font-mono text-sm text-secondary-light leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
}
