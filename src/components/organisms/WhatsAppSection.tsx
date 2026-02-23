"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, Smartphone } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";

const luxurySpring = { stiffness: 150, damping: 25, mass: 1 };

const features = [
    {
        icon: MessageCircle,
        title: "Instant WhatsApp Chat",
        description: "One tap connects customers directly to your WhatsApp Business.",
    },
    {
        icon: Clock,
        title: "No Wait, No Forms",
        description: "Skip the friction. Customers book immediately without filling out lengthy forms.",
    },
    {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "70% of your customers are on mobile. Our designs are built for their screens first.",
    },
];

export function WhatsAppSection() {
    return (
        <section className="py-grandeur bg-brand-elevated" aria-label="WhatsApp Integration">
            <div className="section-container">
                <div className="grid md:grid-cols-2 gap-structural items-center">
                    {/* Left: Copy */}
                    <motion.div
                        className="flex flex-col gap-sectional"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", ...luxurySpring }}
                    >
                        <Heading level={2}>
                            Bookings on WhatsApp,{" "}
                            <span className="text-accent">Not Endless Forms.</span>
                        </Heading>
                        <Text size="lg">
                            Why waste time with slow forms when you can connect instantly? We
                            build websites with integrated WhatsApp and booking systems, so
                            your customers can reach you immediately. Stop chasing leads; let
                            them come to you.
                        </Text>
                    </motion.div>

                    {/* Right: Feature Cards */}
                    <div className="flex flex-col gap-component">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                className="glass-card p-sectional flex items-start gap-component"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    ...luxurySpring,
                                    delay: i * 0.1,
                                }}
                            >
                                <div className="p-base rounded-glass bg-accent/10 shrink-0">
                                    <feature.icon className="w-[24px] h-[24px] text-accent" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col gap-hairline">
                                    <h3 className="text-base font-heading font-semibold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-secondary">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
