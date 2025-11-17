import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
export function AboutHero() {
  const sectionRef = useAnimateOnScroll<HTMLElement>();
  return <section ref={sectionRef} className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-100 rounded-full opacity-70 hidden lg:block"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full opacity-70 hidden lg:block"></div>
                <div className="relative overflow-hidden rounded-full shadow-2xl border-4 border-white">
                  <img
                    src="/Me1.JPG"
                    alt="Luke Petzer on a balcony"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-8 animate-fade-in">About LP Web Studio</h1>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed animate-fade-in">
                <p>
                  I’m Luke Petzer, the founder and developer behind LP Web Studio — a Cape Town–based web development venture dedicated to helping small businesses establish a professional, effective online presence.
                </p>
                <p>
                  I’m passionate about building clean, functional, and user-friendly websites that don’t just look good, but deliver real results. My goal is simple: create digital solutions that help your business get noticed, attract customers, and grow online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}