import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-slate-800 text-slate-900 dark:text-white z-20 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">

      {/* Footer Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">
              Contact Info
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:contact@lpwebstudio.co.za"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  contact@lpwebstudio.co.za
                </a>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+27673852286"
                  className="hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  067 385 2286
                </a>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Cape Town, South Africa</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:translate-x-1 transition-all duration-200"
              >
                → Home
              </Link>
              <Link
                href="/portfolio"
                className="block text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:translate-x-1 transition-all duration-200"
              >
                → Portfolio
              </Link>
              <Link
                href="/about"
                className="block text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:translate-x-1 transition-all duration-200"
              >
                → About
              </Link>
              <Link
                href="/contact"
                className="block text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:translate-x-1 transition-all duration-200"
              >
                → Contact
              </Link>
            </nav>
          </div>

          {/* Follow Me */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider transition-colors duration-300">
              Follow Me
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              Stay connected and follow my latest projects and updates
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
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
                className="w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <a
                href="https://wa.me/27673852286"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">
              WhatsApp icons by Freepik - Flaticon
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-slate-600 dark:text-slate-400">
              <p>
                © {new Date().getFullYear()} <span className="font-semibold text-slate-900 dark:text-white">LP Web Studio</span>. All Rights Reserved.
              </p>
              <span className="hidden md:inline">•</span>
              <Link
                href="/privacy-policy"
                className="text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                Made with
                <span className="text-orange-500">❤</span>
                in Cape Town
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
