import { GeometricCanvas } from "@/components/atoms/GeometricCanvas";
import { WorkHero } from "@/components/organisms/WorkHero";
import { WorkScrollReveal } from "@/components/organisms/WorkScrollReveal";
import { WorkStickyArchive } from "@/components/organisms/WorkStickyArchive";

export function WorkPageContent() {
  return (
    <div className="relative">
      <GeometricCanvas />
      <WorkHero />
      <WorkScrollReveal />
      <WorkStickyArchive />
    </div>
  );
}
