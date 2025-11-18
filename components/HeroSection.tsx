import { useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { Sparkles, TrendingUp } from 'lucide-react';

export function HeroSection() {
  const heroRef = useAnimateOnScroll<HTMLElement>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sequential animation for hero elements
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const button = buttonRef.current;
    const card = cardRef.current;

    if (heading && paragraph && button && card) {
      // Reset initial opacity
      heading.style.opacity = '0';
      paragraph.style.opacity = '0';
      button.style.opacity = '0';
      card.style.opacity = '0';

      // Animate in sequence
      setTimeout(() => {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
        heading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 200);

      setTimeout(() => {
        paragraph.style.opacity = '1';
        paragraph.style.transform = 'translateY(0)';
        paragraph.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 400);

      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
        button.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 600);

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 800);
    }
  }, []);

  return (
    <section
      className="relative flex items-center justify-center min-h-screen py-20 px-4 overflow-hidden"
      ref={heroRef}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-slate-800/50 backdrop-blur-sm border border-orange-200 dark:border-slate-700/50 text-sm text-orange-900 dark:text-slate-300 mb-6 animate-fade-in-up transition-colors duration-300">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Premium Web Solutions for Cape Town Businesses</span>
            </div>

            {/* Headline */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight opacity-0 transition-colors duration-300"
              style={{ transform: 'translateY(20px)' }}
            >
              Turn Google Searches into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                Paying Customers
              </span>
            </h1>

            {/* Subheadline */}
            <p
              ref={paragraphRef}
              className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-0 transition-colors duration-300"
              style={{ transform: 'translateY(20px)' }}
            >
              We build high-performance websites that get found on Google, convert visitors into leads, and grow your business 24/7.
            </p>

            {/* CTA Button */}
            <div
              ref={buttonRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0"
              style={{ transform: 'translateY(20px)' }}
            >
              <Button
                href="/portfolio"
                variant="primary"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                View Our Work
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-50 hover:border-orange-500 hover:text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Get Started Free
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-12 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">100% Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">SEO Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Right Side - Glassmorphic Visual Card */}
          <div
            ref={cardRef}
            className="hidden lg:block opacity-0"
            style={{ transform: 'scale(0.9)' }}
          >
            <div className="relative">
              {/* Main Glassmorphic Card */}
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-2xl transition-colors duration-300">
                {/* Mock Browser Window */}
                <div className="bg-slate-100 dark:bg-slate-900/80 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 transition-colors duration-300">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-200/80 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 ml-4 bg-white dark:bg-slate-900/50 rounded px-3 py-1 text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300">
                      your-business.co.za
                    </div>
                  </div>

                  {/* Browser Content */}
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gradient-to-r from-orange-500/50 to-transparent rounded"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700/50 rounded w-3/4 transition-colors duration-300"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700/50 rounded w-full transition-colors duration-300"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700/50 rounded w-5/6 transition-colors duration-300"></div>
                    <div className="mt-6 flex gap-3">
                      <div className="h-10 bg-orange-500/30 rounded flex-1"></div>
                      <div className="h-10 bg-slate-300 dark:bg-slate-700/30 rounded flex-1 transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-500/50 animate-float">
                  #1 in Cape Town
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500/30 dark:bg-teal-500/20 rounded-full blur-2xl transition-colors duration-300"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/30 dark:bg-orange-500/20 rounded-full blur-2xl transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-500 dark:text-slate-400 transition-colors duration-300"
        >
          <path
            d="M12 5V19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}