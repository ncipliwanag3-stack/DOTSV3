import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-amber-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">NCIP</h3>
                        <p className="text-amber-200 text-sm">
                            Protecting and promoting the rights of Indigenous Peoples in the Philippines.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-amber-200 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-amber-200 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-amber-200 hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-amber-200 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/process" className="text-amber-200 hover:text-white transition-colors">
                                    Process
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-amber-200 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-amber-200 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-amber-300 mt-1" />
                                <span className="text-amber-200 text-sm">NCIP Central Office, Quezon City, Philippines</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-amber-300" />
                                <span className="text-amber-200 text-sm">(02) 1234-5678</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-amber-300" />
                                <span className="text-amber-200 text-sm">info@ncip.gov.ph</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-amber-800 mt-8 pt-8 text-center">
                    <p className="text-amber-300 text-sm">
                        © 2024 National Commission on Indigenous Peoples. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;