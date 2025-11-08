import React, { useEffect, useRef, forwardRef } from 'react';
import { CodeIcon, SmartphoneIcon, MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
export function ServicesSection() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    // Staggered animation for service cards
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
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              }, 150 * index); // Staggered delay based on card index
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
  return <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 animate-on-scroll opacity-0">
            Websites designed to grow your business.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll opacity-0">
            Affordable, modern, and built to convert visitors into customers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <ServiceCard ref={el => cardsRef.current[0] = el} icon={<CodeIcon size={36} className="text-orange-500" />} title="Web Development" description="Custom, functional websites built to your brand and business goals." />
          <ServiceCard ref={el => cardsRef.current[1] = el} icon={<SmartphoneIcon size={36} className="text-orange-500" />} title="Mobile Friendly" description="Responsive designs that perform beautifully across all devices." />
          <ServiceCard ref={el => cardsRef.current[2] = el} icon={<MapPinIcon size={36} className="text-orange-500" />} title="Google Maps + Reviews" description="Integrated visibility to help local customers find and trust your business." />
          <ServiceCard ref={el => cardsRef.current[3] = el} icon={<MessageCircleIcon size={36} className="text-orange-500" />} title="WhatsApp & Contact Forms" description="Seamless ways for customers to connect with you instantly." />
        </div>
      </div>
    </section>;
}
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(({
  icon,
  title,
  description
}, ref) => {
  return <div ref={ref} className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center group" style={{
    opacity: 0
  }}>
        <div className="mb-4 sm:mb-5 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-100 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>;
});