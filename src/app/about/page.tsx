import type { Metadata } from "next";
import { AboutPageContent } from "@/components/organisms/AboutPageContent";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/components/seo/SchemaTemplates";

export const metadata: Metadata = {
    title: "About | Luke Petzer, Systems Builder — Cape Town",
    description:
        "Luke Petzer builds the ordering portals, client platforms, and automations that replace manual admin for South African businesses. Honours computer science background, ships production systems solo.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/about",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/about",
        title: "About | Luke Petzer, Systems Builder — Cape Town",
        description:
            "Luke Petzer builds the ordering portals, client platforms, and automations that replace manual admin for South African businesses.",
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
                    subtitle="THE PERSON BUILDING YOUR SYSTEM"
                />
                <AboutPageContent />
            </main>
            <Footer />
        </>
    );
}
