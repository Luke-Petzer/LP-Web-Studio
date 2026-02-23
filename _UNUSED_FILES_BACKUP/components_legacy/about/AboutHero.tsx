import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { User } from 'lucide-react';

export function AboutHero() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500/30 dark:bg-orange-500/20 rounded-full blur-2xl hidden lg:block transition-colors duration-300"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500/30 dark:bg-teal-500/20 rounded-full blur-2xl hidden lg:block transition-colors duration-300"></div>
                <div className="relative overflow-hidden rounded-full shadow-2xl border-4 border-slate-300 dark:border-slate-800 transition-colors duration-300">
                  <img
                    src="/Profile-headshot.png"
                    alt="Luke Petzer on a balcony"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-slate-800/40 backdrop-blur-sm border border-orange-200 dark:border-slate-700/50 text-sm text-orange-900 dark:text-slate-300 mb-6 transition-colors duration-300">
                <User className="w-4 h-4 text-orange-500" />
                <span>Meet the Developer</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 dark:text-slate-50 animate-fade-in transition-colors duration-300">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                  LP Web Studio
                </span>
              </h1>

              <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed animate-fade-in transition-colors duration-300">
                <p>
                  I'm Luke Petzer, the founder and developer behind LP Web Studio — a Cape Town–based web development venture dedicated to helping small businesses establish a professional, effective online presence.
                </p>
                <p>
                  I'm passionate about building clean, functional, and user-friendly websites that don't just look good, but deliver real results. My goal is simple: create digital solutions that help your business get noticed, attract customers, and grow online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}