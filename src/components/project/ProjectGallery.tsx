import { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
interface ProjectGalleryProps {
  images: string[];
  descriptions?: string[];
}
export function ProjectGallery({
  images,
  descriptions = []
}: ProjectGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useAnimateOnScroll<HTMLDivElement>();
  const slideRef = useRef<HTMLImageElement>(null);
  const nextSlide = () => {
    setCurrentSlide(prev => prev === images.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? images.length - 1 : prev - 1);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  // Add smooth transition effect when changing slides
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.opacity = '0';
      slideRef.current.style.transform = 'scale(0.98)';
      const timer = setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.opacity = '1';
          slideRef.current.style.transform = 'scale(1)';
          slideRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval);
  }, []);
  return <div ref={galleryRef} className="animate-on-scroll opacity-0" style={{
    transform: 'translateY(20px)'
  }}>
      <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Main carousel image */}
        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
          {images.map((img, index) => <img key={index} ref={index === currentSlide ? slideRef : null} src={img} alt={descriptions[index] || `Project screenshot ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover ${currentSlide === index ? 'z-10' : 'opacity-0'}`} style={{
          opacity: currentSlide === index ? 0 : 0,
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }} />)}
        </div>
        {/* Navigation arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-300 z-20" aria-label="Previous slide">
          <ChevronLeftIcon size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-300 z-20" aria-label="Next slide">
          <ChevronRightIcon size={24} />
        </button>
        {/* Caption */}
        {descriptions && descriptions.length > 0 && descriptions[currentSlide] && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white z-20">
              <p className="text-sm md:text-base">
                {descriptions[currentSlide]}
              </p>
            </div>}
      </div>
      {/* Thumbnail navigation - Fixed with improved spacing and padding */}
      {images.length > 1 && <div className="flex mt-6 space-x-4 overflow-x-auto pb-4">
          {images.map((img, index) => <div key={index} className="p-1">
              <button onClick={() => goToSlide(index)} className={`flex-shrink-0 w-20 h-12 md:w-24 md:h-16 rounded overflow-hidden transition-all duration-300 ${currentSlide === index ? 'outline outline-2 outline-orange-500 opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`} aria-label={`Go to slide ${index + 1}`}>
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            </div>)}
        </div>}
    </div>;
}