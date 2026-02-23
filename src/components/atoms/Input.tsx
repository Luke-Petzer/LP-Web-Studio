import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    className = "",
    id,
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-base">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-mono text-secondary-light uppercase tracking-wider"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`h-[48px] w-full px-component bg-glass-bg border border-glass-border rounded-glass text-white placeholder:text-secondary font-body text-base focus:outline-none focus:border-accent focus:shadow-eclipse-glow-sm transition-colors ${error ? "border-red-500" : ""} ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-400 font-mono">{error}</span>
            )}
        </div>
    );
}
