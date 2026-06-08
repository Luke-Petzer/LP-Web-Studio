const steps = [
    {
        step: "01 / Discover",
        icon: "draw",
        title: "Requirements\n& Scope",
        body: "We start by understanding your business, your goals, and what you actually need. Every project begins with a clear scope and agreed deliverables — no surprises.",
    },
    {
        step: "02 / Build",
        icon: "construction",
        title: "Development\n& Testing",
        body: "We build to the agreed scope using Next.js and modern tooling. Every feature is tested before it ships and you review progress throughout.",
    },
    {
        step: "03 / Optimise",
        icon: "speed",
        title: "Launch &\nSupport",
        body: "After launch we monitor performance, address any issues, and stay available for updates. Your site should get better over time, not stale.",
    },
];

export function ArchitecturalMethod() {
    return (
        <section
            aria-label="How We Build"
            className="relative isolate py-24 md:py-32 px-8 md:px-12 bg-slate-dark border-t border-white/5"
        >
            {/* Continuously animated geometric lines — full section background */}
            <div className="section-geo-lines" aria-hidden="true" />

            {/* Geometric line accents — top strip */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "160px" }}>
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line x1="0" y1="50%" x2="8%" y2="50%" stroke="white" strokeWidth="1"/>
                    <line x1="8%" y1="0" x2="8%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="8%" y1="50%" x2="35%" y2="50%" stroke="white" strokeWidth="1"/>
                    <line x1="70%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="85%" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="1"/>
                </svg>
            </div>
            {/* Geometric line accents — bottom strip */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "160px" }}>
                <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <line x1="0%" y1="0" x2="30%" y2="0" stroke="white" strokeWidth="1"/>
                    <line x1="92%" y1="50%" x2="92%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="60%" y1="100%" x2="92%" y2="100%" stroke="white" strokeWidth="1"/>
                    <line x1="92%" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1"/>
                </svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* ── Left: sticky header ── */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <span className="section-label mb-10 block">02 — Execution</span>
                    <h2
                        className="font-headline font-bold uppercase tracking-[-0.04em] text-white mb-6"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    >
                        How We Build
                    </h2>
                    <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
                        A structured process from brief to launch. We scope carefully, build precisely, and deliver on time.
                    </p>
                </div>

                {/* ── Right: step cards ── */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {steps.map((s) => (
                        <div
                            key={s.step}
                            className="group dark-card relative p-12 md:p-16 min-h-[360px] flex flex-col justify-between overflow-hidden"
                        >
                            {/* Step label + rule */}
                            <div>
                                <span className="mono-label">{s.step}</span>
                                <div className="w-10 h-px bg-white/20 mt-3" />
                            </div>

                            {/* Title + body */}
                            <div className="mt-10">
                                <h3
                                    className="font-headline font-bold uppercase tracking-tight text-white mb-5 whitespace-pre-line"
                                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
                                >
                                    {s.title}
                                </h3>
                                <p className="text-white/70 text-base leading-relaxed max-w-xl">
                                    {s.body}
                                </p>
                            </div>

                            {/* Corner icon — fades in on hover */}
                            <span
                                className="material-symbols-outlined absolute bottom-10 right-10 text-6xl text-white opacity-10 group-hover:opacity-40 transition-opacity duration-500"
                            >
                                {s.icon}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
