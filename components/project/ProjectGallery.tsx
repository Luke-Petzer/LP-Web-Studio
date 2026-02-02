import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

interface ProjectGalleryProps {
  images?: string[] | Array<{
    src: string;
    alt: string;
    description: string;
  }>;
  descriptions?: string[];
}

export function ProjectGallery({
  images = [],
  descriptions = []
}: ProjectGalleryProps) {
  // Support both old and new structures
  const galleryItems = images.map((item, index) => {
    if (typeof item === 'string') {
      return {
        src: item,
        alt: `Gallery image ${index + 1}`,
        description: descriptions[index] || ''
      };
    }
    return item;
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useAnimateOnScroll<HTMLDivElement>();

  const nextSlide = () => {
    setCurrentSlide(prev => prev === galleryItems.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? galleryItems.length - 1 : prev - 1);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  if (galleryItems.length === 0) {
    return null;
  }

  return <div ref={galleryRef} className="animate-on-scroll opacity-0" style={{
    transform: 'translateY(20px)'
  }}>
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100 transition-colors duration-300">Project Gallery</h3>
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Main carousel image */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
          {galleryItems.map((item, index) => <img key={index} src={item.src} alt={item.alt} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentSlide === index ? 'z-10 opacity-100' : 'opacity-0 pointer-events-none'}`} />)}
        </div>
        {/* Navigation arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-300 z-20" aria-label="Previous slide">
          <ChevronLeftIcon size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-300 z-20" aria-label="Next slide">
          <ChevronRightIcon size={24} />
        </button>
        {/* Caption */}
        {galleryItems[currentSlide]?.description && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white z-20">
              <p className="text-sm md:text-base">
                {galleryItems[currentSlide].description}
              </p>
            </div>}
      </div>
      {/* Thumbnail navigation - Fixed with improved spacing and padding */}
      {galleryItems.length > 1 && <div className="flex mt-6 space-x-4 overflow-x-auto pb-4">
          {galleryItems.map((item, index) => <div key={index} className="p-1">
              <button onClick={() => goToSlide(index)} className={`flex-shrink-0 w-20 h-12 md:w-24 md:h-16 rounded overflow-hidden transition-all duration-300 ${currentSlide === index ? 'outline outline-2 outline-orange-500 opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`} aria-label={`Go to slide ${index + 1}`}>
                <img src={item.src} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            </div>)}
        </div>}
    </div>;
}