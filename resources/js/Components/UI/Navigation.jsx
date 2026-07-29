import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Process', href: '/process' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-indigenous-gold">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigenous-terracotta rounded-full flex items-center justify-center">
                            <span className="text-white font-display text-xl">🏛️</span>
                        </div>
                        <span className="font-display text-2xl text-indigenous-dark">
                            Indigenous<span className="text-indigenous-terracotta">PH</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="font-body text-indigenous-dark hover:text-indigenous-terracotta 
                                         transition-colors duration-300 relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigenous-gold 
                                               group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                        
                        {/* Auth Links */}
                        {auth?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="bg-indigenous-terracotta text-white px-6 py-2 rounded-full 
                                             hover:bg-indigenous-terracotta/90 transition-colors duration-300"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="font-body text-indigenous-dark hover:text-indigenous-terracotta"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="font-body text-indigenous-dark hover:text-indigenous-terracotta"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigenous-gold text-white px-6 py-2 rounded-full 
                                             hover:bg-indigenous-gold/90 transition-colors duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? (
                            <XMarkIcon className="w-6 h-6 text-indigenous-dark" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-indigenous-dark" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 px-4 text-indigenous-dark hover:bg-indigenous-cream 
                                         rounded-lg transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block py-2 px-4 text-indigenous-dark hover:bg-indigenous-cream 
                                                 rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left py-2 px-4 text-red-600 
                                                 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block py-2 px-4 text-indigenous-dark hover:bg-indigenous-cream 
                                                 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block py-2 px-4 bg-indigenous-gold text-white rounded-lg 
                                                 hover:bg-indigenous-gold/90 transition-colors mt-2 text-center"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;