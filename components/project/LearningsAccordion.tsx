import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface LearningItem {
  text: string;
}

interface LearningsAccordionProps {
  learnings: LearningItem[] | string[];
}

export function LearningsAccordion({
  learnings
}: LearningsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionRef = useAnimateOnScroll<HTMLDivElement>();

  // Support both old and new structures
  const learningsList = learnings.map(item =>
    typeof item === 'string' ? { text: item } : item
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return <div ref={accordionRef} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden animate-on-scroll opacity-0 transition-colors duration-300">
      {learningsList.map((learning, index) => <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 transition-colors duration-300">
          <button className={`flex items-center justify-between w-full p-4 text-left transition-colors duration-200 ${openIndex === index ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'}`} onClick={() => toggleAccordion(index)} aria-expanded={openIndex === index}>
            <h3 className={`font-medium ${openIndex === index ? 'text-orange-600 dark:text-orange-400' : 'text-slate-800 dark:text-slate-200'} transition-colors duration-300`}>
              {`Learning ${index + 1}: ${learning.text.length > 60 ? learning.text.substring(0, 60) + '...' : learning.text}`}
            </h3>
            <ChevronDownIcon size={20} className={`text-slate-500 dark:text-slate-400 transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'transform rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
              {learning.text}
            </div>
          </div>
        </div>)}
    </div>;
}