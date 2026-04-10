// src/components/organisms/WorkPageContent.tsx
import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { WorkHero } from "@/components/organisms/WorkHero";
import { WorkScrollReveal } from "@/components/organisms/WorkScrollReveal";
import { ChapterHook } from "@/components/molecules/ChapterHook";
import { ProjectSection, type ProjectSectionProps } from "@/components/organisms/ProjectSection";

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
    "Cafe Crave needed more than a menu online. They needed every visitor to feel the space before they arrived. We rebuilt their digital presence from the ground up — a React stack with live Google review integration and a reservation flow that converts.",
  videoSrc: "/videos/CafeCrave.mp4",
  images: ["/cafe-crave.webp", "/cafe-crave.webp"],
  imageAlts: ["Cafe Crave website", "Cafe Crave website detail"],
  siteUrl: "#",
};

const theBigSix: ProjectSectionProps = {
  ident: "THE BIG SIX",
  sector: "BRANDING",
  timeline: "Q1_2024 – PRESENT",
  status: "ACTIVE_TERMINAL",
  statusActive: true,
  authority: "PREMIUM_TIER",
  score: 95,
  stack: ["REACT", "TAILWIND CSS", "VERCEL"],
  descriptionHeading: "THE_RESTORATION_ARCHIVE",
  descriptionBody:
    "A restoration worth remembering deserves a site that can tell the story. Immersive brand storytelling with custom CSS masking and automated image optimisation for 4K assets. Premium design that loads in under one second.",
  videoSrc: "/videos/BigSix.mp4",
  images: ["/big-six.webp", "/big-six.webp"],
  imageAlts: ["The Big Six website", "The Big Six website detail"],
  siteUrl: "#",
};

export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <WorkHero />
      <WorkScrollReveal />

      <ChapterHook text="A cafe losing customers before they even walked in." />
      <ProjectSection {...cafeCrave} />

      <ChapterHook text="Wanting to tell a story that actually stops people scrolling?" />
      <ProjectSection {...theBigSix} />
    </div>
  );
}
