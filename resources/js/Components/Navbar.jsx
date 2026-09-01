import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Disclosure, Menu as HeadlessMenu, Transition } from '@headlessui/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Process', href: '/process' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <nav className="manobo-header shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/ncip-logo-transparent.png"
                                alt="National Commission on Indigenous Peoples logo"
                                className="h-12 w-auto max-w-[220px] object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white hover:text-manobo-accent transition-colors duration-200 font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                        
                        {auth?.user ? (
                            <div className="relative">
                                <HeadlessMenu as="div" className="relative">
                                    {({ open }) => (
                                        <>
                                            <HeadlessMenu.Button className="flex items-center space-x-2 text-white hover:text-manobo-accent transition-colors duration-200">
                                                <span>{auth.user.name}</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </HeadlessMenu.Button>
                                            <Transition
                                                show={open}
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-manobo-secondary">
                                                    <HeadlessMenu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/dashboard"
                                                                className={`block px-4 py-2 text-sm ${
                                                                    active ? 'bg-manobo-light' : ''
                                                                }`}
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        )}
                                                    </HeadlessMenu.Item>
                                                    <HeadlessMenu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={handleLogout}
                                                                className={`block w-full text-left px-4 py-2 text-sm ${
                                                                    active ? 'bg-manobo-light' : ''
                                                                }`}
                                                            >
                                                                Logout
                                                            </button>
                                                        )}
                                                    </HeadlessMenu.Item>
                                                </HeadlessMenu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </HeadlessMenu>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="manobo-button px-4 py-2"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-manobo-accent transition-colors duration-200"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-white hover:text-manobo-accent transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {auth?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="block px-3 py-2 text-white hover:text-manobo-accent transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 text-white hover:text-manobo-accent transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-3 py-2 text-white hover:text-manobo-accent transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}