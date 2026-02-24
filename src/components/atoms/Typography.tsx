import { type ReactNode } from "react";

/**
 * Typography Atoms — Server Components (no interactivity needed)
 * Protocol §2: All sizes use the fluid clamp() scale from tailwind.config.ts
 * Protocol §4: Atoms are pure Server Components
 */

/* ─── Heading Component (H1–H6) ─── */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
    level?: HeadingLevel;
    children: ReactNode;
    className?: string;
    glow?: boolean;
}

/**
 * Maps heading levels to the fluid type scale defined in tailwind.config.ts.
 * Each class resolves to a clamp() value — no static px breakpoints.
 * Scale follows Golden Ratio (φ = 1.618):
 *   h1 → text-5xl  (clamp 4.236rem → 5.5rem)
 *   h2 → text-3xl  (clamp 2.618rem → 3.5rem)
 *   h3 → text-2xl  (clamp 2rem → 2.618rem)
 *   h4 → text-xl   (clamp 1.618rem → 2rem)
 *   h5 → text-lg   (clamp 1.25rem → 1.618rem)
 *   h6 → text-base (clamp 1rem → 1.125rem)
 */
const headingSizes: Record<HeadingLevel, string> = {
    1: "text-5xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
};

export function Heading({
    level = 2,
    children,
    className = "",
    glow = false,
}: HeadingProps) {
    const classes = `font-heading font-bold tracking-tight text-white ${headingSizes[level]} ${glow ? "glow-text" : ""} ${className}`;

    if (level === 1) return <h1 className={classes}>{children}</h1>;
    if (level === 3) return <h3 className={classes}>{children}</h3>;
    if (level === 4) return <h4 className={classes}>{children}</h4>;
    if (level === 5) return <h5 className={classes}>{children}</h5>;
    if (level === 6) return <h6 className={classes}>{children}</h6>;
    return <h2 className={classes}>{children}</h2>;
}

/* ─── Text Component ─── */
type TextSize = "sm" | "base" | "lg";

interface TextProps {
    children: ReactNode;
    size?: TextSize;
    className?: string;
    secondary?: boolean;
}

const textSizes: Record<TextSize, string> = {
    sm: "text-sm",   // clamp(0.875rem → 1rem)
    base: "text-base", // clamp(1rem → 1.125rem)
    lg: "text-lg",   // clamp(1.25rem → 1.618rem)
};

export function Text({
    children,
    size = "base",
    className = "",
    secondary = false,
}: TextProps) {
    return (
        <p
            className={`${textSizes[size]} font-body leading-relaxed ${secondary ? "text-secondary" : "text-secondary-light"} ${className}`}
        >
            {children}
        </p>
    );
}

/* ─── Label Component ─── */
interface LabelProps {
    children: ReactNode;
    className?: string;
    htmlFor?: string;
}

export function Label({ children, className = "", htmlFor }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-xs font-mono uppercase tracking-wider text-accent ${className}`}
        >
            {children}
        </label>
    );
}
