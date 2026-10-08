import type { Metadata } from "next";
import { AboutPageContent } from "@/components/organisms/AboutPageContent";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/components/seo/SchemaTemplates";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "About | Luke Petzer, Systems Builder — Cape Town",
    description:
        "Luke Petzer builds ordering portals, client platforms and automations for South African businesses. Honours-trained, one person from scope to launch.",
    alternates: {
        canonical: `${SITE_URL}/about`,
    },
    openGraph: {
        url: `${SITE_URL}/about`,
        title: "About | Luke Petzer, Systems Builder — Cape Town",
        description:
            "Luke Petzer builds the ordering portals, client platforms, and automations that replace manual admin for South African businesses.",
        images: ["/og-image.png"],
    },
};

export default function AboutPage() {
    return (
        <>
            <JsonLd data={personSchema()} />
            <Navigation />
            <main className="pb-structural">
                <SubpageHero
                    title="ABOUT"
                    heading="Luke Petzer, Cape Town systems builder"
                    subtitle="THE PERSON BUILDING YOUR SYSTEM"
                />
                <AboutPageContent />
            </main>
            <Footer />
        </>
    );
}
