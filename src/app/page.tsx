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
import { FinalCTA } from "@/components/organisms/FinalCTA";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "LP Web Studio | Custom Websites & Automation Systems Cape Town",
    description: "We build high-performance Next.js websites and automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed, real results.",
    openGraph: {
        title: "LP Web Studio | Custom Websites & Automation Systems Cape Town",
        description: "We build high-performance Next.js websites and automation systems for Cape Town businesses. Hand-coded, 90+ PageSpeed guaranteed, real results.",
    },
};

const homepageFaqs = [
    {
        question: "How long does a custom system take to deploy?",
        answer: "A standard web application takes 1–2 weeks. Complex B2B portals and automation systems take 2–4 weeks depending on integrations and scope.",
    },
    {
        question: "Do I need to maintain the infrastructure?",
        answer: "No. Hosting, deployments, and ongoing performance monitoring are handled by us. You focus on the business — we keep the engine running.",
    },
    {
        question: "What happens after I request an audit?",
        answer: "We schedule a 30-minute discovery call, map your current workflow, identify the biggest bottlenecks, and deliver a written architecture blueprint within 48 hours.",
    },
];
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
                {/* 10. Final CTA */}
                <Suspense><FinalCTA /></Suspense>
            </main>

            <Suspense>
                <Footer />
            </Suspense>
        </>
    );
}
