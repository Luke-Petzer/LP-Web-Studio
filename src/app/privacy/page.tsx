import type { Metadata } from "next";
import { Navigation } from "@/components/organisms/Navigation";
import { Footer } from "@/components/organisms/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    // Bare title — the root layout template appends "| LP Web Studio".
    title: "Privacy Notice",
    description:
        "How LP Web Studio handles contact form data, analytics, and your privacy. Cape Town systems studio — no ad tracking, no third-party data sales.",
    alternates: {
        canonical: `${SITE_URL}/privacy`,
    },
    openGraph: {
        url: `${SITE_URL}/privacy`,
        title: "Privacy Notice | LP Web Studio",
        description:
            "How LP Web Studio handles contact form data, analytics, and your privacy.",
        images: ["/og-image.png"],
    },
};

const LAST_UPDATED = "28 July 2026";

/**
 * ⚠️ FILL THESE BEFORE DEPLOYING — every value marked TODO renders on the live page.
 *
 * These are the disclosures POPIA (Act 4 of 2013) and ECTA s43 expect a South African
 * business to publish. They are facts only Luke can confirm — do not guess them.
 *
 * Not legal advice. Have this page reviewed by an attorney before relying on it.
 */
const BUSINESS = {
    /** Legal trading name. If you incorporate a Pty Ltd later, update this. */
    legalName: "Luke Petzer, trading as LP Web Studio",
    /** "Sole proprietor" until CIPC registration completes, then "Private company (Pty) Ltd". */
    legalStatus: "Sole proprietor",
    /** TODO: CIPC registration number, or null while trading as a sole proprietor. */
    registrationNumber: null as string | null,
    /**
     * Deliberately omitted. ECTA s43 disclosure obligations attach to suppliers who
     * offer goods or services for sale BY WAY OF AN ELECTRONIC TRANSACTION — actual
     * e-commerce. This site describes services and invites contact; nothing is sold
     * or concluded through it, so s43 is not engaged. POPIA requires contact details
     * for data-subject requests, which the email address below satisfies; it has never
     * required a street address.
     *
     * If the site ever sells online, use a virtual office or registered-office address.
     * Never a home address.
     */
    physicalAddress: null as string | null,
    email: "contact@lpwebstudio.co.za",
    /** TODO: confirm this is the number you want published for legal notices. */
    phone: "+27 67 385 2286",
    /**
     * POPIA s55/56: every responsible party has an Information Officer. For a sole
     * proprietor that is the owner by default. Registration with the Regulator is
     * a separate step — TODO: confirm whether you have registered.
     */
    informationOfficer: "Luke Petzer",
    /**
     * TODO: CONFIRM. The contact form posts to a self-hosted n8n instance
     * (n8n.lpwebstudio.co.za). If that VPS is with netcup, the country is Germany.
     * This drives the POPIA s72 cross-border disclosure below — get it right.
     */
    workflowServerCountry: "Germany",
    /** How long contact-form enquiries are kept. POPIA s14: no longer than necessary. */
    enquiryRetention: "24 months",
} as const;

const REGULATOR = {
    name: "Information Regulator (South Africa)",
    complaintsEmail: "complaints.IR@justice.gov.za",
    generalEmail: "inforeg@justice.gov.za",
    phone: "010 023 5200",
    address: "JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001",
    website: "https://inforegulator.org.za",
} as const;

