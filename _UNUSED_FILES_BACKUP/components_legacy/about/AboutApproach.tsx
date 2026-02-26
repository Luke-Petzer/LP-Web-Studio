import React from 'react';
import { CodeIcon, UsersIcon, HeartIcon, Target } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
export function AboutApproach() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={sectionRef} className="relative py-20 md:py-28 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-slate-800/40 backdrop-blur-sm border border-teal-200 dark:border-slate-700/50 text-sm text-teal-900 dark:text-slate-300 mb-6 transition-colors duration-300">
            <Target className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            <span>My Philosophy</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-50 animate-fade-in transition-colors duration-300">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Approach
            </span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 animate-fade-in leading-relaxed transition-colors duration-300">
            Every business is unique, so every project deserves a tailored solution. My approach combines technical precision with clear communication and a focus on long-term value.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ApproachCard
              icon={<CodeIcon size={32} className="text-orange-500" />}
              title="Quality"
              description="I write clean, maintainable code that's built to last and scale with your business."
            />
            <ApproachCard
              icon={<UsersIcon size={32} className="text-teal-400" />}
              title="User Experience"
              description="I design with real people in mind — creating intuitive, enjoyable websites that make it easy for visitors to connect with your brand."
            />
            <ApproachCard
              icon={<HeartIcon size={32} className="text-orange-500" />}
              title="Collaboration"
              description="Open, ongoing communication ensures your vision and goals are at the center of every decision."
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 md:p-10 hover:border-orange-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100 animate-fade-in transition-colors duration-300">
              What You Can Expect
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-center animate-fade-in transition-colors duration-300">
              Working with LP Web Studio means clear communication, attention to detail, and a commitment to excellence. Every project is an opportunity to solve real-world problems, refine my craft, and create something that genuinely adds value for my clients.
            </p>
          </div>
        </div>
      </div>
    </section>;
}
interface ApproachCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
function ApproachCard({
  icon,
  title,
  description
}: ApproachCardProps) {
  return <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex flex-col items-center">
        <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl transform hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100 transition-colors duration-300">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed transition-colors duration-300">{description}</p>
      </div>
    </div>;
}