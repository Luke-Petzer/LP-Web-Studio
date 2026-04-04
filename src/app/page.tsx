import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/organisms/Navigation";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { CoreCapabilitiesSection } from "@/components/organisms/CoreCapabilitiesSection";
import { B2BCallout } from "@/components/organisms/B2BCallout";
import { TestimonialSection } from "@/components/organisms/TestimonialSection";
import { FounderSection } from "@/components/organisms/FounderSection";
import { PricingSection } from "@/components/organisms/PricingSection";
import { ContactPageContent } from "@/components/organisms/ContactPageContent";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/components/seo/SchemaTemplates";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "LP Web Studio | Custom B2B Portals & Automations",
    description: "We engineer custom B2B ordering portals and automated SaaS systems for scaling businesses. High-performance infrastructure designed to eliminate manual admin.",
};

const homepageFaqs = [
    {
        question: "How much does a custom website cost?",
        answer:
            "Custom websites at LP Web Studio range from R5,500 for a professional 1-page site to R21,500+ for complex multi-page web applications and B2B systems built on Next.js.",
    },
    {
        question: "Do you use WordPress or custom code?",
        answer:
            "We specialize in custom-coded React and Next.js websites for superior speed and security. No templates, no bloat.",
    },
    {
        question: "How long does it take to build a website?",
        answer:
            "A Starter site takes 3-5 business days. A Professional site takes 1-2 weeks. Custom systems take 2-4 weeks depending on scope.",
    },
    {
        question: "Do you guarantee a 90+ PageSpeed score?",
        answer:
            "Yes. Every website we build is performance-tested before launch. If it doesn't hit 90+ on Google PageSpeed Insights, we optimize until it does.",
    },
];

/*
  Section narrative — colour rhythm:
  1. Hero        #F5F2F2  light   HOOK      — unexpected light start
  2. Process     #0d0d0d  dark    METHOD    — dramatic shift, sticky scroll
  3. Capabilities #2B2A2A dark   WHAT      — dark continuation
  4. B2BCallout  #FEB05D  amber   PROOF     — amber punctuation
  5. Testimonial #F5F2F2  light   TRUST     — warm, human
  6. Founder     #0d0d0d  dark    CONVICTION — the human behind the studio
  7. Pricing     #2B2A2A  dark    DECISION  — serious
  7. Contact     #F5F2F2  light   ACTION    — open, welcoming
*/
export default function HomePage() {
    return (
        <>
            <JsonLd data={faqPageSchema(homepageFaqs)} />

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
                    <B2BCallout />
                </Suspense>
                <Suspense>
                    <TestimonialSection />
                </Suspense>
                <Suspense>
                    <FounderSection />
                </Suspense>
                <Suspense>
                    <PricingSection />
                </Suspense>
                <Suspense>
                    <section id="contact" style={{ backgroundColor: "#F5F2F2" }}>
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
