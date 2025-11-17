import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
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

    const isActive = (path: string) => router.pathname === path;

    return (
        <>
            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
                <div className="w-full h-20 px-6 lg:px-12 max-w-[1920px] mx-auto">
                    <div className="h-full flex items-center justify-between">
                        {/* Logo Section - Left */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                            <img
                                src="/logo.svg"
                                alt="LP Logo"
                                className="h-12 w-auto"
                            />
                            <img
                                src="/my-logo.svg"
                                alt="LP Web Studio"
                                className="h-7 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation - Right */}
                        <div className="hidden md:flex items-center gap-10">
                            <nav className="flex items-center gap-10">
                                <Link
                                    href="/"
                                    className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                                        isActive('/') ? 'text-orange-500' : 'text-gray-800'
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                                        isActive('/portfolio') ? 'text-orange-500' : 'text-gray-800'
                                    }`}
                                >
                                    Portfolio
                                </Link>
                                <Link
                                    href="/about"
                                    className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                                        isActive('/about') ? 'text-orange-500' : 'text-gray-800'
                                    }`}
                                >
                                    About Me
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`font-semibold text-base transition-colors hover:text-orange-500 ${
                                        isActive('/contact') ? 'text-orange-500' : 'text-gray-800'
                                    }`}
                                >
                                    Contact
                                </Link>
                            </nav>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-orange-500 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/lp.web.studio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-orange-500 transition-colors"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button - Right */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Full Viewport Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Full Viewport Menu */}
                    <div className="absolute inset-0 bg-white flex flex-col">
                        {/* Navigation Links - Centered and Stacked */}
                        <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/portfolio"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/portfolio') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                                }`}
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/about') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                                }`}
                            >
                                About Me
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/contact') ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                                }`}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Social Links - Bottom */}
                        <div className="flex justify-center gap-8 py-8 border-t border-gray-200">
                            <a
                                href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-orange-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/lp.web.studio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-orange-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}