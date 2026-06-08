// src/components/organisms/WorkPageContent.tsx
import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { SubpageHero } from "@/components/organisms/SubpageHero";
import { WorkScrollReveal } from "@/components/organisms/WorkScrollReveal";
import { ChapterHook } from "@/components/molecules/ChapterHook";
import { ProjectSection, type ProjectSectionProps } from "@/components/organisms/ProjectSection";
import { WorkClosingCTA } from "@/components/organisms/WorkClosingCTA";

const cafeCrave: ProjectSectionProps = {
  ident: "CAFE CRAVE",
  sector: "HOSPITALITY",
  timeline: "Q4_2023 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "ELITE_TIER",
  score: 93,
  stack: ["REACT", "NEXT.JS", "TAILWIND", "VERCEL"],
  descriptionHeading: "THE_CONVERSION_ENGINE",
  descriptionBody:
    "Cafe Crave needed more than a menu online. Every visitor needed to feel the space before they arrived. We rebuilt their digital presence on a React and Next.js stack with live Google Reviews integration, a mobile-first layout, and a reservation flow engineered for conversion. The result: a 93/100 PageSpeed score and a site that works as hard as the team behind the counter.",
  videoSrc: "/videos/CafeCrave.mp4",
  posterSrc: "/cafe-crave.webp",
  images: ["/cafe-crave-menu.jpg", "/cafe-crave-vinyl.jpg"],
  imageAlts: ["Cafe Crave menu page", "Cafe Crave vinyl music collection page"],
  siteUrl: "https://cafecravecpt.co.za",
};

export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <SubpageHero
        title="WORK"
        subtitle="SELECTED CLIENT ENGAGEMENTS"
      />
      <WorkScrollReveal />

      <ChapterHook text="Real foot traffic. Zero digital footprint." />
      <div className="mb-[120px]">
        <ProjectSection {...cafeCrave} />
      </div>

      <WorkClosingCTA />
    </div>
  );
}
