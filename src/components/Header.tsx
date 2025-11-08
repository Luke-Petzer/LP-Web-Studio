import { useEffect, useState } from 'react';
import { LucideFacebook, LucideInstagram, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
        <Link to="/" className="flex items-center group">
          <img src="/logo.svg" alt="LP Logo" className="h-12 sm:h-14 w-auto object-contain mr-2 sm:mr-3" />
          <img src="/my-logo.svg" alt="LP Web Studio Logo" className="h-6 sm:h-8 w-auto object-contain" />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <SocialLinks />
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 md:hidden border-t border-gray-100">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <NavLinks mobile />
              <div className="flex space-x-4 pt-2 border-t border-gray-200 justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>;
}
function NavLinks({
  mobile = false
}) {
  const location = useLocation();
  const linkClass = `font-semibold text-lg transition-colors duration-200 ${mobile ? 'block py-2' : 'hover:text-orange-500 hover:underline underline-offset-4'}`;
  return <>
      <Link to="/" className={`${linkClass} ${location.pathname === '/' ? 'text-orange-500 underline' : ''}`}>Home</Link>
      <Link to="/portfolio" className={`${linkClass} ${location.pathname === '/portfolio' ? 'text-orange-500 underline' : ''}`}>Portfolio</Link>
      <Link to="/about" className={`${linkClass} ${location.pathname === '/about' ? 'text-orange-500 underline' : ''}`}>About Me</Link>
      <Link to="/contact" className={`${linkClass} ${location.pathname === '/contact' ? 'text-orange-500 underline' : ''}`}>Contact</Link>
    </>;
}
function SocialLinks() {
  return <>
      {/*<a href="https://www.linkedin.com/in/your-profile" className="text-gray-700 hover:text-orange-500 transition-colors" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">*/}
      {/*  <LucideLinkedin size={20} />*/}
      {/*</a>*/}
      <a href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr" className="text-gray-700 hover:text-orange-500 transition-colors" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
        <LucideFacebook size={20} />
      </a>
      <a href="https://www.instagram.com/lp.web.studio/" className="text-gray-700 hover:text-orange-500 transition-colors" aria-label="Instagram" rel="noopener noreferrer" target="_blank">
        <LucideInstagram size={20} />
      </a>
    </>;
}