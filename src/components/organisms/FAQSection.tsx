"use client";

import { useState } from "react";

const faqs = [
    {
        q: "What does a custom website cost in Cape Town?",
        a: "LP Web Studio offers three packages. A starter 1-page website costs R5,500 once-off plus R350/month hosting. A professional 3-page website with booking automation costs R12,500. Custom web applications start from R21,500.",
    },
    {
        q: "How long does a website take to build?",
        a: "Standard websites take 1-2 weeks once content and requirements are confirmed. Custom web applications and automation systems take 2-6 weeks depending on complexity.",
    },
    {
        q: "Do you work with businesses outside Cape Town?",
        a: "Yes. We work with businesses across South Africa and internationally. Discovery calls are online and projects are delivered remotely.",
    },
    {
        q: "What industries do you work with?",
        a: "We work with any business that needs a serious online presence or wants to automate their operations — particularly manufacturing, trade services, hospitality, and B2B companies.",
    },
    {
        q: "What makes LP Web Studio different from other web agencies?",
        a: "You speak directly to the engineer building your system — not a sales rep or account manager. Every build is hand-coded in Next.js, comes with a 90+ PageSpeed guarantee, and you own the code outright with no lock-in.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section
            aria-label="Frequently asked questions"
            className="py-24 md:py-32 px-8 md:px-12 bg-obsidian"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section label */}
                <div className="mb-14">
                    <span className="section-label">03 — Inquiries</span>
                </div>

                {/* FAQ rows */}
                <div className="flex flex-col">
                    {faqs.map((faq, i) => (
                        <div key={faq.q} className="border-t border-white/10">
                            {/* Question row */}
                            <button
                                onClick={() => toggle(i)}
                                aria-expanded={openIndex === i}
                                className="w-full flex items-center justify-between gap-6 py-8 px-2 text-left group cursor-pointer hover:bg-white/5 transition-colors duration-200"
                            >
                                <h3 className="font-headline font-medium text-white/80 uppercase tracking-tight text-base md:text-lg">
                                    {faq.q}
                                </h3>
                                <span className="text-white/40 group-hover:text-white transition-colors duration-200 shrink-0 text-2xl font-light leading-none w-6 text-center">
                                    {openIndex === i ? "−" : "+"}
                                </span>
                            </button>

                            {/* Answer panel */}
                            {openIndex === i && (
                                <div className="px-2 pb-8">
                                    <p className="text-white/60 text-base leading-relaxed max-w-2xl">
                                        {faq.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Closing border */}
                    <div className="border-t border-white/10" />
                </div>
            </div>
        </section>
    );
}
