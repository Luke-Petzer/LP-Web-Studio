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
        question: "What does a custom website cost in Cape Town?",
        answer: "LP Web Studio offers three packages. A starter 1-page website costs R5,500 once-off plus R350/month hosting. A professional 3-page website with booking automation costs R12,500. Custom web applications start from R21,500.",
    },
    {
        question: "How long does a website take to build?",
        answer: "Standard websites take 1-2 weeks once content and requirements are confirmed. Custom web applications and automation systems take 2-6 weeks depending on complexity.",
    },
    {
        question: "Do you work with businesses outside Cape Town?",
        answer: "Yes. We work with businesses across South Africa and internationally. Discovery calls are online and projects are delivered remotely.",
    },
    {
        question: "What industries do you work with?",
        answer: "We work with any business that needs a serious online presence or wants to automate their operations — particularly manufacturing, trade services, hospitality, and B2B companies.",
    },
    {
        question: "What makes LP Web Studio different from other web agencies?",
        answer: "You speak directly to the engineer building your system — not a sales rep or account manager. Every build is hand-coded in Next.js, comes with a 90+ PageSpeed guarantee, and you own the code outright with no lock-in.",
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
