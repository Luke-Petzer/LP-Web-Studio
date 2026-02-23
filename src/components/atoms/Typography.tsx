import { type ReactNode } from "react";

/* ─── Heading Component (H1–H6) ─── */
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
    level?: HeadingLevel;
    children: ReactNode;
    className?: string;
    glow?: boolean;
}

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
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
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
