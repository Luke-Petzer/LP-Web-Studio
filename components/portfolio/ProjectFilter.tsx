import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface ProjectFilterProps {
  activeFilter: 'all' | 'Client' | 'Showcase' | 'Design';
  onFilterChange: (filter: 'all' | 'Client' | 'Showcase' | 'Design') => void;
}
export function ProjectFilter({
  activeFilter,
  onFilterChange
}: ProjectFilterProps) {
  const filterRef = useAnimateOnScroll<HTMLDivElement>();
  const filters = [{
    id: 'all',
    label: 'All Projects'
  }, {
    id: 'Client',
    label: 'Client Projects'
  }, {
    id: 'Showcase',
    label: 'Showcase Projects'
  }, {
    id: 'Design',
    label: 'Design Concepts'
  }];
  return <div ref={filterRef} className="flex flex-wrap justify-center gap-3 md:gap-4 animate-on-scroll opacity-0">
      {filters.map((filter, index) => <button key={filter.id} onClick={() => onFilterChange(filter.id as any)} className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${activeFilter === filter.id ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500 hover:text-orange-500'}`} style={{
      animationDelay: `${index * 0.1}s`
    }}>
          {filter.label}
        </button>)}
    </div>;
}