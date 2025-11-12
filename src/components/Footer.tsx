import { LucideFacebook, LucideInstagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return <footer className="bg-gray-800 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Email: </span>
                <a href="mailto:contact@lpwebstudio.co.za" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1">
                  contact@lpwebstudio.co.za
                </a>
              </li>
              <li>
                <span className="text-gray-400">Phone: </span>
                <a href="tel:0673852286" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1">
                  (067) 385-2286
                </a>
              </li>
              <li className="text-gray-300">Cape Town, South Africa</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1" title="LP Web Studio Home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1" title="LP Web Studio Portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1" title="LP Web Studio About">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1" title="LP Web Studio Contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr" className="text-white hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
                <LucideFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/lp.web.studio/" className="text-white hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
                <LucideInstagram size={24} />
              </a>
              <a href="https://wa.me/27673852286" className="text-white hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp-logo.jpg" alt="WhatsApp" className="w-6 h-6 rounded" />
              </a>
            </div>
            <p className="text-gray-500 text-xs">
              <a href="https://www.flaticon.com/free-icons/whatsapp" title="whatsapp icons" className="hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1">
                Whatsapp icons created by Freepik - Flaticon
              </a>
            </p>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} LP Web Studio. All rights reserved. Built with ❤️ in Cape Town.
          </p>
        </div>
      </div>
    </footer>;
}