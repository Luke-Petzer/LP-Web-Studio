import { Button } from './ui/Button';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
export function ContactCTA() {
  const ctaRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={ctaRef} className="py-16 md:py-20 lg:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-on-scroll opacity-0">
            Let’s Build Something Great Together
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 mx-auto opacity-90 animate-on-scroll">
            Ready to grow your business online?
            Let’s create a website that helps your customers find and connect with you.
          </p>
          <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
            <Button href="https://wa.me/27673852286" variant="outline-light">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>;
}