import { Button } from './ui/Button';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

export function ContactCTA() {
  const ctaRef = useAnimateOnScroll<HTMLElement>();

  return (
    <section ref={ctaRef} className="relative py-16 md:py-20 lg:py-24 bg-slate-100 dark:bg-slate-900 backdrop-blur-sm z-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-on-scroll opacity-0 text-slate-900 dark:text-slate-50 transition-colors duration-300">
            Let's Build Something Great Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 mx-auto animate-on-scroll text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-300">
            Ready to grow your business online?
            Let's create a website that helps your customers find and connect with you.
          </p>
          <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
            >
              Get in Touch
            </Button>
            <Button
              href="https://wa.me/27673852286"
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}