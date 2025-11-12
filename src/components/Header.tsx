import { useEffect, useState } from 'react';
import { LucideFacebook, LucideInstagram, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
        <Link href="/" className="flex items-center group">
          <img src="/logo.svg" alt="LP Logo" className="h-12 sm:h-14 w-auto object-contain mr-2 sm:mr-3" />
          <img src="/my-logo.svg" alt="LP Web Studio Logo" className="h-6 sm:h-8 w-auto object-contain" />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800 p-2 -mr-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <SocialLinks />
        </nav>
      </div>
    </header>

    {/* Full-screen Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-40 md:hidden bg-white/98 backdrop-blur-sm animate-slide-in-right" style={{
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)'
      }}>
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Logo at top */}
          <div className="flex justify-center mb-12">
            <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.svg" alt="LP Logo" className="h-16 w-auto object-contain mr-3" />
              <img src="/my-logo.svg" alt="LP Web Studio Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
            <MobileNavLinks onLinkClick={() => setMobileMenuOpen(false)} />
          </nav>

          {/* Social Links at bottom */}
          <div className="flex justify-center space-x-8 pt-8 border-t border-gray-200">
            <SocialLinks />
          </div>
        </div>
      </div>
    )}
  </>;
}
function NavLinks() {
  const router = useRouter();
  const linkClass = 'font-semibold text-lg transition-colors duration-200 hover:text-orange-500 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-2 py-1';

  return <>
    <Link href="/" className={`${linkClass} ${router.pathname === '/' ? 'text-orange-500 underline' : ''}`}>Home</Link>
    <Link href="/portfolio" className={`${linkClass} ${router.pathname === '/portfolio' ? 'text-orange-500 underline' : ''}`}>Portfolio</Link>
    <Link href="/about" className={`${linkClass} ${router.pathname === '/about' ? 'text-orange-500 underline' : ''}`}>About Me</Link>
    <Link href="/contact" className={`${linkClass} ${router.pathname === '/contact' ? 'text-orange-500 underline' : ''}`}>Contact</Link>
  </>;
}

function MobileNavLinks({ onLinkClick }: { onLinkClick: () => void }) {
  const router = useRouter();
  const linkClass = 'font-bold text-3xl transition-all duration-300 hover:text-orange-500 hover:scale-110 active:scale-95 active:opacity-80 text-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg px-4 py-2 min-h-[44px] min-w-[44px]';

  return <>
    <Link
      href="/"
      className={`${linkClass} ${router.pathname === '/' ? 'text-orange-500' : 'text-gray-800'}`}
      onClick={onLinkClick}
    >
      Home
    </Link>
    <Link
      href="/portfolio"
      className={`${linkClass} ${router.pathname === '/portfolio' ? 'text-orange-500' : 'text-gray-800'}`}
      onClick={onLinkClick}
    >
      Portfolio
    </Link>
    <Link
      href="/about"
      className={`${linkClass} ${router.pathname === '/about' ? 'text-orange-500' : 'text-gray-800'}`}
      onClick={onLinkClick}
    >
      About Me
    </Link>
    <Link
      href="/contact"
      className={`${linkClass} ${router.pathname === '/contact' ? 'text-orange-500' : 'text-gray-800'}`}
      onClick={onLinkClick}
    >
      Contact
    </Link>
  </>;
}
function SocialLinks() {
  return <>
      {/*<a href="https://www.linkedin.com/in/your-profile" className="text-gray-700 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded p-1" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">*/}
      {/*  <LucideLinkedin size={20} />*/}
      {/*</a>*/}
      <a href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr" className="text-gray-700 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded p-1 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
        <LucideFacebook size={20} />
      </a>
      <a href="https://www.instagram.com/lp.web.studio/" className="text-gray-700 hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded p-1 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram" rel="noopener noreferrer" target="_blank">
        <LucideInstagram size={20} />
      </a>
    </>;
}