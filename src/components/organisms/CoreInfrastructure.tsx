"use client";

const cards = [
    {
        module: "MODULE_01",
        icon: "terminal",
        title: "Autonomous\nBackends",
        body: "Self-healing infrastructure that eliminates manual admin and scales with your operation.",
        tags: ["Next.js", "Node.js"],
    },
    {
        module: "MODULE_02",
        icon: "architecture",
        title: "Precision\nUI",
        body: "Interfaces designed with mathematical rigour for operators who demand clarity and speed.",
        tags: [],
    },
    {
        module: "MODULE_03",
        icon: "storage",
        title: "Data\nStorage",
        body: "Immutable audit trails and highly available relational architectures for mission-critical data.",
        tags: [],
    },
    {
        module: "MODULE_04",
        icon: "language",
        title: "Global\nPipelines",
        body: "Automated deployment across distributed nodes with zero-downtime execution.",
        tags: [],
    },
];

export function CoreInfrastructure() {
    return (
        <section
            id="capabilities"
            aria-label="Core Infrastructure"
            className="relative py-24 md:py-32 px-8 md:px-12 bg-obsidian overflow-hidden"
        >
            {/* Geometric line accents */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal rule top-right */}
                <line x1="40%" y1="12%" x2="100%" y2="12%" stroke="white" strokeWidth="1"/>
                {/* Vertical rule right */}
                <line x1="92%" y1="0%" x2="92%" y2="55%" stroke="white" strokeWidth="1"/>
                {/* Diagonal bottom-left */}
                <line x1="0%" y1="100%" x2="18%" y2="60%" stroke="white" strokeWidth="1"/>
                {/* Short horizontal bottom */}
                <line x1="0%" y1="88%" x2="12%" y2="88%" stroke="white" strokeWidth="1"/>
            </svg>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-24 gap-6">
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

            {/* ── Grid layout (desktop) — every card behaves identically, no clipping ── */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.module}
                        className="infra-card p-10 flex flex-col justify-between min-h-[420px] transition-transform duration-300 ease-out hover:scale-[1.02]"
                    >
                        {/* Top row */}
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-4xl text-white">
                                {card.icon}
                            </span>
                            <span className="mono-label">{card.module}</span>
                        </div>

                        {/* Bottom content */}
                        <div>
                            <h3
                                className="font-headline font-bold uppercase leading-none text-white mb-5 whitespace-pre-line"
                                style={{ fontSize: "clamp(1.5rem, 1.8vw, 1.875rem)" }}
                            >
                                {card.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                {card.body}
                            </p>
                            {card.tags.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {card.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-obsidian border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Stacked layout (mobile) ── */}
            <div className="flex flex-col gap-4 md:hidden">
                {cards.map((card) => (
                    <div key={card.module} className="dark-card p-8 flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <span className="material-symbols-outlined text-3xl text-white">
                                {card.icon}
                            </span>
                            <span className="mono-label">{card.module}</span>
                        </div>
                        <div>
                            <h3 className="font-headline font-bold uppercase leading-none text-white mb-3 text-2xl whitespace-pre-line">
                                {card.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">{card.body}</p>
                        </div>
                        {card.tags.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                {card.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-obsidian border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
