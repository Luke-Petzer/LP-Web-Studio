"use client";

import { useDrawer } from "@/lib/contact-drawer-context";

const pills = ["Scalable", "Secure", "Automated"];

export function ScaleBanner() {
    const { openDrawer } = useDrawer();
    return (
        <section
            aria-label="Ready to scale"
            className="w-full bg-obsidian py-20 md:py-24 px-8 md:px-12"
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">

                {/* Headline */}
                <h2
                    className="font-headline font-bold uppercase tracking-[-0.05em] leading-[0.85] text-white w-full md:w-2/3"
                    style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
                >
                    Ready to<br />Scale?
                </h2>

                {/* Right: pills + CTA */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:items-end gap-6">
                    <div className="flex flex-wrap gap-2 md:justify-end">
                        {pills.map((pill) => (
                            <span key={pill} className="pill">{pill}</span>
                        ))}
                    </div>
                    <button onClick={openDrawer} className="btn-primary w-full md:w-auto text-center px-12 py-5 border-none cursor-pointer">
                        Start a Project
                    </button>
                </div>
            </div>
        </section>
    );
}
