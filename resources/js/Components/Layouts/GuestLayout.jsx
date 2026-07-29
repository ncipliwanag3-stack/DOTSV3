import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '../UI/Header';
import Footer from '../UI/Footer';
import IndigenousPatterns from '../UI/IndigenousPatterns';

const GuestLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-indigenous-cream">
            <IndigenousPatterns />
            <Header />
            <main className="relative z-10">
                <div className="container mx-auto px-4 py-8">
                    {title && (
                        <h1 className="font-display text-4xl md:text-5xl text-indigenous-dark text-center mb-8">
                            {title}
                        </h1>
                    )}
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default GuestLayout;