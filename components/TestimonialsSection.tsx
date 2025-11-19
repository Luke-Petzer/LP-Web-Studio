export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              LP Web Studio?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto transition-colors duration-300">
            Professional web development with a personal touch — built for Cape Town small businesses.
          </p>
        </div>

        {/* Why Choose Us Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Fast Turnaround */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:shadow-xl hover:border-orange-500/50 hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-500/20 rounded-full mb-6 transition-colors duration-300">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 transition-colors duration-300">
              ⚡ Fast Turnaround
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              Get your business online quickly. Most projects completed within <span className="font-semibold text-orange-500">2-3 weeks</span>, with ongoing support from day one.
            </p>
          </div>

          {/* Flat Pricing */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:shadow-xl hover:border-orange-500/50 hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-500/20 rounded-full mb-6 transition-colors duration-300">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 transition-colors duration-300">
              💰 Flat Pricing
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              Transparent, affordable pricing <span className="font-semibold text-orange-500">from R2,500</span>. No hidden fees, no surprise costs. You'll know exactly what you're paying upfront.
            </p>
          </div>

          {/* Local Support */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:shadow-xl hover:border-orange-500/50 hover:scale-105 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 dark:bg-orange-500/20 rounded-full mb-6 transition-colors duration-300">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-50 transition-colors duration-300">
              🤝 Local Support
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              Real, personal support from a <span className="font-semibold text-orange-500">Cape Town developer</span> who understands your business. Same-day responses to all inquiries.
            </p>
          </div>

        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300 font-medium">
            ✓ 100% Satisfaction Guaranteed  •  ✓ Same-Day Response Time  •  ✓ Cape Town Based
          </p>
        </div>
      </div>
    </section>
  );
}