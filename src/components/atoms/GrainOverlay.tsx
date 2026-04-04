/**
 * GrainOverlay — Server-safe Atom
 *
 * Renders the ambient dot-matrix texture for all dark/atmospheric sections.
 * Sits at z-0; all section content must be z-10 or higher.
 *
 * Usage:
 *   <section className="relative bg-void ...">
 *     <GrainOverlay />
 *     <div className="relative z-10 ...">content</div>
 *   </section>
 *
 * Use the `className` prop to override opacity per-section:
 *   <GrainOverlay className="opacity-30" />   ← lighter grain
 *   <GrainOverlay className="opacity-80" />   ← heavier grain
 */
interface GrainOverlayProps {
    className?: string;
}

export function GrainOverlay({ className }: GrainOverlayProps) {
    return (
        <div
            className={`grain-overlay z-0 ${className ?? ""}`}
            aria-hidden="true"
        />
    );
}
