"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

interface ParticleFieldProps {
    /** "dark" = dark particles for light backgrounds (hero).
     *  "light" = white particles for dark backgrounds. */
    color?: "dark" | "light";
}

/**
 * ParticleField — Client Atom
 * Canvas-based ambient particle system. 55 slow-drifting dots, wraps at edges.
 * Fully disabled when prefers-reduced-motion is set.
 */
export function ParticleField({ color = "light" }: ParticleFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animFrameId: number;

        // Dark particles for light bg, white particles for dark bg
        const rgb = color === "dark" ? "43, 42, 42" : "255, 255, 255";

        const initAndRun = () => {
            // Set canvas size using offsetWidth/offsetHeight with fallback to window dimensions
            canvas.width = canvas.offsetWidth || window.innerWidth;
            canvas.height = canvas.offsetHeight || window.innerHeight;

            // Initialize particles AFTER canvas dimensions are set
            const COUNT = 55;
            const particles: Particle[] = Array.from({ length: COUNT }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                radius: Math.random() * 1.4 + 0.4,
                opacity: Math.random() * 0.18 + 0.05,
            }));

            const tick = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (const p of particles) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
                    ctx.fill();
                }
                animFrameId = requestAnimationFrame(tick);
            };

            tick();
        };

        // Use ResizeObserver to handle canvas resizing
        const observer = new ResizeObserver(() => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
        observer.observe(canvas);

        // Initialize with correct dimensions
        initAndRun();

        return () => {
            cancelAnimationFrame(animFrameId);
            observer.disconnect();
        };
    }, [shouldReduceMotion, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
            aria-hidden="true"
        />
    );
}