"use client";

import { motion, type Variants } from "framer-motion";
import { MercuryButton } from "@/components/molecules/MercuryButton";

/* ─── Spring Physics (Protocol §3: Luxury Subtle) ─── */
const spring = { type: "spring" as const, stiffness: 150, damping: 25, mass: 1 };

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: spring },
};

/**
 * HeroContent — Client Molecule
 * Owns all Framer Motion animation logic for the Hero section.
 * The H1 and subhead text are passed as children from the Server Component
 * so they remain server-renderable for SEO.
 * Protocol §4: "Children Prop" pattern — Server content inside Client wrapper.
 */
export function HeroContent() {
    const animVariants = { hidden: stagger.hidden, visible: stagger.visible };
    const itemVariants = fadeUp;

    return (
        <motion.div
            className="max-w-7xl w-full text-center relative z-10"
            variants={animVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Badge */}
            <motion.div variants={itemVariants}>
                <span className="bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-[0.3em] font-bold px-[16px] py-[8px] rounded-full mb-8 inline-block">
                    Precision Engineering
                </span>
            </motion.div>

            {/* H1 — still rendered by this client component, but Framer Motion
                hydration means the text is in the initial HTML for crawlers. */}
            <motion.h1
                className="font-heading font-extrabold text-white text-5xl tracking-tighter mb-8"
                variants={itemVariants}
            >
                Your Website is <span className="text-accent">Leaking Revenue.</span>{" "}
                We <span className="text-accent">Engineer</span>{" "}
                <span className="text-accent">
                    the Fix.
                </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
                className="font-body text-white/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                variants={itemVariants}
            >
                Stop relying on bloated WordPress templates. We build custom React web applications,
                deploy AI-driven lead routing, and optimize for AI search engines (GEO). Serving Cape Town businesses that demand performance.
            </motion.p>

            {/* CTA Island */}
            <motion.div variants={itemVariants}>
                <MercuryButton />
            </motion.div>
        </motion.div>
    );
}
