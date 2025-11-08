import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
interface ChallengeAndSolutionProps {
  project: {
    challenge?: string;
    solution?: string;
  };
}
export function ChallengeAndSolution({
  project
}: ChallengeAndSolutionProps) {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  // If either challenge or solution is missing, don't render the section
  if (!project.challenge && !project.solution) {
    return null;
  }
  return <section ref={sectionRef} className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-200 animate-on-scroll opacity-0">
        Challenge & Solution
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Challenge Card */}
        {project.challenge && <div className="bg-slate-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 animate-on-scroll opacity-0">
            <div className="flex items-start mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <AlertTriangleIcon size={24} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                The Challenge
              </h3>
            </div>
            <p className="text-slate-600">{project.challenge}</p>
          </div>}
        {/* Solution Card */}
        {project.solution && <div className="bg-slate-50 border-l-4 border-emerald-500 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 animate-on-scroll opacity-0">
            <div className="flex items-start mb-4">
              <div className="bg-emerald-100 p-2 rounded-full mr-4">
                <CheckCircleIcon size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">
                The Solution
              </h3>
            </div>
            <p className="text-slate-600">{project.solution}</p>
          </div>}
      </div>
    </section>;
}