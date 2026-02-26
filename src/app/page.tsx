import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/organisms/Navigation";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { CoreCapabilitiesSection } from "@/components/organisms/CoreCapabilitiesSection";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { SpeedRevenueBanner } from "@/components/organisms/SpeedRevenueBanner";
import { PricingSection } from "@/components/organisms/PricingSection";
import { TestimonialSection } from "@/components/organisms/TestimonialSection";
import { ContactPageContent } from "@/components/organisms/ContactPageContent";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";

/**
 * Protocol §7: ISR — Incremental Static Regeneration for load-shedding resilience.
 * Page is statically generated and revalidated every hour.
 */
export const revalidate = 3600;

/* ─── Homepage FAQs for FAQPage Schema ─── */
const homepageFaqs = [
    {
        question: "How much does a custom website cost?",
        answer:
            "Custom websites at LP Web Studio range from R2,500 for a professional 1-page site to R7,500+ for complex multi-page web applications built on Next.js.",
    },
    {
        question: "Do you use WordPress or custom code?",
        answer:
            "We specialize in custom-coded React and Next.js websites for superior speed and security, but we can integrate headless CMS options.",
    },
    {
        question: "How long does it take to build a website?",
        answer:
            "A Starter Template takes 3-5 business days. A Professional site takes 1-2 weeks. High-Performance builds take 2-4 weeks depending on complexity.",
    },
    {
        question: "Do you guarantee a 90+ PageSpeed score?",
        answer:
            "Yes. Every website we build is performance-tested before launch. If it doesn't hit 90+ on Google PageSpeed Insights, we optimize until it does.",
    },
];

export default function HomePage() {
    return (
        <>
            {/* SEO Layer 3: Homepage FAQPage Schema */}
            <JsonLd data={faqPageSchema(homepageFaqs)} />

            {/* Protocol §7: Suspense boundaries for load-shedding resilience */}
            <Suspense>
                <Navigation />
            </Suspense>

            <main>
                <Suspense>
                    <HeroSection />
                </Suspense>
                <Suspense>
                    <ProcessSection />
                </Suspense>
                <Suspense>
                    <CoreCapabilitiesSection />
                </Suspense>
                <Suspense>
                    <PortfolioSection />
                </Suspense>
                <Suspense>
                    <SpeedRevenueBanner />
                </Suspense>
                <Suspense>
                    <PricingSection />
                </Suspense>
                <Suspense>
                    <TestimonialSection />
                </Suspense>
                <Suspense>
                    <section id="contact" className="bg-white py-structural px-6">
                        <ContactPageContent />
                    </section>
                </Suspense>
            </main>

            <Suspense>
                <Footer />
            </Suspense>
        </>
    );
}
