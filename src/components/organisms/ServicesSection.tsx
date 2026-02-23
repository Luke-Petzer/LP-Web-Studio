import { Heading, Text, Label } from "@/components/atoms/Typography";
import { PricingCard } from "@/components/molecules/PricingCard";

const pricingTiers = [
    {
        title: "The Starter Template",
        price: "R2,500",
        period: "Once-Off + R350/pm Hosting & Care",
        features: [
            "1-Page Professional Website",
            '"Book Now" WhatsApp Button',
            "Google Maps Location",
            "Mobile Friendly Design",
            "Hosted on Vercel Edge Network",
        ],
        recommended: false,
    },
    {
        title: "The Professional",
        price: "R4,500",
        period: "Once-Off + R350/pm Hosting & Care",
        description: "Everything in Starter, plus:",
        features: [
            "3-Page Custom Design",
            "Online Booking Integration",
            "Photo Gallery",
            "Google Business Profile Setup",
            "90+ Google PageSpeed Score",
        ],
        recommended: true,
    },
    {
        title: "The High-Performance Build",
        price: "R7,500+",
        period: "Contact for Quote",
        features: [
            "5+ Pages, Fully Custom",
            "Advanced SEO & Analytics",
            "Custom Features (Blogs, APIs)",
            "Priority Support",
            "Built on Next.js & Tailwind CSS",
        ],
        recommended: false,
    },
];

export function ServicesSection() {
    return (
        <section
            id="services"
            className="py-grandeur"
            aria-label="Services and Pricing"
        >
            <div className="section-container flex flex-col items-center gap-structural">
                {/* Section Header */}
                <div className="text-center flex flex-col gap-component max-w-2xl">
                    <Label>Pricing Plans</Label>
                    <Heading level={2}>
                        Performance-First Packages for{" "}
                        <span className="text-accent">Every Budget</span>
                    </Heading>
                    <Text size="lg" secondary>
                        From simple landing pages to fully custom web applications. Every
                        site is built for speed.
                    </Text>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-sectional w-full">
                    {pricingTiers.map((tier) => (
                        <PricingCard
                            key={tier.title}
                            title={tier.title}
                            price={tier.price}
                            period={tier.period}
                            description={tier.description}
                            features={tier.features}
                            recommended={tier.recommended}
                            ctaHref="https://www.lpwebstudio.co.za/contact/"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
