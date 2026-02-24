"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
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
        "bg-accent text-brand-black font-semibold shadow-accent-glow-sm hover:shadow-accent-glow",
    outline:
        "bg-transparent border border-accent text-accent",
    ghost:
        "bg-transparent text-secondary",
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
    const shouldReduceMotion = useReducedMotion();
    const classes = `inline-flex items-center justify-center rounded-glass ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

    const hoverAnim = shouldReduceMotion || disabled ? {} : { scale: 1.02 };
    const tapAnim = shouldReduceMotion || disabled ? {} : { scale: 0.98 };
    const transition = { type: "spring" as const, ...luxurySpring };

    if (href) {
        return (
            <motion.a
                href={href}
                className={classes}
                whileHover={hoverAnim}
                whileTap={tapAnim}
                transition={transition}
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
            whileHover={hoverAnim}
            whileTap={tapAnim}
            transition={transition}
        >
            {children}
        </motion.button>
    );
}
