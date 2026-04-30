import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <>
            <Navigation />
            <main
                style={{ background: "#0A0A0A", minHeight: "100dvh" }}
                className="flex flex-col items-center justify-center px-6 md:px-12 text-center"
            >
                <p
                    style={{
                        color: "#FF4500",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-space-grotesk)",
                        marginBottom: "16px",
                    }}
                >
                    ERROR / 404
                </p>
                <h1
                    className="font-headline font-black uppercase text-white leading-none"
                    style={{
                        fontSize: "clamp(3rem, 10vw, 6rem)",
                        letterSpacing: "-0.03em",
                    }}
                >
                    ROUTE<br />NOT FOUND.
                </h1>
                <p
                    className="text-white/55 mt-6 max-w-md leading-relaxed"
                    style={{ fontSize: "15px" }}
                >
                    The page you&rsquo;re looking for has moved, been archived, or never
                    existed. Let&rsquo;s get you back to something real.
                </p>
                <a
                    href="/"
                    className="mt-10 inline-flex items-center gap-3 px-7 py-4 border border-white/15 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/5 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-white text-sm"
                >
                    Return home
                    <span aria-hidden="true">→</span>
                </a>
            </main>
            <Footer />
        </>
    );
}
