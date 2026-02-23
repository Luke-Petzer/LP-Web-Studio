"use client";

import { motion, type Variants } from "framer-motion";
import { ExternalLink, Code, Palette, Layers, Calendar, ArrowRight } from "lucide-react";
import { Heading, Text, Label } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";

/* ─── Spring Physics ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 150, damping: 25, mass: 1 },
    },
};

/* ─── Project Data (migrated from _Reference/projectsData.ts) ─── */
interface PortfolioProject {
    id: string;
    title: string;
    tagline: string;
    category: string;
    date: string;
    client: string;
    role: string;
    techStack: string[];
    keyFeatures: string[];
    badge: "tech" | "trust" | "speed" | "default";
}

const projects: PortfolioProject[] = [
    {
        id: "cafe-crave",
        title: "Cafe Crave",
        tagline:
            "A full-stack, retro-inspired website for a local café, featuring a secure API for live Google Reviews.",
        category: "Full-Stack Web Application",
        date: "November 2025",
        client: "Cafe Crave",
        role: "Full-Stack Developer",
        techStack: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Vite"],
        keyFeatures: [
            "Full-Stack Google Reviews API with secure backend proxy",
            "Interactive vinyl collection browser with filters",
            "Dynamic menu page with IntersectionObserver scroll-spy",
            "Complete SEO: JSON-LD, sitemap, robots.txt, per-page meta",
        ],
        badge: "tech",
    },
    {
        id: "loruki",
        title: "Loruki Cloud Hosting",
        tagline:
            "A demo cloud-hosting website showcasing modern responsive design and clean layout structure.",
        category: "Showcase Website",
        date: "September 2024",
        client: "Personal Showcase",
        role: "Web Developer",
        techStack: ["HTML5", "CSS3", "JavaScript", "Google Sheets API"],
        keyFeatures: [
            "Mobile-first responsive design with CSS Grid & Flexbox",
            "Multi-page structure: Home, Features, Docs",
            "Contact form integrated with Google Sheets",
            "Professional UI/UX with clean navigation",
        ],
        badge: "speed",
    },
    {
        id: "granite-marble",
        title: "Granite & Marble Design",
        tagline:
            "A comprehensive website design concept for a stone and marble business.",
        category: "Design Concept",
        date: "October 2024",
        client: "Design Concept",
        role: "UI/UX Designer",
        techStack: ["Figma", "Adobe Photoshop", "Tailwind CSS (proposed)"],
        keyFeatures: [
            "Visual hierarchy guiding users from hero to products to contact",
            "Product showcase gallery with category-based navigation",
            "Separate B2B and B2C content sections",
            "Full design system with reusable components",
        ],
        badge: "trust",
    },
    {
        id: "green-scape",
        title: "Green Scape Gardeners",
        tagline:
            "A nature-inspired website design for a landscaping and gardening business.",
        category: "Design Concept",
        date: "October 2024",
        client: "Design Concept",
        role: "UI/UX Designer",
        techStack: ["Figma", "Adobe Illustrator", "React (proposed)", "Framer Motion (proposed)"],
        keyFeatures: [
            "Nature-inspired design with organic shapes and earthy palette",
            "Before-and-after project gallery showcasing transformations",
            "Seasonal tips blog template for year-round engagement",
            "Streamlined booking and quote request flow",
        ],
        badge: "default",
    },
];

/* ─── Category Icon Helper ─── */
function CategoryIcon({ category }: { category: string }) {
    if (category.includes("Full-Stack")) return <Code className="w-[16px] h-[16px]" strokeWidth={1.5} />;
    if (category.includes("Design")) return <Palette className="w-[16px] h-[16px]" strokeWidth={1.5} />;
    return <Layers className="w-[16px] h-[16px]" strokeWidth={1.5} />;
}

/* ─── Component ─── */
export function WorkGrid() {
    return (
        <section className="section-container flex flex-col gap-structural" aria-label="Portfolio">
            {/* Page Header */}
            <div className="text-center flex flex-col gap-component items-center max-w-2xl mx-auto pt-structural">
                <Label>Portfolio</Label>
                <Heading level={1}>
                    Built for Speed.{" "}
                    <span className="text-accent">Proven by Results.</span>
                </Heading>
                <Text size="lg" secondary>
                    From full-stack web applications to polished design concepts — every
                    project is engineered for performance, usability, and conversion.
                </Text>
            </div>

            {/* Project Grid */}
            <div className="grid gap-sectional">
                {projects.map((project, i) => (
                    <motion.article
                        key={project.id}
                        className="glass-card p-atmospheric flex flex-col gap-sectional group"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -4 }}
                        itemScope
                        itemType="https://schema.org/CreativeWork"
                    >
                        {/* Top Row: Title + Meta */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-component">
                            <div className="flex flex-col gap-base flex-1">
                                <div className="flex items-center gap-component">
                                    <h2
                                        className="text-xl font-heading font-bold text-white"
                                        itemProp="name"
                                    >
                                        {project.title}
                                    </h2>
                                    <Badge variant={project.badge}>
                                        <CategoryIcon category={project.category} />
                                        {project.category}
                                    </Badge>
                                </div>
                                <p
                                    className="text-sm text-secondary leading-relaxed max-w-xl"
                                    itemProp="description"
                                >
                                    {project.tagline}
                                </p>
                            </div>

                            {/* Meta Strip */}
                            <div className="flex items-center gap-sectional text-xs font-mono text-secondary shrink-0">
                                <span className="flex items-center gap-hairline">
                                    <Calendar className="w-[14px] h-[14px]" strokeWidth={1.5} />
                                    {project.date}
                                </span>
                                <span>{project.role}</span>
                            </div>
                        </div>

                        {/* Middle: Tech Stack Pills */}
                        <div className="flex flex-wrap gap-base">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-component py-[4px] text-xs font-mono bg-brand-elevated border border-glass-border-dim rounded-full text-secondary"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Bottom: Key Features */}
                        <ul className="grid md:grid-cols-2 gap-component">
                            {project.keyFeatures.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-start gap-base text-sm text-secondary-light"
                                >
                                    <ArrowRight className="w-[14px] h-[14px] text-accent mt-[3px] shrink-0" strokeWidth={2} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
