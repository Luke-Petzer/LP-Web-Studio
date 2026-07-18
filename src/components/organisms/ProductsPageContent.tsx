// src/components/organisms/ProductsPageContent.tsx
"use client";

import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { useDrawer } from "@/lib/contact-drawer-context";

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL;

const platformCards = [
    {
        label: "01 / What It Replaces",
        title: "WhatsApp orders, spreadsheet pricing, and PDF price lists.",
        body: "Clients get a secure login, a live synced catalogue, and custom pricing — no more re-typing an order from a chat thread.",
    },
    {
        label: "02 / How It Works",
        title: "A branded ordering portal, installable as an app on your customers' phones.",
        body: "Your branding, your catalogue, credit or EFT checkout, and an admin dashboard — delivered as your own instance with its own database and subdomain.",
    },
    {
        label: "03 / What You Get",
        title: "Orders that route themselves. Nothing lost in a chat thread.",
        body: "The moment a client submits an order, it routes straight to your admin dashboard — no staff member touches a keyboard, nothing gets re-typed twice.",
    },
];

const platformTiers = [
    {
        name: "Tier 1 — Branded Ordering Platform",
        setup: "R12,500",
        setupNote: "setup",
        monthly: "R1,950/mo",
        monthlyNote: "hosting, care, updates, monitoring",
        features: [
            "Your branding, catalogue, and custom per-client pricing",
            "Credit or EFT checkout",
            "Admin dashboard",
            "Installs on your customers' phones (PWA)",
            "Your own instance — own database, own subdomain or domain",
        ],
    },
    {
        name: "Tier 2 — Payments Add-on",
        setup: "R6,500",
        setupNote: "setup",
        monthly: "+R450/mo",
        monthlyNote: "provider webhooks, reconciliation, support",
        features: [
            "Payment links on orders and invoices",
            "Hosted checkout — client clicks Pay, done",
            "Instant-EFT and card support via a licensed payment provider",
            "Flat fees only — we never take a percentage of your transactions",
        ],
    },
];

const lpOsPoints = [
    {
        label: "01",
        title: "One Dashboard, Not Ten Tabs",
        body: "Clients, invoices, projects, and pipeline in one place instead of scattered across spreadsheets, WhatsApp, and email.",
    },
    {
        label: "02",
        title: "Built By Running A Business On It",
        body: "lp-os is the system LP Web Studio runs on day to day — every feature exists because it solved a real operational problem first.",
    },
    {
        label: "03",
        title: "Pilot Programme",
        body: "lp-os is not yet a public product. A small number of businesses are being onboarded directly as pilot partners — reach out if you want in early.",
    },
];

export function ProductsPageContent() {
    const { openDrawer } = useDrawer();

    return (
        <div className="relative">
            <GeometricCanvas />
            <SubpageHero
                title="PRODUCTS"
                subtitle="SYSTEMS YOU CAN SEE BEFORE YOU BUY"
            />

            {/* ═══════════════════════════════════════
                SECTION 1 — B2B ORDERING PLATFORM
            ═══════════════════════════════════════ */}
            <section
                aria-label="B2B Ordering Platform"
                className="relative isolate py-24 md:py-32 px-8 md:px-12 bg-slate-dark border-t border-white/5"
            >
                <div className="section-geo-lines" aria-hidden="true" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <span className="mono-label">01 — Live Product</span>
                            <h2
                                className="font-headline font-bold uppercase tracking-[-0.04em] text-white mt-4"
                                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                            >
                                B2B Ordering<br />Platform
                            </h2>
                        </div>
                        <p className="text-white/60 text-base leading-relaxed max-w-md">
                            A branded ordering portal for wholesalers and distributors —
                            replaces WhatsApp order chaos with a self-serve system your
                            clients can use 24/7.
                        </p>
                    </div>

                    {/* Problem/solution/outcome cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {platformCards.map((card) => (
                            <div key={card.label} className="dark-card p-6 md:p-8 flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <span className="mono-label">{card.label}</span>
                                    <div className="w-10 h-px bg-white/20 mt-3" />
                                </div>
                                <div className="mt-8">
                                    <h3
                                        className="font-headline font-bold uppercase tracking-tight text-white mb-4"
                                        style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {card.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Demo CTA — gracefully hidden if NEXT_PUBLIC_DEMO_URL is unset */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20">
                        {DEMO_URL ? (
                            <a
                                href={DEMO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-cta-orange px-10 py-5 text-center"
                            >
                                See the Platform in Action
                            </a>
                        ) : (
                            <button
                                type="button"
                                disabled
                                aria-disabled="true"
                                title="Demo link coming soon"
                                className="btn-ghost px-10 py-5 text-center opacity-40 cursor-not-allowed"
                            >
                                Demo Coming Soon
                            </button>
                        )}
                        <button
                            onClick={openDrawer}
                            className="btn-ghost px-10 py-5 text-center"
                        >
                            Book a Discovery Call
                        </button>
                    </div>

                    {/* Pricing — Tier 1 + Tier 2 only */}
                    <div>
                        <span className="mono-label">Pricing</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            {platformTiers.map((tier) => (
                                <div key={tier.name} className="dark-card p-8 flex flex-col gap-6">
                                    <div>
                                        <h3 className="font-headline font-bold uppercase text-white text-lg mb-1">
                                            {tier.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span
                                            className="font-headline font-black text-white leading-none"
                                            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                                        >
                                            {tier.setup}
                                        </span>
                                        <span className="mono-label">{tier.setupNote}</span>
                                    </div>
                                    <div className="flex items-baseline gap-3 flex-wrap -mt-2">
                                        <span className="font-headline font-bold text-[#FF4D00] text-xl">
                                            {tier.monthly}
                                        </span>
                                        <span className="mono-label">{tier.monthlyNote}</span>
                                    </div>
                                    <ul className="flex flex-col gap-2 border-t border-white/10 pt-6">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="text-white/60 text-sm leading-relaxed flex gap-2">
                                                <span className="text-[#FF4D00] shrink-0" aria-hidden="true">→</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/40 text-xs mt-6 max-w-2xl leading-relaxed">
                            You own your data — full export on exit. Setup + monthly figures
                            above are current pricing; final quote confirmed on your discovery
                            call once we know your catalogue size and workflow.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                SECTION 2 — LP-OS
            ═══════════════════════════════════════ */}
            <section
                aria-label="lp-os"
                className="relative py-24 md:py-32 px-8 md:px-12 bg-obsidian border-t border-white/5"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div>
                            <span className="mono-label">02 — Internal Product / Pilot</span>
                            <h2
                                className="font-headline font-bold uppercase tracking-[-0.04em] text-white mt-4"
                                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
                            >
                                lp-os
                            </h2>
                        </div>
                        <p className="text-white/60 text-base leading-relaxed max-w-md">
                            A business command centre — the internal operating system LP Web
                            Studio uses to run clients, projects, and admin without the
                            spreadsheet sprawl.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {lpOsPoints.map((point) => (
                            <div key={point.label} className="dark-card p-6 md:p-8 flex flex-col gap-4">
                                <span className="mono-label">{point.label}</span>
                                <h3 className="font-headline font-bold uppercase tracking-tight text-white text-lg">
                                    {point.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {point.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <button onClick={openDrawer} className="btn-primary px-10 py-5 text-center">
                            Ask About the Pilot Programme
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
