import { useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
export function HeroSection() {
  const heroRef = useAnimateOnScroll<HTMLElement>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Simple sequential animation for hero elements
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const button = buttonRef.current;
    if (heading && paragraph && button) {
      // Reset initial opacity
      heading.style.opacity = '0';
      paragraph.style.opacity = '0';
      button.style.opacity = '0';
      // Animate in sequence with faster delays
      setTimeout(() => {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
        heading.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }, 150);
      setTimeout(() => {
        paragraph.style.opacity = '1';
        paragraph.style.transform = 'translateY(0)';
        paragraph.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }, 250);
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
        button.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }, 400);
    }
  }, []);
  return <>
    {/* Fixed background layer - stays in place while page scrolls */}
    <div className="fixed top-0 left-0 w-full h-screen z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url("/Hero.jpg")',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/85"></div>
      </div>
      {/* Animated geometric shapes - hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-[20%] left-[10%] w-40 h-40 bg-orange-500/10 rounded-full mix-blend-overlay animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[15%] w-64 h-64 bg-teal-500/10 rounded-full mix-blend-overlay animate-float"></div>
        <div className="absolute top-[40%] right-[25%] w-32 h-32 bg-indigo-500/10 rounded-full mix-blend-overlay animate-pulse-slow" style={{
          animationDelay: '2s'
        }}></div>
      </div>
    </div>

    {/* Hero content section */}
    <section className="relative flex items-center text-white overflow-hidden hero-section min-h-[100dvh] z-10" ref={heroRef}>
      <div className="relative w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center px-4 py-16 sm:py-20">
        <h1 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight opacity-0" style={{
        transform: 'translateY(20px)'
      }}>
          Cost Effective, High-Performance Websites for Small Businesses in Cape Town
        </h1>
        <p ref={paragraphRef} className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-6 sm:mb-8 max-w-2xl mx-auto opacity-0 leading-relaxed" style={{
        transform: 'translateY(20px)'
      }}>
          At LP Web Studio, we design modern, mobile-friendly websites that help your business stand out and get found online — with Google Maps, WhatsApp, and contact tools built in.
        </p>
        <div ref={buttonRef} className="opacity-0" style={{
        transform: 'translateY(20px)'
      }}>
          <Button href="/portfolio" variant="primary" size="lg">
            View Our Work
          </Button>
        </div>
      </div>
      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white opacity-80">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  </>;
}