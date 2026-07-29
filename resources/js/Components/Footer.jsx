import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-manobo-dark text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold manobo-font mb-4">NCIP</h3>
                        <p className="text-gray-300 text-sm">
                            National Commission of Indigenous People<br />
                            Protecting the rights of Indigenous Cultural Communities
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/process" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Process
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Indigenous Communities
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Legal Documents
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Reports & Publications
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-manobo-accent transition-colors text-sm">
                                    Announcements
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start space-x-2">
                                <MapPin size={16} className="text-manobo-accent mt-1" />
                                <span className="text-gray-300 text-sm">
                                    QC, Philippines
                                </span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Phone size={16} className="text-manobo-accent mt-1" />
                                <span className="text-gray-300 text-sm">
                                    +63 2 8123 4567
                                </span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <Mail size={16} className="text-manobo-accent mt-1" />
                                <span className="text-gray-300 text-sm">
                                    info@ncip.gov.ph
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {currentYear} National Commission of Indigenous People. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}