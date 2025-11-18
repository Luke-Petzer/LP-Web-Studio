import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 selection:bg-orange-500 selection:text-white">
      {/* Fixed Parallax Background with Floating Geometric Shapes */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Large Floating Geometric Shapes - Hidden on small screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {/* Top Left - Orange Glow */}
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float"></div>

          {/* Middle Right - Teal Glow */}
          <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

          {/* Bottom Center - Orange Glow */}
          <div className="absolute bottom-[20%] left-[30%] w-80 h-80 bg-orange-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

          {/* Top Right - Teal Accent */}
          <div className="absolute top-[25%] right-[25%] w-64 h-64 bg-teal-400/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

          {/* Bottom Right - Orange Accent */}
          <div className="absolute bottom-[10%] right-[20%] w-72 h-72 bg-orange-500/12 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Mobile - Smaller shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
          <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-[25%] left-[10%] w-56 h-56 bg-teal-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Content Layer - Scrolls over fixed background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};