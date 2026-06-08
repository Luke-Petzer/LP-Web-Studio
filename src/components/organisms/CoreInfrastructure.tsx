"use client";

import React, { useState, useEffect } from "react";

type Viz = "squares" | "crosshair" | "strata" | "flow";

type Card = {
    module: string;
    title: string;
    body: string;
    bg: string;
    isLight: boolean;
    viz: Viz;
};

const cards: Card[] = [
    {
        module: "MODULE_01",
        title: "Custom\nBackends",
        body: "Custom backend logic built around how your business operates. No off-the-shelf limitations, no vendor lock-in.",
        bg: "#0B0B0B",
        isLight: false,
        viz: "squares",
    },
    {
        module: "MODULE_02",
        title: "Precision\nUI",
        body: "Interfaces built for clarity and speed. Clean, purposeful design that your team picks up without training.",
        bg: "#1a1c1e",
        isLight: false,
        viz: "crosshair",
    },
    {
        module: "MODULE_03",
        title: "Data\nStorage",
        body: "Structured databases and file storage configured to your needs. Your data is accessible, exportable, and owned by you.",
        bg: "#FF4D00",
        isLight: true,
        viz: "strata",
    },
    {
        module: "MODULE_04",
        title: "Third-Party\nIntegrations",
        body: "Connections to the tools your business already uses — payments, accounting, WhatsApp, email, and more — automated end to end.",
        bg: "#B81D1D",
        isLight: true,
        viz: "flow",
    },
];

