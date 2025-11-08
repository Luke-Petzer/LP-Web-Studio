
export function ContactHero() {
  return <section className="relative py-20 md:py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-40 h-40 bg-orange-500/10 rounded-full mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-[30%] right-[15%] w-64 h-64 bg-teal-500/10 rounded-full mix-blend-multiply animate-float"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in">
            Have a project in mind or need a website for your business? I'd love
            to hear from you! Fill out the form below and I'll get back to you
            as soon as possible.
          </p>
        </div>
      </div>
    </section>;
}