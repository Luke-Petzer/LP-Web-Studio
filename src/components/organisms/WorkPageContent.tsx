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
  score: 93,
  descriptionHeading: "THE_NARROW_EXCEPTION",
  descriptionBody:
    "Cafe Crave is a hospitality website, not a systems build — the one exception to how LP Web Studio works today. We rebuilt it on React and Next.js with live Google Reviews integration, a mobile-first layout, and a reservation flow, then moved it onto the same ongoing care plan every current build exits into. It isn't a preview of what we'd build you now — for custom systems and the ordering platform, see /products.",
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
