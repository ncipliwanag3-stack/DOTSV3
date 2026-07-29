import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Process', href: '/process' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (href) => url === href;

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">NCIP</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-amber-900">NCIP</h1>
                                <p className="text-xs text-amber-700">National Commission on Indigenous Peoples</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    isActive(link.href)
                                        ? 'text-amber-800 border-b-2 border-amber-800'
                                        : 'text-gray-700 hover:text-amber-800'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-amber-800 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive(link.href)
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium bg-amber-800 text-white hover:bg-amber-900"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;