import type { Metadata } from "next";
import { AboutPageContent } from "@/components/organisms/AboutPageContent";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "About — LP Web Studio",
    description:
        "Cape Town's performance-first developer. Hand-coded Next.js websites — no WordPress, no drag-and-drop, no bloat. Just clean code and 90+ PageSpeed scores.",
    openGraph: {
        title: "About — LP Web Studio",
        description:
            "I build what page-builders can't. Hand-coded performance for Cape Town businesses.",
    },
};

export default function AboutPage() {
    return (
        <>
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
