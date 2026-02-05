import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

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
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="h-20 px-6 lg:px-12 max-w-[1920px] mx-auto">
                    <div className="h-full flex items-center justify-between">
                        {/* Logo Section - Left */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                            <img
                                src="/Logo.png"
                                alt="LP Logo"
                                className="h-16 w-auto dark:invert transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                fetchPriority="high"
                            />
                            <img
                                src="/My-Logo.png"
                                alt="LP Web Studio"
                                className="h-12 w-auto dark:invert transition-all duration-300 group-hover:scale-105"
                                fetchPriority="high"
                            />
                        </Link>

                        {/* Desktop Navigation - Right */}
                        <div className="hidden md:flex items-center gap-8">
                            <nav className="flex items-center gap-8">
                                <Link
                                    href="/"
                                    className={`font-semibold text-base transition-all duration-200 hover:scale-110 ${
                                        isActive('/') ? 'text-orange-500' : 'text-slate-700 dark:text-slate-300 hover:text-orange-500'
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className={`font-semibold text-base transition-all duration-200 hover:scale-110 ${
                                        isActive('/portfolio') ? 'text-orange-500' : 'text-slate-700 dark:text-slate-300 hover:text-orange-500'
                                    }`}
                                >
                                    Portfolio
                                </Link>
                                <Link
                                    href="/about"
                                    className={`font-semibold text-base transition-all duration-200 hover:scale-110 ${
                                        isActive('/about') ? 'text-orange-500' : 'text-slate-700 dark:text-slate-300 hover:text-orange-500'
                                    }`}
                                >
                                    About Me
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`font-semibold text-base transition-all duration-200 hover:scale-110 ${
                                        isActive('/contact') ? 'text-orange-500' : 'text-slate-700 dark:text-slate-300 hover:text-orange-500'
                                    }`}
                                >
                                    Contact
                                </Link>
                            </nav>

                            {/* Divider */}
                            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 hover:-rotate-6 hover:shadow-md"
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
                                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 hover:rotate-6 hover:shadow-md"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-500 transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-500"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                suppressHydrationWarning
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 hover:rotate-90 transition-transform duration-300" />
                                ) : (
                                    <Moon className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                                )}
                            </button>
                        </div>

                        {/* Mobile - Theme Toggle and Menu Button */}
                        <div className="md:hidden flex items-center gap-3">
                            {/* Theme Toggle Button - Mobile */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-500 transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:shadow-md"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                suppressHydrationWarning
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-500 transition-all duration-200 border border-slate-200 dark:border-slate-700 hover:scale-110 hover:shadow-md active:scale-95"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5 transition-transform duration-200" />
                                ) : (
                                    <Menu className="w-5 h-5 transition-transform duration-200" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Full Viewport Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Full Viewport Menu */}
                    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-lg flex flex-col">
                        {/* Navigation Links - Centered and Stacked */}
                        <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/') ? 'text-orange-500' : 'text-slate-100 hover:text-orange-500'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/portfolio"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/portfolio') ? 'text-orange-500' : 'text-slate-100 hover:text-orange-500'
                                }`}
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/about') ? 'text-orange-500' : 'text-slate-100 hover:text-orange-500'
                                }`}
                            >
                                About Me
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-4xl font-bold transition-colors ${
                                    isActive('/contact') ? 'text-orange-500' : 'text-slate-100 hover:text-orange-500'
                                }`}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Social Icons - Bottom */}
                        <div className="flex justify-center items-center gap-8 pb-12">
                            <a
                                href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-orange-500 transition-colors"
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
                                className="text-slate-400 hover:text-orange-500 transition-colors"
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