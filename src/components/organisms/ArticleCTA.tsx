"use client";

import { useDrawer } from "@/lib/contact-drawer-context";

/**
 * Closing call to action for /learn articles: one in-content link to the
 * offer page the article leads into, and the discovery-call drawer.
 *
 * Client component only because opening the contact drawer needs context; the
 * article page itself stays a Server Component. Both live articles are about
 * ordering systems, so the offer page is /products (the B2B ordering platform).
 */
export function ArticleCTA() {
    const { openDrawer } = useDrawer();

    return (
        <section
            aria-label="Next step"
            className="mt-20 md:mt-24 pt-16 border-t border-white/10"
        >
            <span className="section-label mb-6">NEXT STEP</span>
            <h2
                className="font-headline font-black uppercase text-white leading-[0.95] mt-6 mb-6"
                style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    letterSpacing: "-0.02em",
                }}
            >
                See how the ordering<br />platform works.
            </h2>
            <p
                className="text-white/70 leading-relaxed mb-10 max-w-xl"
                style={{ fontSize: "17px" }}
            >
                A branded B2B ordering portal for wholesalers and distributors: your
                pricing, your catalogue, orders that route straight to your team.
                Pricing is public, and the discovery call is free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <a
                    href="/products"
                    className="btn-cta-orange px-10 py-5 w-full sm:w-auto text-center"
                    style={{ textDecoration: "none" }}
                >
                    See the ordering platform
                </a>
                <button
                    type="button"
                    onClick={openDrawer}
                    className="btn-ghost px-10 py-5 w-full sm:w-auto text-center"
                >
                    Book a discovery call
                </button>
            </div>
        </section>
    );
}
