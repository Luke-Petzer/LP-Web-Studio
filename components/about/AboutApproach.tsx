import React from 'react';
import { CodeIcon, UsersIcon, HeartIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
export function AboutApproach() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">My Approach</h2>
          <p className="text-xl text-gray-700 mb-12 animate-fade-in">
            Every business is unique, so every project deserves a tailored solution. My approach combines technical precision with clear communication and a focus on long-term value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <ApproachCard icon={<CodeIcon size={32} className="text-orange-500" />} title="Quality" description="I write clean, maintainable code that’s built to last and scale with your business." />
            <ApproachCard icon={<UsersIcon size={32} className="text-orange-500" />} title="User Experience" description="I design with real people in mind — creating intuitive, enjoyable websites that make it easy for visitors to connect with your brand." />
            <ApproachCard icon={<HeartIcon size={32} className="text-orange-500" />} title="Collaboration" description="Open, ongoing communication ensures your vision and goals are at the center of every decision." />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6 text-center animate-fade-in">
              What You Can Expect
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed text-center animate-fade-in">
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
  return <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center">
        <div className="mb-4 p-3 bg-orange-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>;
}