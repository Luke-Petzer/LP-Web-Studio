import type { Metadata } from "next";
import { WorkPageContent } from "@/components/organisms/WorkPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Our Work | Cape Town Web Development Portfolio",
    description:
        "Case studies from LP Web Studio — custom React websites for Cape Town businesses including Cafe Crave and The Big Six. Real projects, real PageSpeed scores.",
    openGraph: {
        title: "Our Work | Cape Town Web Development Portfolio",
        description:
            "Case studies from LP Web Studio — custom React websites for Cape Town businesses including Cafe Crave and The Big Six. Real projects, real PageSpeed scores.",
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
