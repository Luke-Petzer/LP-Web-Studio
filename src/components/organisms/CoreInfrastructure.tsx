"use client";

import React from "react";

type Viz = "grid" | "wave" | "sunburst" | "curve";

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
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        bg: "#0B0B0B",
        isLight: false,
        viz: "grid",
    },
    {
        module: "MODULE_02",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        bg: "#1a1c1e",
        isLight: false,
        viz: "wave",
    },
    {
        module: "MODULE_03",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        bg: "#FF4D00",
        isLight: true,
        viz: "sunburst",
    },
    {
        module: "MODULE_04",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        bg: "#B81D1D",
        isLight: true,
        viz: "curve",
    },
];

function VizGrid() {
    const cols = 14;
    const rows = 14;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const distance = (r + c) / (rows + cols);
            const opacity = Math.max(0.1, 1 - distance * 1.1);
            dots.push(
                <circle
                    key={`${r}-${c}`}
                    cx={10 + c * 13}
                    cy={10 + r * 13}
                    r={1.4}
                    fill="currentColor"
                    opacity={opacity}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizWave() {
    const cols = 30;
    const dotsPerCol = 24;
    const dots: React.ReactElement[] = [];
    for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1)) * 200;
        const phase = (c / cols) * Math.PI * 2;
        const amplitude = 50;
        for (let d = 0; d < dotsPerCol; d++) {
            const y = 100 + Math.sin(phase + d * 0.18) * amplitude * (0.4 + d / dotsPerCol);
            dots.push(
                <circle
                    key={`${c}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.3 + (d / dotsPerCol) * 0.5}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizSunburst() {
    const rays = 30;
    const dotsPerRay = 18;
    const cx = 100;
    const cy = 100;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rays; r++) {
        const angle = (r / rays) * Math.PI * 2;
        for (let d = 1; d <= dotsPerRay; d++) {
            const distance = (d / dotsPerRay) * 95;
            const x = cx + Math.cos(angle) * distance;
            const y = cy + Math.sin(angle) * distance;
            dots.push(
                <circle
                    key={`${r}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.25 + (d / dotsPerRay) * 0.6}
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full h-full">
            {dots}
        </svg>
    );
}

function VizCurve() {
    const rows = 22;
    const dotsPerRow = 26;
    const dots: React.ReactElement[] = [];
    for (let r = 0; r < rows; r++) {
        const baseY = 30 + r * 7;
        for (let d = 0; d < dotsPerRow; d++) {
            const x = 10 + (d / (dotsPerRow - 1)) * 180;
            const phase = (d / dotsPerRow) * Math.PI * 2 + r * 0.18;
            const offset = Math.sin(phase) * 12;
            const y = baseY + offset;
            dots.push(
                <circle
                    key={`${r}-${d}`}
                    cx={x}
                    cy={y}
                    r={1.2}
                    fill="currentColor"
                    opacity={0.25 + ((rows - r) / rows) * 0.55}
                />
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
    if (viz === "grid") return <VizGrid />;
    if (viz === "wave") return <VizWave />;
    if (viz === "sunburst") return <VizSunburst />;
    return <VizCurve />;
}

export function CoreInfrastructure() {
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
            <div className="-mx-8 md:-mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, i) => (
                    <article
                        key={card.module}
                        className="card-panel group relative flex flex-col"
                        style={{
                            background: card.bg,
                            color: "#ffffff",
                            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                            transition: "filter 200ms ease",
                            minHeight: "520px",
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