function VizConcentricSquares() {
    const center = 100;
    const ringSizes = [24, 48, 72, 96, 120, 144, 168];
    const dots: React.ReactElement[] = [];
    ringSizes.forEach((size, ringIdx) => {
        const half = size / 2;
        const dotsPerSide = Math.max(4, Math.round(size / 8));
        const opacity = 0.95 - ringIdx * 0.08;
        for (let i = 0; i <= dotsPerSide; i++) {
            const x = center - half + (size * i) / dotsPerSide;
            dots.push(
                <circle key={`r${ringIdx}-t-${i}`} cx={x} cy={center - half} r={1.2} fill="currentColor" opacity={opacity} />
            );
            dots.push(
                <circle key={`r${ringIdx}-b-${i}`} cx={x} cy={center + half} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
        for (let i = 1; i < dotsPerSide; i++) {
            const y = center - half + (size * i) / dotsPerSide;
            dots.push(
                <circle key={`r${ringIdx}-l-${i}`} cx={center - half} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
            dots.push(
                <circle key={`r${ringIdx}-r-${i}`} cx={center + half} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
    });
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizCrosshair() {
    const dots: React.ReactElement[] = [];
    for (let i = 0; i <= 40; i++) {
        const x = (i / 40) * 200;
        dots.push(
            <circle key={`h-${i}`} cx={x} cy={100} r={1.2} fill="currentColor" opacity={0.85} />
        );
    }
    for (let i = 0; i <= 40; i++) {
        const y = (i / 40) * 200;
        dots.push(
            <circle key={`v-${i}`} cx={100} cy={y} r={1.2} fill="currentColor" opacity={0.85} />
        );
    }
    const corners = [
        [50, 50],
        [150, 50],
        [50, 150],
        [150, 150],
    ];
    corners.forEach(([cx, cy], cornerIdx) => {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                dots.push(
                    <circle
                        key={`c${cornerIdx}-${r}-${c}`}
                        cx={cx + c * 6}
                        cy={cy + r * 6}
                        r={1}
                        fill="currentColor"
                        opacity={0.55}
                    />
                );
            }
        }
    });
    dots.push(
        <circle key="center" cx={100} cy={100} r={2} fill="currentColor" opacity={1} />
    );
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizStrata() {
    const rowYs = Array.from({ length: 12 }, (_, i) => 20 + i * (160 / 11));
    const dotsPerRow = [38, 22, 38, 26, 38, 18, 38, 30, 38, 22, 38, 28];
    const opacities = [
        0.95, 0.95, 0.95,
        0.65, 0.65, 0.65, 0.65, 0.65, 0.65,
        0.45, 0.45, 0.45,
    ];
    const dots: React.ReactElement[] = [];
    rowYs.forEach((y, rowIdx) => {
        const count = dotsPerRow[rowIdx];
        const opacity = opacities[rowIdx];
        for (let i = 0; i < count; i++) {
            const x = 10 + (180 * i) / Math.max(count - 1, 1);
            dots.push(
                <circle key={`s${rowIdx}-${i}`} cx={x} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
    });
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizFlowLines() {
    const lineCount = 8;
    const dotsPerLine = 30;
    const dots: React.ReactElement[] = [];
    for (let l = 0; l < lineCount; l++) {
        const perpOffset = (l - (lineCount - 1) / 2) * 18;
        const perpDx = perpOffset * Math.SQRT1_2;
        const perpDy = -perpOffset * Math.SQRT1_2;
        const startX = -20 + perpDx;
        const startY = -20 + perpDy;
        const endX = 220 + perpDx;
        const endY = 220 + perpDy;
        for (let d = 0; d < dotsPerLine; d++) {
            const t = d / (dotsPerLine - 1);
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            if (x < -2 || x > 202 || y < -2 || y > 202) continue;
            const opacity = 0.2 + t * 0.75;
            dots.push(
                <circle key={`f${l}-${d}`} cx={x} cy={y} r={1.2} fill="currentColor" opacity={opacity} />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function Visualization({ viz }: { viz: Viz }) {
    if (viz === "squares") return <VizConcentricSquares />;
    if (viz === "crosshair") return <VizCrosshair />;
    if (viz === "strata") return <VizStrata />;
    return <VizFlowLines />;
}

export function CoreInfrastructure() {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    // Only enable expansion on devices that are both ≥1024px and support hover.
    // Initialises false to avoid SSR/hydration mismatch; set on client mount.
    const [isLgHover, setIsLgHover] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
        setIsLgHover(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsLgHover(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Inline style drives the transition — always an explicit value so the
    // browser never has to interpolate from/to a CSS-rule activation boundary.
    const gridTemplateColumns = isLgHover
        ? hoveredIdx !== null
            ? [0, 1, 2, 3].map((i) => (i === hoveredIdx ? "2fr" : "1fr")).join(" ")
            : "1fr 1fr 1fr 1fr"
        : undefined;

    return (
        <section
            id="capabilities"
            aria-label="Core Infrastructure"
            className="bg-obsidian px-8 md:px-12 pt-24 md:pt-32"
        >
            {/* Header row */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6">
                <div>
                    <h2
                        className="font-headline font-bold uppercase tracking-[-0.04em] text-white mb-3"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                    >
                        Web Development & Automation Services
                    </h2>
                    <p className="font-body text-white/50 max-w-md text-sm leading-relaxed">
                        Proprietary methodologies engineered for scale and absolute structural integrity.
                    </p>
                </div>
                <span className="section-label whitespace-nowrap">01 — Capabilities</span>
            </div>

            {/* Full-bleed panel row */}
            <div
                className="panel-row -mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
            >
                {cards.map((card, i) => (
                    <article
                        key={card.module}
                        className="card-panel group relative flex flex-col min-h-[300px] md:min-h-[524px]"
                        tabIndex={0}
                        aria-label={`${card.module}: ${card.title.replace("\n", " ")}`}
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onFocus={() => setHoveredIdx(i)}
                        onBlur={() => setHoveredIdx(null)}
                        style={{
                            background: card.bg,
                            color: "#ffffff",
                            transition: "filter 500ms ease-in-out",
                        }}
                    >
                        <div className="flex flex-col h-full p-8 lg:p-10">
                            <h3
                                className="font-headline font-bold uppercase whitespace-pre-line tracking-tight"
                                style={{
                                    fontSize: "clamp(1.25rem, 1.6vw, 1.875rem)",
                                    lineHeight: 1.05,
                                }}
                            >
                                {card.title}
                            </h3>

                            <div className="flex-1 flex items-center justify-center my-8">
                                <div className="w-full max-w-[200px] aspect-square">
                                    <Visualization viz={card.viz} />
                                </div>
                            </div>

                            <p
                                className="font-mono uppercase tracking-[0.18em] mb-3"
                                style={{
                                    fontSize: "10px",
                                    color: card.isLight
                                        ? "rgba(255,255,255,0.7)"
                                        : "rgba(255,255,255,0.4)",
                                }}
                            >
                                {String(i + 1).padStart(2, "0")} / 04
                            </p>

                            <p
                                className="text-[10px] font-bold tracking-[0.18em] uppercase leading-relaxed"
                                style={{
                                    color: card.isLight
                                        ? "rgba(255,255,255,1)"
                                        : "rgba(255,255,255,0.65)",
                                }}
                            >
                                {card.body}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
