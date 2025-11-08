import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface LearningItem {
  text: string;
}
interface LearningsAccordionProps {
  learnings: LearningItem[];
}
export function LearningsAccordion({
  learnings
}: LearningsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionRef = useAnimateOnScroll<HTMLDivElement>();
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <div ref={accordionRef} className="border border-slate-200 rounded-lg overflow-hidden animate-on-scroll opacity-0">
      {learnings.map((learning, index) => <div key={index} className="border-b border-slate-200 last:border-b-0">
          <button className={`flex items-center justify-between w-full p-4 text-left transition-colors duration-200 ${openIndex === index ? 'bg-orange-50' : 'bg-white hover:bg-slate-50'}`} onClick={() => toggleAccordion(index)} aria-expanded={openIndex === index}>
            <h3 className={`font-medium ${openIndex === index ? 'text-orange-600' : 'text-slate-800'}`}>
              {`Learning ${index + 1}: ${learning.text.length > 60 ? learning.text.substring(0, 60) + '...' : learning.text}`}
            </h3>
            <ChevronDownIcon size={20} className={`text-slate-500 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-white text-slate-700 border-t border-slate-100">
              {learning.text}
            </div>
          </div>
        </div>)}
    </div>;
}