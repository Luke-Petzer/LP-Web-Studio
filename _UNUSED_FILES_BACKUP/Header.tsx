import { useState, useEffect } from 'react';
import Link from 'next/link';

const NavLinks = () => (
  <>
    <Link href="/about"><a className="text-slate-900 hover:text-orange-500 transition-colors duration-300">About</a></Link>
    <Link href="/portfolio"><a className="text-slate-900 hover:text-orange-500 transition-colors duration-300">Portfolio</a></Link>
    <Link href="/contact"><a className="text-slate-900 hover:text-orange-500 transition-colors duration-300">Contact</a></Link>
  </>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md h-20 flex items-center z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900">
            <Link href="/"><a>MyLogo</a></Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex items-center justify-center">
          <nav className="flex flex-col items-center space-y-8 text-2xl">
            <NavLinks />
          </nav>
        </div>
      )}
    </>
  );
};