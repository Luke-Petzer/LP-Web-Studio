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
  score: 91,
  stack: ["REACT", "TAILWIND CSS", "VERCEL"],
  descriptionHeading: "THE_RESTORATION_ARCHIVE",
  descriptionBody:
    "The Big Six is six vintage cars and decades of history. It deserved a landing page that carried that weight. We used immersive typography, custom CSS visual masking, and automated 4K image optimisation to build something that loads in under one second and feels as rare as the collection it represents. 91/100 PageSpeed score. Zero compromise on craft.",
  videoSrc: "/videos/BigSix.mp4",
  images: ["/big-six.webp", "/big-six.webp"],
  imageAlts: ["The Big Six website", "The Big Six website detail"],
  siteUrl: "#",
};

export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <SubpageHero
        breadcrumb="LP WEB / WORK"
        title="WORK"
        subtitle="SELECTED CLIENT ENGAGEMENTS"
      />
      <WorkScrollReveal />

      <ChapterHook text="A Cape Town cafe was losing customers before they even walked in." />
      <div className="mb-[120px]">
        <ProjectSection {...cafeCrave} />
      </div>

      <ChapterHook text="A restoration worth remembering. A website that couldn't tell the story." />
      <div className="mb-[120px]">
        <ProjectSection {...theBigSix} />
      </div>

      <WorkClosingCTA />
    </div>
  );
}
