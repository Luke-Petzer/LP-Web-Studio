import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    // Matches what the page holds: one hospitality site, labelled the narrow exception.
    title: "Client Work | Cafe Crave Website Case Study",
    description:
        "Cafe Crave website rebuild: React, live Google Reviews and a menu the owner never has to touch. Our one hospitality exception; for systems, see Products.",
    alternates: {
        canonical: `${SITE_URL}/work`,
    },
    openGraph: {
        url: `${SITE_URL}/work`,
        title: "Client Work | Cafe Crave Website Case Study",
        description:
            "Cafe Crave website rebuild: React, live Google Reviews and a menu the owner never has to touch. Our one hospitality exception; for systems, see Products.",
        images: ["/og-image.png"],
    },
};

const cafeCraveSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Cafe Crave Website",
    description:
        "Custom React website built for Cafe Crave, a halaal cafe and vinyl music hub in Claremont, Cape Town, with live Google Reviews integration and a mobile-first design — a narrow exception to LP Web Studio's current work, kept on an ongoing care plan.",
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
