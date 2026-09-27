import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    // Bare title — the root layout template appends "| LP Web Studio".
    title: "Accessibility Statement",
    description:
        "LP Web Studio's accessibility statement — how the site aims to meet WCAG 2.2 AA, what's in place today, known limitations, and how to report a problem.",
    alternates: {
        canonical: `${SITE_URL}/accessibility`,
    },
    openGraph: {
        url: `${SITE_URL}/accessibility`,
        title: "Accessibility Statement | LP Web Studio",
        description:
            "How this site aims to meet WCAG 2.2 AA, what's in place, and known limitations.",
        images: ["/og-image.png"],
    },
};

const LAST_UPDATED = "27 September 2026";
const CONTACT_EMAIL = "contact@lpwebstudio.co.za";

export default function AccessibilityPage() {
    return (
        <>
            <Navigation />
            <main
                style={{ background: "#0A0A0A", minHeight: "100dvh" }}
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
                            LEGAL / ACCESSIBILITY
                        </p>
                        <h1
                            className="font-headline font-black uppercase text-white leading-none"
                            style={{
                                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            ACCESSIBILITY<br />STATEMENT.
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
                            eyebrow="01 / COMMITMENT"
                            title="OUR COMMITMENT"
                        >
                            <p>
                                LP Web Studio aims for this site to meet the{" "}
                                <strong className="text-white">
                                    Web Content Accessibility Guidelines (WCAG) 2.2, Level AA
                                </strong>
                                . That is a target, not a claim: we have not commissioned a
                                formal accessibility audit, so we do not state that the site
                                conforms to WCAG 2.2 AA.
                            </p>
                            <p>
                                No South African law specifically requires a private business
                                site like this one to meet WCAG. We follow it anyway, because
                                it is good practice and because it makes the site work better
                                for more people.
                            </p>
                        </Section>

                        <Section
                            eyebrow="02 / WHAT'S IN PLACE"
                            title="WHAT WE'VE VERIFIED"
                        >
                            <p>
                                The following is confirmed by reading the site&rsquo;s code and
                                rendered markup — not by testing with real assistive
                                technology (see section 03):
                            </p>
                            <ul className="flex flex-col gap-3 pl-5 list-disc marker:text-white/30">
                                <li>
                                    <strong className="text-white">Semantic landmarks.</strong>{" "}
                                    Every page has a proper <code>header</code>,{" "}
                                    <code>nav</code>, <code>main</code>, and <code>footer</code>,
                                    so screen reader and keyboard users can jump straight to
                                    the part of the page they want.
                                </li>
                                <li>
                                    <strong className="text-white">Keyboard-operable navigation.</strong>{" "}
                                    Every nav link and button is a native{" "}
                                    <code>a</code> or <code>button</code> element, reachable and
                                    operable with the keyboard alone. The mobile menu panel is
                                    marked inert while closed, so it can&rsquo;t trap focus.
                                </li>
                                <li>
                                    <strong className="text-white">Keyboard-operable contact form.</strong>{" "}
                                    The &ldquo;Contact&rdquo; drawer is a labelled dialog that
                                    traps Tab focus inside itself while open, closes on{" "}
                                    <kbd className="text-white/80">Escape</kbd>, and returns
                                    focus to whatever you clicked to open it.
                                </li>
                                <li>
                                    <strong className="text-white">Visible focus styles.</strong>{" "}
                                    Tabbing through the site shows a clear orange focus outline
                                    on every interactive element — it is never suppressed.
                                </li>
                                <li>
                                    <strong className="text-white">Alt text on images.</strong>{" "}
                                    Every image we checked (logo, founder photo, project
                                    screenshots) carries a descriptive alt attribute.
                                </li>
                                <li>
                                    <strong className="text-white">Reduced-motion handling.</strong>{" "}
                                    If your system is set to reduce motion, page transitions,
                                    hover animations, the navigation/contact-drawer animations,
                                    and the Work page&rsquo;s project-preview video are all
                                    shortened or stopped &mdash; the video holds on its first
                                    frame instead of autoplaying.
                                </li>
                                <li>
                                    <strong className="text-white">Body text contrast.</strong>{" "}
                                    The main paragraph text and the &ldquo;last updated&rdquo;
                                    byline on pages like this one meet or exceed the 4.5:1
                                    contrast ratio WCAG AA requires for normal text against the
                                    site&rsquo;s near-black background.
                                </li>
                                <li>
                                    <strong className="text-white">Low-contrast labels raised.</strong>{" "}
                                    Several small-print text styles (form field labels, footer
                                    copyright text, small uppercase tags) used to render as low
                                    as roughly 2.6:1 against the site&rsquo;s dark backgrounds.
                                    We raised the white text used for these labels from
                                    30&ndash;40% opacity to 50%, which measures 5.17&ndash;5.34:1
                                    across every dark background we use it on &mdash; comfortably
                                    clear of the 4.5:1 AA minimum for normal text.
                                </li>
            </ul>
                        </Section>

                        <Section
                            eyebrow="03 / KNOWN LIMITATIONS"
                            title="WHAT WE KNOW ISN'T THERE YET"
                        >
                            <p>
                                We would rather list what we know is wrong than claim more
                                than we can back up:
                            </p>
                            <ul className="flex flex-col gap-3 pl-5 list-disc marker:text-white/30">
                                <li>
                                    <strong className="text-white">
                                        One low-contrast label remains.
                                    </strong>{" "}
                                    We found and raised several low-contrast label styles
                                    across the site (see section 02), but one is still below
                                    the 4.5:1 bar: the small &ldquo;or reach us directly&rdquo;
                                    label inside the contact drawer, set at 25% white opacity,
                                    which measures roughly 2.2:1 against its background. It is
                                    on our list to fix.
                                </li>
                                <li>
                                    <strong className="text-white">
                                        Autoplaying video with no pause control.
                                    </strong>{" "}
                                    The project-preview videos on the Work page still autoplay,
                                    loop, and are muted, with no visible button to pause them,
                                    for anyone who has not asked their device to reduce motion.
                                    If your system is set to reduce motion, though, the video
                                    no longer autoplays — it holds on its first frame instead.
                                </li>
                                <li>
                                    <strong className="text-white">
                                        Not yet tested with a screen reader.
                                    </strong>{" "}
                                    We have checked the underlying markup, but we have not yet
                                    tested the live site with NVDA, JAWS, VoiceOver, or
                                    TalkBack. We treat that as untested, not passing.
                                </li>
                                <li>
                                    <strong className="text-white">
                                        No formal accessibility audit.
                                    </strong>{" "}
                                    Everything above comes from our own review, not an
                                    independent audit.
                                </li>
                            </ul>
                        </Section>

                        <Section
                            eyebrow="04 / FEEDBACK"
                            title="TELL US WHAT'S NOT WORKING"
                        >
                            <p>
                                If any part of this site is difficult to use because of a
                                disability, we want to know — and we&rsquo;d rather hear about
                                it than have you just give up and leave.
                            </p>
                            <p>
                                Email{" "}
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                                {" "}and, if you can, include: the page you were on, what you
                                were trying to do, what device and browser (or assistive
                                technology) you were using, and what went wrong. We will
                                respond within 30 days, consistent with how we handle other
                                requests under our{" "}
                                <a
                                    href="/privacy"
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    privacy notice
                                </a>
                                .
                            </p>
                        </Section>

                        <Section
                            eyebrow="05 / REVIEW"
                            title="KEEPING THIS CURRENT"
                        >
                            <p>
                                This statement describes the site as it stood on{" "}
                                {LAST_UPDATED}. We review and update it whenever the site
                                changes in a way that affects accessibility.
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
