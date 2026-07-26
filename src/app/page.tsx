import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/organisms/Navigation";
import { HeroSection } from "@/components/organisms/HeroSection";
import { MetricsBanner } from "@/components/organisms/MetricsBanner";
import { ArchitecturalMethod } from "@/components/organisms/ArchitecturalMethod";
import { CoreInfrastructure } from "@/components/organisms/CoreInfrastructure";
import { ScaleBanner } from "@/components/organisms/ScaleBanner";
import { B2BPlatform } from "@/components/organisms/B2BPlatform";
import { TestimonialSection } from "@/components/organisms/TestimonialSection";
import { FounderSection } from "@/components/organisms/FounderSection";
import { FAQSection } from "@/components/organisms/FAQSection";
import { LatestWriting } from "@/components/organisms/LatestWriting";
import { FinalCTA } from "@/components/organisms/FinalCTA";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";
import { homepageFaqs } from "@/lib/faq-data";

export const revalidate = 3600;

export const metadata: Metadata = {
    // `absolute` — the root layout template already appends "| LP Web Studio".
    title: { absolute: "LP Web Studio | Ordering Systems, Client Portals & Business Automation" },
    description: "We build the systems that run your business — ordering portals, client platforms, and automations that replace manual admin. Custom builds from R35,000.",
    openGraph: {
        title: "LP Web Studio | Ordering Systems, Client Portals & Business Automation",
        description: "We build the systems that run your business — ordering portals, client platforms, and automations that replace manual admin. Custom builds from R35,000.",
    },
};

export default function HomePage() {
    return (
        <>
            <JsonLd data={faqPageSchema(homepageFaqs)} />

            <Suspense>
                <Navigation />
            </Suspense>

            <main>
                {/* 1. Hero */}
                <Suspense><HeroSection /></Suspense>
                {/* 2. Metrics */}
                <Suspense><MetricsBanner /></Suspense>
                {/* 3. Core Infrastructure */}
                <Suspense><CoreInfrastructure /></Suspense>
                {/* 4. Architectural Method */}
                <Suspense><ArchitecturalMethod /></Suspense>
                {/* 5. Scale Banner */}
                <Suspense><ScaleBanner /></Suspense>
                {/* Visual break */}
                <div className="bg-obsidian py-16 md:py-20">
                    <div className="border-t border-white/5 mx-8 md:mx-12" />
                </div>
                {/* 6. Testimonial */}
                <Suspense><TestimonialSection /></Suspense>
                {/* 7. B2B Platform */}
                <Suspense><B2BPlatform /></Suspense>
                {/* 8. Founder */}
                <Suspense><FounderSection /></Suspense>
                {/* 9. FAQ */}
                <Suspense><FAQSection /></Suspense>
                {/* 10. Latest Writing */}
                <Suspense><LatestWriting /></Suspense>
                {/* 11. Final CTA */}
                <Suspense><FinalCTA /></Suspense>
            </main>

            <Suspense>
                <Footer />
            </Suspense>
        </>
    );
}
