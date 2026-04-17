const steps = [
    {
        step: "01 / Schematic",
        icon: "draw",
        title: "System Design\n& Audit",
        body: "We map the entire technical landscape, identifying structural vulnerabilities and designing a blueprint for absolute operational resilience.",
    },
    {
        step: "02 / Fabricate",
        icon: "construction",
        title: "Precision\nDeployment",
        body: "Engineered with surgical accuracy. We translate schematics into high-performance, automated infrastructure built for long-term stability.",
    },
    {
        step: "03 / Optimize",
        icon: "speed",
        title: "Continuous\nEvolution",
        body: "Beyond delivery. We implement self-optimizing feedback loops that ensure your systems remain at peak performance as your scale increases.",
    },
];

export function ArchitecturalMethod() {
    return (
        <section
            aria-label="The Architectural Method"
            className="relative py-24 md:py-32 px-8 md:px-12 bg-slate-dark border-t border-white/5"
        >
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
                        The Architectural Method
                    </h2>
                    <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
                        A rigorous, iterative framework designed for high-stakes digital infrastructure. We build systems that don&apos;t break.
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
