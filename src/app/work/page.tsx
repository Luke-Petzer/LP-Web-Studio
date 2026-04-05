import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Our Work — LP Web Studio",
    description:
        "Real businesses. Real code. 90+ Performance Scores. Explore our portfolio of high-performance websites built for Cape Town small businesses.",
    openGraph: {
        title: "Our Work — LP Web Studio",
        description:
            "We don't just build. We benchmark. Real businesses, real code, 90+ scores.",
    },
};

export default function WorkPage() {
    return (
        <>
            <Navigation />
            <main className="pb-structural">
                <WorkPageContent />
            </main>
            <Footer />
        </>
    );
}
