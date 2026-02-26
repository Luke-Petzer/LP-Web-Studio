import { type ReactNode } from "react";

type BadgeVariant = "speed" | "trust" | "tech" | "default";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    speed:
        "bg-accent/10 text-accent border border-accent/30 shadow-eclipse-glow-sm",
    trust:
        "bg-accent/10 text-accent border border-accent/20",
    tech:
        "bg-glass-bg text-secondary-light border border-glass-border",
    default:
        "bg-glass-bg text-secondary border border-glass-border",
};

export function Badge({
    children,
    variant = "default",
    className = "",
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-base px-component py-[6px] rounded-full text-xs font-mono uppercase tracking-wider ${variantStyles[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