export default function PrivacyPage() {
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
                                LP Web Studio is a Cape Town-based systems studio operated by
                                Luke Petzer. We build custom ordering platforms, client portals,
                                and automation systems for South African businesses.
                            </p>
                            <p>
                                We are the Responsible Party for the personal information
                                described in this notice, as that term is used in South
                                Africa&rsquo;s Protection of Personal Information Act 4 of 2013
                                (&ldquo;POPIA&rdquo;).
                            </p>
                            <dl className="flex flex-col gap-2 mt-2">
                                <LegalRow label="Legal name" value={BUSINESS.legalName} />
                                <LegalRow label="Legal status" value={BUSINESS.legalStatus} />
                                {BUSINESS.registrationNumber && (
                                    <LegalRow
                                        label="Registration no."
                                        value={BUSINESS.registrationNumber}
                                    />
                                )}
                                {BUSINESS.physicalAddress && (
                                    <LegalRow label="Address" value={BUSINESS.physicalAddress} />
                                )}
                                <LegalRow label="Email" value={BUSINESS.email} isEmail />
                                <LegalRow label="Phone" value={BUSINESS.phone} />
                                <LegalRow
                                    label="Information Officer"
                                    value={BUSINESS.informationOfficer}
                                />
                            </dl>
                        </Section>

                        <Section
                            eyebrow="02 / CONTACT FORM"
                            title="WHAT THE CONTACT FORM COLLECTS"
                        >
                            <p>
                                When you submit the contact form on this site, we collect only
                                what you type into it:
                            </p>
                            <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-white/30">
                                <li>your name;</li>
                                <li>your email address;</li>
                                <li>your message;</li>
                                <li>
                                    the type of project you select, if you choose one (ordering
                                    portal, client platform, automation, mobile app, or other);
                                    and
                                </li>
                                <li>a budget indication, if you provide one.</li>
                            </ul>
                            <p>
                                All of these are optional except your name, email address, and
                                message, which we need in order to reply. We do not ask for
                                identity numbers, financial details, or any of the categories
                                POPIA treats as special personal information.
                            </p>
                        </Section>

                        <Section
                            eyebrow="03 / PURPOSE"
                            title="WHY WE USE IT"
                        >
                            <p>
                                We use what you send us for one purpose: to reply to your
                                enquiry and, if it goes further, to scope and quote a potential
                                project. We do not use it for anything else.
                            </p>
                            <p>
                                We do not sell your information, share it with data brokers, or
                                add you to a marketing list without your consent. If we ever
                                want to send you marketing, we will ask you first, as POPIA
                                section 69 requires.
                            </p>
                        </Section>

                        <Section
                            eyebrow="04 / ANALYTICS"
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
                            eyebrow="05 / COOKIES"
                            title="COOKIES"
                        >
                            <p>
                                The site does not set marketing or tracking cookies. The only
                                cookies that may appear are strictly-necessary ones used by
                                our hosting provider (Vercel) for fraud protection and
                                infrastructure.
                            </p>
                            <p>
                                Because we set no non-essential cookies, there is no consent
                                banner on this site. If that ever changes, we will ask for your
                                consent before any such cookie is set.
                            </p>
                        </Section>

                        <Section
                            eyebrow="06 / WHERE IT GOES"
                            title="WHO PROCESSES YOUR INFORMATION"
                        >
                            <p>
                                When you submit the contact form, your message passes through
                                these service providers, each acting only on our instructions:
                            </p>
                            <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-white/30">
                                <li>
                                    <strong className="text-white">Vercel</strong> — hosts this
                                    website and runs the form endpoint.
                                </li>
                                <li>
                                    <strong className="text-white">Our workflow server</strong>{" "}
                                    — a self-hosted n8n instance that receives the submission
                                    and forwards it to us by email. It is located in{" "}
                                    {BUSINESS.workflowServerCountry}.
                                </li>
                                <li>
                                    <strong className="text-white">Zoho Mail</strong> — delivers
                                    that email to our inbox.
                                </li>
                            </ul>
                            <p>
                                Some of these providers store or process information outside
                                South Africa. Where that happens we rely on section 72(1)(a) of
                                POPIA, which permits a cross-border transfer where the recipient
                                is subject to a law or binding agreement providing protection
                                substantially similar to POPIA.
                            </p>
                        </Section>

                        <Section
                            eyebrow="07 / RETENTION"
                            title="HOW LONG WE KEEP IT"
                        >
                            <p>
                                We keep contact-form enquiries for{" "}
                                {BUSINESS.enquiryRetention}, so that we can pick up a
                                conversation that goes quiet and come back to it. After that we
                                delete them.
                            </p>
                            <p>
                                If your enquiry becomes a project, the information moves into
                                our client records and is kept for as long as the law requires
                                us to keep business and tax records.
                            </p>
                            <p>
                                You can ask us to delete your enquiry sooner — see section 09.
                            </p>
                        </Section>

                        <Section
                            eyebrow="08 / SECURITY"
                            title="HOW WE PROTECT IT"
                        >
                            <p>
                                POPIA section 19 requires us to take reasonable technical and
                                organisational steps to protect your information. In practice
                                that means: the site is served over HTTPS, everything submitted
                                through the contact form is validated before it is accepted,
                                credentials are held in environment configuration rather than in
                                code, and we collect as little as possible in the first place —
                                the less we hold, the less there is to lose.
                            </p>
                            <p>
                                No system is perfectly secure. If a breach ever affects your
                                information, we will notify you and the Information Regulator as
                                POPIA section 22 requires.
                            </p>
                        </Section>

                        <Section
                            eyebrow="09 / YOUR RIGHTS"
                            title="ACCESS, CORRECTION, DELETION"
                        >
                            <p>
                                Under POPIA you have the right to ask what personal information
                                we hold about you, to have it corrected if it is wrong, to have
                                it deleted, and to object to us processing it.
                            </p>
                            <p>
                                Send any such request to{" "}
                                <a
                                    href={`mailto:${BUSINESS.email}`}
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    {BUSINESS.email}
                                </a>
                                , addressed to our Information Officer. We will respond within
                                30 days. We do not charge for this.
                            </p>
                            <p>
                                If you are not satisfied with how we handle your request, you
                                have the right to complain to the {REGULATOR.name}:
                            </p>
                            <dl className="flex flex-col gap-2 mt-1">
                                <LegalRow
                                    label="Complaints"
                                    value={REGULATOR.complaintsEmail}
                                    isEmail
                                />
                                <LegalRow
                                    label="Enquiries"
                                    value={REGULATOR.generalEmail}
                                    isEmail
                                />
                                <LegalRow label="Phone" value={REGULATOR.phone} />
                                <LegalRow label="Address" value={REGULATOR.address} />
                            </dl>
                            <p>
                                More information:{" "}
                                <a
                                    href={REGULATOR.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#FF4500" }}
                                    className="hover:underline"
                                >
                                    inforegulator.org.za
                                </a>
                            </p>
                        </Section>

                        <Section
                            eyebrow="10 / CHANGES"
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

interface LegalRowProps {
    label: string;
    value: string;
    isEmail?: boolean;
}

/** Label/value pair for the statutory disclosure blocks. */
function LegalRow({ label, value, isEmail = false }: LegalRowProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:gap-4">
            <dt
                className="text-white/40 shrink-0"
                style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-space-grotesk)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    minWidth: "140px",
                    paddingTop: "2px",
                }}
            >
                {label}
            </dt>
            <dd className="text-white/70" style={{ fontSize: "15px" }}>
                {isEmail ? (
                    <a
                        href={`mailto:${value}`}
                        style={{ color: "#FF4500" }}
                        className="hover:underline"
                    >
                        {value}
                    </a>
                ) : (
                    value
                )}
            </dd>
        </div>
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
