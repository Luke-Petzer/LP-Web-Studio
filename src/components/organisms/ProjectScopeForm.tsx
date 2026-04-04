"use client";

import { motion } from "framer-motion";
import { GrainOverlay } from "@/components/atoms/GrainOverlay";
import { useState } from "react";

export function ProjectScopeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => setIsSubmitting(false), 1500);
    };

    return (
        <section className="relative px-6 md:px-10 lg:px-16 py-32 bg-[#000] overflow-hidden text-white border-t border-white/10">
            <GrainOverlay className="opacity-40" />

            <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] mb-6 text-white/30">
                        Initiate Protocol
                    </p>
                    <h2 className="font-heading font-black text-[clamp(32px,4vw,56px)] tracking-[-0.03em] leading-[1] mb-8 text-white">
                        Request a <br /> Project Scope.
                    </h2>
                    
                    <div className="bg-[#111] border border-white/10 p-6 inline-block mb-12">
                        <p className="font-mono text-sm text-white/70 uppercase tracking-widest mb-2">
                            Starting Tier
                        </p>
                        <p className="font-mono text-xl font-bold text-white">
                            Custom Web Applications & AI - From R21,500
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="font-mono text-xs uppercase tracking-widest text-white/50">1. Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                required 
                                className="bg-[#111] border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-white/40 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-white/50">2. Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                className="bg-[#111] border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-white/40 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="websiteUrl" className="font-mono text-xs uppercase tracking-widest text-white/50">3. Your Website URL</label>
                            <input 
                                type="url" 
                                id="websiteUrl" 
                                required 
                                className="bg-[#111] border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-white/40 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bottleneck" className="font-mono text-xs uppercase tracking-widest text-white/50">4. What is the primary bottleneck in your business right now?</label>
                            <textarea 
                                id="bottleneck" 
                                rows={4} 
                                required 
                                className="bg-[#111] border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm py-5 px-8 hover:bg-white/90 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Initiating..." : "Initiate Project Scope"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
