import React, { useEffect, useRef, forwardRef } from 'react';
import { Monitor, Calendar, MapPin, Shield, Sparkles, Zap } from 'lucide-react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Link from 'next/link';

export function ServicesSection() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Staggered animation for service cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }, 150 * index);
                observer.unobserve(card);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(card);
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-slate-800/40 backdrop-blur-sm border border-teal-200 dark:border-slate-700/50 text-sm text-teal-900 dark:text-slate-300 mb-6 transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            <span>Complete Digital Solutions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Grow Online
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            We don't just build websites; we build systems that bring you customers.
          </p>
        </div>

        {/* Bento Grid - Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ServiceCard
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            icon={<Monitor size={40} className="text-orange-500" />}
            title="Professional Website Design"
            description="Mobile-friendly, fast, and custom-designed to make your business look expensive. Perfect for building trust with new clients."
            bestFor="Everyone"
            featured={false}
          />
          <ServiceCard
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            icon={<Calendar size={40} className="text-teal-400" />}
            title="Booking & Automation"
            description="Stop playing phone tag. We integrate automated booking systems (Fresha, Calendly, WhatsApp) so clients can book you 24/7."
            bestFor="Hair Salons, Tutors, Mechanics"
            featured={true}
          />
          <ServiceCard
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            icon={<MapPin size={40} className="text-orange-500" />}
            title="Web Optimization & Setup"
            description="Get found online with essential SEO basics, Google Business Profile setup, and fast-loading pages. We cover the fundamentals to help locals find you."
            bestFor="Local Services & Trades"
            featured={false}
          />
          <ServiceCard
            ref={(el) => {
              cardsRef.current[3] = el;
            }}
            icon={<Shield size={40} className="text-teal-400" />}
            title="Monthly Peace of Mind"
            description="Never worry about updates or security. We host, secure, and update your site monthly so you can focus on your business."
            bestFor="Starts at R350/pm"
            isPricing={true}
            featured={false}
          />
        </div>

        {/* Call to Action Card */}
        <div className="relative">
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 text-center hover:border-orange-500/50 transition-all duration-300">
            {/* Decorative glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300">
                Not sure what you need? Let's chat.
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto transition-colors duration-300">
                Get a free consultation and discover how we can help your business grow online.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bestFor: string;
  isPricing?: boolean;
  featured?: boolean;
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ icon, title, description, bestFor, isPricing = false, featured = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative group
          bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm 
          border transition-all duration-300
          rounded-2xl p-6 md:p-8
          hover:border-orange-500/50 hover:-translate-y-2
          ${featured ? 'border-orange-500/50 shadow-lg shadow-orange-500/20' : 'border-slate-200 dark:border-slate-800'}
        `}
        style={{ opacity: 0 }}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Most Popular
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/0 to-teal-500/0 group-hover:from-orange-500/20 group-hover:to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative">
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed transition-colors duration-300">
            {description}
          </p>

          {/* Best For Tag */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <p className="text-sm font-semibold">
              <span className={isPricing ? 'text-orange-500 dark:text-orange-400' : 'text-slate-500 dark:text-slate-500'}>
                {isPricing ? '💰 ' : '✓ '}Best For:
              </span>{' '}
              <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">{bestFor}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);
