import React from 'react';
import Navbar from '../Components/Public/Navbar';
import Footer from '../Components/Public/Footer';
import ManoboPattern from '../Components/Public/ManoboPattern';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
            <ManoboPattern />
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;