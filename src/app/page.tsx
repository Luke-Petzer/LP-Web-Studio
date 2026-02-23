import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { PortfolioSection } from "@/components/organisms/PortfolioSection";
import { PricingSection } from "@/components/organisms/PricingSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";

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

            <Navigation />

            <main>
                <HeroSection />
                <ProcessSection />
                <PortfolioSection />
                <PricingSection />
                <ContactSection />
            </main>

            <Footer />
        </>
    );
}
