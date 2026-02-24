import { HeroContent } from "@/components/molecules/HeroContent";

/**
 * HeroSection — Server Component (Organism)
 * Protocol §4: Organisms are Server Components. All Framer Motion animation
 * logic lives in <HeroContent /> (Client Molecule island).
 *
 * The <section> shell and semantic structure are server-rendered.
 */
export function HeroSection() {
    return (
        <section
            id="hero"
            className="mesh-transition min-h-screen relative flex items-center justify-center pt-24 pb-32 px-6"
        >
            <HeroContent />
        </section>
    );
}
