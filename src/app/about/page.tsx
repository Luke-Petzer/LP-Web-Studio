import type { Metadata } from "next";
import { AboutPageContent } from "@/components/organisms/AboutPageContent";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/components/seo/SchemaTemplates";

export const metadata: Metadata = {
    title: "About | Cape Town Next.js Developer — Luke Petzer",
    description:
        "Luke Petzer is a Cape Town-based web developer and automation engineer. Custom Next.js builds, n8n pipelines, and 90+ PageSpeed scores guaranteed. No agencies, no bloat.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/about",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/about",
        title: "About | Cape Town Next.js Developer — Luke Petzer",
        description:
            "Luke Petzer is a Cape Town-based web developer and automation engineer. Custom Next.js builds, n8n pipelines, and 90+ PageSpeed scores guaranteed.",
    },
};

export default function AboutPage() {
    return (
        <>
            <JsonLd data={personSchema()} />
            <Navigation />
            <main className="pb-structural">
                <SubpageHero
                    breadcrumb="LP WEB / INFRASTRUCTURE"
                    title="INFRASTRUCTURE"
                    subtitle="ENGINEERED FOR PERFORMANCE"
                />
                <AboutPageContent />
            </main>
            <Footer />
        </>
    );
}
