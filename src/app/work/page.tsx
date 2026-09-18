import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Case Studies | Custom Ordering Systems & Client Platforms",
    description:
        "How LP Web Studio replaces manual admin with real systems — including a B2B ordering platform live in production and the Cafe Crave rebuild.",
    alternates: {
        canonical: `${SITE_URL}/work`,
    },
    openGraph: {
        url: `${SITE_URL}/work`,
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
        "Custom React and Next.js hospitality website built for Cafe Crave, a Cape Town specialty coffee shop, with live Google Reviews integration and a mobile-first design — a narrow exception to LP Web Studio's current work, kept on an ongoing care plan.",
    url: "https://cafecravecpt.co.za",
    creator: { "@type": "Organization", name: "LP Web Studio" },
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
