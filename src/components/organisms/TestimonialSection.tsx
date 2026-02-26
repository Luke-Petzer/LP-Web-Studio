"use client";

import { motion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";

/* ─── Spring Physics ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: spring },
};

/**
 * TestimonialSection — Client Organism
 * Stark, high-contrast blockquote between Pricing and Contact.
 * Void background keeps the dark momentum leading into the footer.
 */
export function TestimonialSection() {
    return (
        <section className="bg-void py-structural px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="relative"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Large decorative quote mark */}
                    <Quote
                        className="w-16 h-16 text-accent/20 mb-8"
                        strokeWidth={1}
                        aria-hidden="true"
                    />

                    <blockquote>
                        <p className="text-lg leading-relaxed tracking-tight mb-10">
                            <span className="text-base md:text-lg font-medium text-white/90 leading-relaxed">
                                &ldquo;Luke has been exceptional from start to finish on the project!
                                I was skeptical at first when I saw his message in my business&rsquo;
                                Facebook account, as most of the time it&rsquo;s some scam or swindler,
                                but all I can say is that I do not regret opening dialogue with him.
                            </span>
                            <span className="text-xl md:text-2xl font-semibold text-white block my-4">
                                His professionalism and work ethic is above what I&rsquo;ve experienced
                                in the industry and his execution of planning is pinpoint. Please, save
                                yourself from having to run around after designers and use Luke;
                                phenomenal individual.&rdquo;
                            </span>
                        </p>

                        <footer className="flex items-center gap-4">
                            {/* Avatar initial */}
                            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                                <span className="text-accent font-heading font-bold text-lg">G</span>
                            </div>
                            <div>
                                <cite className="text-white font-heading font-bold not-italic block">
                                    Gio
                                </cite>
                                <span className="text-white/40 text-sm">
                                    Owner, Cafe Crave
                                </span>
                            </div>

                            {/* Score pill */}
                            <div className="ml-auto hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                <span className="text-accent text-xs font-bold uppercase tracking-widest">
                                    Verified Client
                                </span>
                            </div>
                        </footer>
                    </blockquote>
                </motion.div>
            </div>
        </section>
    );
}
