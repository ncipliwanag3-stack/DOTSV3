import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-ncip-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-ncip-secondary font-display text-xl font-bold mb-4">
              NCIP
            </h3>
            <p className="text-gray-400 text-sm">
              Protecting the rights and welfare of indigenous peoples in the Philippines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-ncip-secondary transition-colors">About Us</a></li>
              <li><a href="/process" className="hover:text-ncip-secondary transition-colors">Process</a></li>
              <li><a href="/faq" className="hover:text-ncip-secondary transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-ncip-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <FaPhone className="text-ncip-secondary" />
                (02) 1234-5678
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-ncip-secondary" />
                info@ncip.gov.ph
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-ncip-secondary transition-colors text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-ncip-secondary transition-colors text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-ncip-secondary transition-colors text-2xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 National Commission on Indigenous Peoples. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}