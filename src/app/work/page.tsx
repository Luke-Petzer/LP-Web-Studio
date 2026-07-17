import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Case Studies | Custom Ordering Systems & Client Platforms",
    description:
        "How LP Web Studio replaces manual admin with real systems — including a B2B ordering platform live in production and the Cafe Crave rebuild.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/work",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/work",
        title: "Case Studies | Custom Ordering Systems & Client Platforms",
        description:
            "How LP Web Studio replaces manual admin with real systems — including a B2B ordering platform live in production and the Cafe Crave rebuild.",
    },
};

const cafeCraveSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Cafe Crave Website",
    description:
        "Custom React and Next.js website built for Cafe Crave, a Cape Town specialty coffee shop. Features live Google Reviews integration, mobile-first design, and a 93/100 PageSpeed score.",
    url: "https://cafecravecpt.co.za",
    creator: { "@type": "Organization", name: "LP Web Studio" },
    keywords:
        "restaurant website Cape Town, cafe website, Google Reviews integration",
};

export default function WorkPage() {
    return (
        <>
            <JsonLd data={cafeCraveSchema} />
            <Navigation />
            <main className="pb-structural">
                <WorkPageContent />
            </main>
            <Footer />
        </>
    );
}
