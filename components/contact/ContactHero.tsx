import { MessageSquare } from 'lucide-react';

export function ContactHero() {
  return (
    <section className="relative py-20 md:py-28 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-sm text-slate-300 mb-6">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            <span>Let's Connect</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-50 animate-fade-in">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Touch
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed animate-fade-in">
            Have a project in mind or need a website for your business? I'd love
            to hear from you! Fill out the form below and I'll get back to you
            as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
}