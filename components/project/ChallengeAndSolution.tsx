import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

interface ChallengeAndSolutionProps {
  project?: {
    challenge?: string;
    solution?: string;
  };
  // New detailed props
  challenges?: Array<{
    challenge: string;
    solution: string;
  }>;
}

export function ChallengeAndSolution({
  project,
  challenges
}: ChallengeAndSolutionProps) {
  const sectionRef = useAnimateOnScroll<HTMLElement>();

  // Support both old and new prop structures
  const challengesList = challenges || (project?.challenge && project?.solution ? [{
    challenge: project.challenge,
    solution: project.solution
  }] : []);

  // If no challenges, don't render the section
  if (challengesList.length === 0) {
    return null;
  }

  return <section ref={sectionRef} className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b border-slate-700 animate-on-scroll opacity-0 text-slate-50">
        Challenges & Solutions
      </h2>
      <div className="space-y-8">
        {challengesList.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Challenge Card */}
            <div className="bg-slate-900/60 backdrop-blur-sm border-l-4 border-amber-500 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300 animate-on-scroll opacity-0">
              <div className="flex items-start mb-4">
                <div className="bg-amber-900/40 border border-amber-500/30 p-3 rounded-xl mr-4 flex-shrink-0">
                  <AlertTriangleIcon size={24} className="text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">
                  {challengesList.length > 1 ? `Challenge ${index + 1}` : 'The Challenge'}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{item.challenge}</p>
            </div>
            {/* Solution Card */}
            <div className="bg-slate-900/60 backdrop-blur-sm border-l-4 border-emerald-500 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 animate-on-scroll opacity-0">
              <div className="flex items-start mb-4">
                <div className="bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-xl mr-4 flex-shrink-0">
                  <CheckCircleIcon size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">
                  {challengesList.length > 1 ? `Solution ${index + 1}` : 'The Solution'}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed">{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>;
}