import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
    title: "Privacy Notice | LP Web Studio",
    description:
        "How LP Web Studio handles contact form data, analytics, and your privacy. Cape Town web development studio — no ad tracking, no third-party data sales.",
    alternates: {
        canonical: "https://lpwebstudio.co.za/privacy",
    },
    openGraph: {
        url: "https://lpwebstudio.co.za/privacy",
        title: "Privacy Notice | LP Web Studio",
        description:
            "How LP Web Studio handles contact form data, analytics, and your privacy.",
    },
};

const LAST_UPDATED = "17 April 2026";

export default function PrivacyPage() {
    return (
        <>
            <Navigation />
            <main
                style={{ background: "#0A0A0A", minHeight: "100vh" }}
                className="pt-[120px] pb-24 px-6 md:px-12"
            >
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p
                            style={{
                                color: "#FF4500",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-space-grotesk)",
                                marginBottom: "12px",
                            }}
                        >
                            LEGAL / PRIVACY
                        </p>
                        <h1
                            className="font-headline font-black uppercase text-white leading-none"
                            style={{
                                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            PRIVACY<br />NOTICE.
                        </h1>
                        <p
                            className="text-white/55 mt-4 max-w-xl leading-relaxed"
                            style={{
                                fontSize: "13px",
                                fontFamily: "var(--font-space-grotesk)",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                            }}
                        >
                            Last updated: {LAST_UPDATED}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="flex flex-col gap-12 border-t border-white/10 pt-12">
                        <Section
                            eyebrow="01 / WHO WE ARE"
                            title="THE STUDIO"
                        >
                            <p>
                                LP Web Studio is a Cape Town-based web development and
                                automation studio operated by Luke Petzer. We build custom
                                Next.js websites and n8n automation systems for South African
                                businesses.
                            </p>
                            <p>
                                Questions about this notice or your data can be sent to{" "}
                                <a
                                    href="mailto:contact@lpwebstudio.co.za"
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    contact@lpwebstudio.co.za
                                </a>
                                .
                            </p>
                        </Section>

                        <Section
                            eyebrow="02 / CONTACT FORM"
                            title="WHAT THE CONTACT FORM COLLECTS"
                        >
                            <p>
                                When you submit the contact form on this site, we collect the
                                details you provide: typically your name, email address,
                                company name (optional), and the message you write. We use
                                these details only to reply to your enquiry and scope a
                                potential project.
                            </p>
                            <p>
                                Submissions are forwarded to our internal workflow tool (an
                                n8n webhook) which emails the message to Luke. We do not
                                resell or share contact form data with third parties.
                            </p>
                        </Section>

                        <Section
                            eyebrow="03 / ANALYTICS"
                            title="HOW WE MEASURE THE SITE"
                        >
                            <p>
                                This site uses Vercel Analytics and Vercel Speed Insights to
                                measure aggregate page views and Core Web Vitals. Both are{" "}
                                <strong className="text-white">cookieless</strong> and do not
                                track you across other websites.
                            </p>
                            <p>
                                We do not use Google Analytics, Meta Pixel, or any third-party
                                advertising trackers. There is no behavioural advertising on
                                this site.
                            </p>
                        </Section>

                        <Section
                            eyebrow="04 / COOKIES"
                            title="COOKIES"
                        >
                            <p>
                                The site does not set marketing or tracking cookies. The only
                                cookies that may appear are strictly-necessary ones used by
                                our hosting provider (Vercel) for fraud protection and
                                infrastructure.
                            </p>
                        </Section>

                        <Section
                            eyebrow="05 / YOUR RIGHTS"
                            title="ACCESS, CORRECTION, DELETION"
                        >
                            <p>
                                Under South Africa&rsquo;s POPIA and equivalent regulations,
                                you have the right to request access to the personal
                                information we hold about you, ask us to correct it, or ask
                                us to delete it.
                            </p>
                            <p>
                                Send any such request to{" "}
                                <a
                                    href="mailto:contact@lpwebstudio.co.za"
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    contact@lpwebstudio.co.za
                                </a>{" "}
                                and we will action it within a reasonable timeframe.
                            </p>
                        </Section>

                        <Section
                            eyebrow="06 / CHANGES"
                            title="CHANGES TO THIS NOTICE"
                        >
                            <p>
                                If we update how we handle data we will update this page and
                                adjust the &ldquo;last updated&rdquo; date at the top.
                            </p>
                        </Section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

interface SectionProps {
    eyebrow: string;
    title: string;
    children: React.ReactNode;
}

function Section({ eyebrow, title, children }: SectionProps) {
    return (
        <section className="border-b border-white/10 pb-12 last:border-b-0">
            <p
                style={{
                    color: "#FF4500",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-space-grotesk)",
                    marginBottom: "12px",
                }}
            >
                {eyebrow}
            </p>
            <h2
                className="font-headline font-bold uppercase text-white mb-6"
                style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                }}
            >
                {title}
            </h2>
            <div
                className="flex flex-col gap-4 text-white/70 leading-relaxed"
                style={{ fontSize: "15px" }}
            >
                {children}
            </div>
        </section>
    );
}
