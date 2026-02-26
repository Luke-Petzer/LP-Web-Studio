import React, { useEffect, useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import Link from 'next/link';

export function PricingSection() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Staggered animation for pricing cards
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-slate-800/40 backdrop-blur-sm border border-orange-200 dark:border-slate-700/50 text-sm text-orange-900 dark:text-slate-300 mb-6 transition-colors duration-300">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
            Pricing &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Packages
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Choose the perfect package for your business. All plans include mobile-friendly design and professional support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1: The Starter Template */}
          <PricingCard
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            title="The Starter Template"
            price="R2,500"
            priceType="Once-Off"
            subtitle="Perfect for getting online fast."
            features={[
              '1-Page Professional Website',
              '"Book Now" WhatsApp Button',
              'Google Maps Location',
              'Mobile Friendly Design'
            ]}
            footnote="+ R350/pm Hosting & Care"
            recommended={false}
          />

          {/* Card 2: The Professional (Recommended) */}
          <PricingCard
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            title="The Professional"
            price="R4,500"
            priceType="Once-Off"
            subtitle="The complete solution to grow your brand."
            features={[
              'Everything in Starter, plus:',
              '3-Page Custom Design',
              'Online Booking Integration',
              'Photo Gallery (Showcase your work)',
              'Google Business Profile Setup'
            ]}
            footnote="+ R350/pm Hosting & Care"
            recommended={true}
          />

          {/* Card 3: The Custom Build */}
          <PricingCard
            ref={(el) => {
              cardsRef.current[2] = el;
            }}
            title="The Custom Build"
            price="Contact for Quote"
            priceType=""
            subtitle="For established businesses needing unique features."
            features={[
              '5+ Pages',
              'Performance & Basic SEO',
              'Custom Features (Blogs, APIs)',
              'Priority Support'
            ]}
            footnote="+ R350/pm Hosting & Care"
            recommended={false}
          />
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  priceType: string;
  subtitle: string;
  features: string[];
  footnote: string;
  recommended?: boolean;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({ title, price, priceType, subtitle, features, footnote, recommended = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative group
          bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm 
          border transition-all duration-300
          rounded-2xl p-8
          hover:shadow-2xl
          ${
            recommended
              ? 'border-orange-500 shadow-xl shadow-orange-500/20 dark:shadow-orange-500/10 md:scale-105'
              : 'border-slate-200 dark:border-slate-800 hover:border-orange-500/50'
          }
        `}
      >
        {/* Recommended Badge */}
        {recommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
              Recommended
            </span>
          </div>
        )}

        {/* Card Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 transition-colors duration-300">
            {subtitle}
          </p>

          {/* Price */}
          <div className="mb-2">
            <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 transition-colors duration-300">
              {price}
            </span>
            {priceType && (
              <span className="text-slate-600 dark:text-slate-400 text-lg ml-2 transition-colors duration-300">
                {priceType}
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Footnote */}
        <div className="mb-6 pt-4 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center transition-colors duration-300">
            {footnote}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`
            block w-full text-center px-6 py-3 rounded-xl font-semibold
            transition-all duration-300
            ${
              recommended
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:-translate-y-1'
            }
          `}
        >
          Get Started
        </Link>
      </div>
    );
  }
);

PricingCard.displayName = 'PricingCard';

