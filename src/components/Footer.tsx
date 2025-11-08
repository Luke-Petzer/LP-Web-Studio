import { LucideFacebook, LucideInstagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Email: </span>
                <a href="mailto:contact@lpwebstudio.co.za" className="hover:text-orange-400 transition-colors">
                  contact@lpwebstudio.co.za
                </a>
              </li>
              <li>
                <span className="text-gray-400">Phone: </span>
                <a href="tel:0673852286" className="hover:text-orange-400 transition-colors">
                  (067) 385-2286
                </a>
              </li>
              <li className="text-gray-300">Cape Town, South Africa</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors" title="LP Web Studio Home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-orange-400 transition-colors" title="LP Web Studio Portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors" title="LP Web Studio About">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors" title="LP Web Studio Contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1B6hCGLJbh/?mibextid=wwXIfr" className="text-white hover:text-blue-400 transition-colors" aria-label="Facebook">
                <LucideFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/lp.web.studio/" className="text-white hover:text-pink-400 transition-colors" aria-label="Instagram">
                <LucideInstagram size={24} />
              </a>
              <a href="https://wa.me/27673852286" className="text-white hover:text-green-400 transition-colors" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <img src="/whatsapp-logo.jpg" alt="WhatsApp" className="w-6 h-6 rounded" />
              </a>
            </div>
            <p className="mt-2 text-gray-500 text-xs">
              <a href="https://www.flaticon.com/free-icons/whatsapp" title="whatsapp icons" className="hover:text-gray-300 transition-colors">
                Whatsapp icons created by Freepik - Flaticon
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>;
}