"use client";

import { useState } from "react";
import { homepageFaqs as faqs } from "@/lib/faq-data";

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
                        <div key={faq.question} className="border-t border-white/10">
                            {/* Question row */}
                            <button
                                onClick={() => toggle(i)}
                                aria-expanded={openIndex === i}
                                className="w-full flex items-center justify-between gap-6 py-8 px-2 text-left group cursor-pointer hover:bg-white/5 transition-colors duration-200"
                            >
                                <h3 className="font-headline font-medium text-white/80 uppercase tracking-tight text-base md:text-lg">
                                    {faq.question}
                                </h3>
                                <span className="text-white/40 group-hover:text-white transition-colors duration-200 shrink-0 text-2xl font-normal leading-none w-6 text-center">
                                    {openIndex === i ? "−" : "+"}
                                </span>
                            </button>

                            {/* Answer panel — smooth height transition */}
                            <div
                                className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out ${
                                    openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-white/60 text-base leading-relaxed max-w-2xl px-2 pb-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Closing border */}
                    <div className="border-t border-white/10" />
                </div>
            </div>
        </section>
    );
}
