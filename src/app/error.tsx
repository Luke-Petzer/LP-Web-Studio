"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[App Error]", error);
    }, [error]);

    return (
        <main
            style={{ background: "#0A0A0A", minHeight: "100dvh" }}
            className="flex flex-col items-center justify-center px-6 md:px-12 text-center"
        >
            <p
                style={{
                    color: "#FF4500",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-space-grotesk)",
                    marginBottom: "16px",
                }}
            >
                SYSTEM / UNEXPECTED
            </p>
            <h1
                className="font-headline font-black uppercase text-white leading-none"
                style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    letterSpacing: "-0.03em",
                }}
            >
                SOMETHING<br />WENT WRONG.
            </h1>
            <p
                className="text-white/55 mt-6 max-w-md leading-relaxed"
                style={{ fontSize: "15px" }}
            >
                An unexpected error interrupted this page. Try again, or head back to
                safer ground.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-sm"
                >
                    Try again
                </button>
                <a
                    href="/"
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-white/15 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/5 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-white text-sm"
                >
                    Return home
                </a>
            </div>
        </main>
    );
}
