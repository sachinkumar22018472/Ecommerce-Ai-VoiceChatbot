import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-200">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-wider">
              FOREVER<span className="text-gray-400">.</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              High-quality clothing and accessories delivered straight to your doorstep. Committed to fast shipping, safe payments, and customer satisfaction.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Delivery Information</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              HELP & SUPPORT
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Customer Support</a></li>
              <li><a href="#" className="hover:text-black transition-colors">7 Days Return Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Easy Exchange</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              GET IN TOUCH
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <HiOutlinePhone className="text-lg text-gray-800 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <HiOutlineMail className="text-lg text-gray-800 flex-shrink-0" />
                <span>support@forever.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <HiOutlineLocationMarker className="text-lg text-gray-800 flex-shrink-0 mt-0.5" />
                <span>123 Market St, Suite 500, New York, NY</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} FOREVER. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;