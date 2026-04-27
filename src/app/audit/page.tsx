import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { AuditForm } from "@/components/organisms/AuditForm";

export const metadata: Metadata = {
    title: "Free Website Audit | LP Web Studio",
    description:
        "Free 5-point website audit — page speed, mobile, SEO, accessibility. Cape Town web development. Report emailed within 1-2 business days.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/audit",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/audit",
        title: "Free Website Audit | LP Web Studio",
        description:
            "Free 5-point website audit — page speed, mobile, SEO, accessibility.",
    },
};

const AUDIT_AREAS: Array<{ label: string; body: string }> = [
    {
        label: "PAGE_SPEED",
        body: "Core Web Vitals (LCP, INP, CLS), mobile load times, render-blocking resources",
    },
    {
        label: "MOBILE",
        body: "responsive breakpoints, touch targets, layout stability",
    },
    {
        label: "SEO",
        body: "meta tags, schema markup, indexing status, canonical URLs",
    },
    {
        label: "ACCESSIBILITY",
        body: "colour contrast, keyboard navigation, ARIA basics",
    },
    {
        label: "DELIVERY",
        body: "emailed within 1-2 business days. No spam.",
    },
];

export default function AuditPage() {
    return (
        <>
            <Navigation />
            <main className="pb-structural bg-[#0A0A0A] min-h-screen">
                <SubpageHero
                    title="AUDIT"
                    subtitle="FREE PERFORMANCE & VISIBILITY REPORT"
                />

                <section
                    aria-label="What the audit covers"
                    className="px-6 md:px-12 py-20 md:py-28"
                >
                    <div className="max-w-3xl mx-auto">
                        <p className="text-white/70 leading-relaxed mb-12 text-base md:text-lg">
                            Submit your URL. Within 1-2 business days, you&apos;ll receive a
                            written report covering five areas:
                        </p>

                        <div className="flex flex-col border-t border-white/10">
                            {AUDIT_AREAS.map((area) => (
                                <div
                                    key={area.label}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-white/10"
                                >
                                    <p
                                        className="md:col-span-3 mono-label"
                                        style={{ color: "rgba(255,255,255,0.35)" }}
                                    >
                                        {area.label}
                                    </p>
                                    <p className="md:col-span-9 text-white/70 text-sm md:text-base leading-relaxed">
                                        {area.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    aria-label="Audit request form"
                    className="px-6 md:px-12 pb-24 md:pb-32"
                >
                    <div className="max-w-xl mx-auto">
                        <h2
                            className="font-headline font-black uppercase text-white leading-none mb-8"
                            style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            REQUEST<br />YOUR AUDIT.
                        </h2>
                        <AuditForm />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
