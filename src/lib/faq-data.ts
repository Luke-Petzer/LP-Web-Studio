/**
 * Single source of truth for the homepage FAQ.
 * Consumed by both `page.tsx` (drives JSON-LD FAQ schema) and
 * `FAQSection.tsx` (drives the visible accordion).
 */
export interface Faq {
    question: string;
    answer: string;
}

export const homepageFaqs: Faq[] = [
    {
        question: "What does a system cost?",
        answer: "Custom systems start at R35,000. Ongoing care plans start at R1,950/month for updates, monitoring, and support after launch. You'll get an exact quote after a free discovery call.",
    },
    {
        question: "How long does a system take to build?",
        answer: "Most custom systems take 4-8 weeks from discovery call to launch, depending on scope — ordering portals and client platforms are usually on the longer end, single automations on the shorter end. You'll get a firm timeline after the discovery call.",
    },
    {
        question: "Do I own the system?",
        answer: "Yes. Every system we build is yours outright — full code ownership, no lock-in, no monthly licence fees to keep using what you paid for.",
    },
    {
        question: "What happens after launch?",
        answer: "You can go it alone, or move onto a care plan from R1,950/month — we handle updates, monitoring, and changes so the system keeps running without you thinking about it.",
    },
    {
        question: "What industries do you work with?",
        answer: "Any business drowning in manual admin — wholesalers and distributors taking orders over WhatsApp, trade and hospitality businesses juggling spreadsheets, and B2B companies that need a client portal instead of email chains.",
    },
    {
        question: "Do you work with businesses outside Cape Town?",
        answer: "Yes. We work with businesses across South Africa and internationally. Discovery calls are online and projects are delivered remotely.",
    },
];
