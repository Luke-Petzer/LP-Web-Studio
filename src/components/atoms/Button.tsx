"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

/* ─── The Luxury Spring Profile (Critically Damped) ─── */
const luxurySpring = {
    stiffness: 150,
    damping: 25,
    mass: 1,
};

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: Variant;
    size?: Size;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const variantStyles: Record<Variant, string> = {
    primary:
        "bg-accent text-brand-black font-semibold shadow-eclipse-glow-sm hover:shadow-eclipse-glow",
    outline:
        "bg-transparent border border-accent text-accent hover:bg-accent/10",
    ghost:
        "bg-transparent text-secondary hover:text-accent hover:bg-glass-bg",
};

const sizeStyles: Record<Size, string> = {
    sm: "h-[40px] px-component text-sm font-mono",
    md: "h-[48px] px-sectional text-base font-mono",
    lg: "h-[56px] px-atmospheric text-lg font-mono",
};

export function Button({
    children,
    onClick,
    className = "",
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const classes = `inline-flex items-center justify-center rounded-glass transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

    if (href) {
        return (
            <motion.a
                href={href}
                className={classes}
                whileHover={disabled ? {} : { scale: 1.02 }}
                whileTap={disabled ? {} : { scale: 0.98 }}
                transition={{ type: "spring", ...luxurySpring }}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{ type: "spring", ...luxurySpring }}
        >
            {children}
        </motion.button>
    );
}
