import { Star } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-50 mb-4">
            Client{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Testimonials
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            What clients say about working with LP Web Studio.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-800 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-center py-8">
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-orange-500 fill-orange-500 animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-6">
                We're currently working on exciting projects with small businesses — testimonials coming soon!
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                We're in the process of gathering feedback from our amazing clients. Stay tuned to see their thoughts on our collaboration!
              </p>

              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-orange-500/50 animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}