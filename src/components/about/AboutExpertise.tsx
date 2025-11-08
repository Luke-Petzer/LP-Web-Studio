import React, { useEffect, useRef, forwardRef } from 'react';
import { CodeIcon, SmartphoneIcon, DatabaseIcon } from 'lucide-react';
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
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              }, 200 * index);
              observer.unobserve(card);
            }
          });
        }, {
          threshold: 0.2
        });
        observer.observe(card);
      }
    });
  }, []);
  return <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in">My Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ExpertiseCard ref={el => cardsRef.current[0] = el} icon={<CodeIcon size={36} className="text-orange-500" />} title="Web Development" skills={["I use modern technologies like HTML, CSS, JavaScript, React, and Tailwind CSS to build responsive, high-performing websites that bring ideas to life."]} />
            <ExpertiseCard ref={el => cardsRef.current[1] = el} icon={<SmartphoneIcon size={36} className="text-orange-500" />} title="Responsive Design" skills={["Mobile-first layouts that look and perform beautifully on all devices, with cross-browser compatibility and adaptive elements."]} />
            <ExpertiseCard ref={el => cardsRef.current[2] = el} icon={<DatabaseIcon size={36} className="text-orange-500" />} title="Performance & SEO" skills={["Fast-loading pages, optimized performance, and SEO-friendly structures that help your site rank better and reach more customers."]} />
          </div>
        </div>
      </div>
    </section>;
}
interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}
const ExpertiseCard = forwardRef<HTMLDivElement, ExpertiseCardProps>(({
  icon,
  title,
  skills
}, ref) => {
  return <div ref={ref} className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group" style={{
    opacity: 0
  }}>
        <div className="flex flex-col items-center">
          <div className="mb-5 p-4 bg-orange-50 rounded-full transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <ul className="space-y-2 text-center">
            {skills.map((skill, index) => <li key={index} className="text-gray-600">
                {skill}
              </li>)}
          </ul>
        </div>
      </div>;
});