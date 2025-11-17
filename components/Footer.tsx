import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="relative bg-slate-800 text-white z-20">
      {/* CTA Section */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Ready to grow your business online? Let's create a website that helps
            your customers find and connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
            <a
              href="https://wa.me/27673852286"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-3 text-slate-300">
              <p>
                <span className="text-slate-400">Email:</span>{' '}
                <a
                  href="mailto:contact@lpwebstudio.co.za"
                  className="hover:text-orange-500 transition-colors"
                >
                  contact@lpwebstudio.co.za
                </a>
              </p>
              <p>
                <span className="text-slate-400">Phone:</span>{' '}
                <a
                  href="tel:+27673852286"
                  className="hover:text-orange-500 transition-colors"
                >
                  (067) 385-2286
                </a>
              </p>
              <p className="text-slate-400">Cape Town, South Africa</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-slate-300 hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="block text-slate-300 hover:text-orange-500 transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className="block text-slate-300 hover:text-orange-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-slate-300 hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Follow Me */}
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-slate-700 hover:bg-orange-500 rounded transition-colors"
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
                className="w-10 h-10 flex items-center justify-center bg-slate-700 hover:bg-orange-500 rounded transition-colors"
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
                className="w-10 h-10 flex items-center justify-center bg-slate-700 hover:bg-orange-500 rounded transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Whatsapp icons created by Freepik - Flaticon
            </p>
          </div>
        </div>
      </div>



    </footer>
  );
};
