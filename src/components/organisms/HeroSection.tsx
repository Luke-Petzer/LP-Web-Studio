import { HeroContent } from "@/components/molecules/HeroContent";

/**
 * HeroSection — Server Component (Organism)
 * Protocol §4: Organisms are Server Components. All animation logic,
 * scroll transforms, and depth layer composition live in <HeroContent />
 * (Client Molecule island).
 *
 * Note: HeroContent owns its own <section>-equivalent wrapper (the div
 * with mesh-transition + min-h-screen) so it can scope useScroll to a ref.
 * This component is a thin pass-through for the server/client boundary.
 */
export function HeroSection() {
    return (
        <section id="hero" aria-label="Hero">
            <HeroContent />
        </section>
    );
}
