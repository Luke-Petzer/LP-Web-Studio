import type { Metadata } from "next";
import { ContactPageContent } from "@/components/organisms/ContactPageContent";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Contact — LP Web Studio",
    description:
        "Stop losing leads. Start converting. WhatsApp us directly or request a free Core Web Vitals audit for your website.",
    openGraph: {
        title: "Contact — LP Web Studio",
        description:
            "Your competitors are already on WhatsApp. Are you? Get a free speed audit.",
    },
};

export default function ContactPage() {
    return (
        <>
            <Navigation />
            <main className="pt-[160px] pb-structural">
                <ContactPageContent />
            </main>
            <Footer />
        </>
    );
}
