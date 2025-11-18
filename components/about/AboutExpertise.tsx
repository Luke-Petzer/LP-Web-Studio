import React, { useEffect, useRef, forwardRef } from 'react';
import { CodeIcon, SmartphoneIcon, DatabaseIcon, Sparkles } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

export function AboutExpertise() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate expertise cards with staggered timing
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }, 200 * index);
                observer.unobserve(card);
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(card);
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-sm text-slate-300 mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>What I Bring to the Table</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-slate-50 animate-fade-in">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Expertise
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ExpertiseCard
              ref={(el) => {
                if (el) cardsRef.current[0] = el;
              }}
              icon={<CodeIcon size={36} className="text-orange-500" />}
              title="Web Development"
              skills={[
                "I use modern technologies like HTML, CSS, JavaScript, React, and Tailwind CSS to build responsive, high-performing websites that bring ideas to life."
              ]}
            />
            <ExpertiseCard
              ref={(el) => {
                if (el) cardsRef.current[1] = el;
              }}
              icon={<SmartphoneIcon size={36} className="text-teal-400" />}
              title="Responsive Design"
              skills={[
                "Mobile-first layouts that look and perform beautifully on all devices, with cross-browser compatibility and adaptive elements."
              ]}
            />
            <ExpertiseCard
              ref={(el) => {
                if (el) cardsRef.current[2] = el;
              }}
              icon={<DatabaseIcon size={36} className="text-orange-500" />}
              title="Performance & SEO"
              skills={[
                "Fast-loading pages, optimized performance, and SEO-friendly structures that help your site rank better and reach more customers."
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

const ExpertiseCard = forwardRef<HTMLDivElement, ExpertiseCardProps>(
  ({ icon, title, skills }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-5 p-4 bg-slate-800/80 border border-slate-700 rounded-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-4 text-slate-100">{title}</h3>
          <ul className="space-y-2 text-center">
            {skills.map((skill, index) => (
              <li key={index} className="text-slate-400 leading-relaxed">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);
