import React from 'react';

const IndigenousPatterns = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
            {/* Traditional Filipino Pattern SVG */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <path d="M0 100 L50 0 L100 100 L150 0 L200 100" stroke="currentColor" fill="none" strokeWidth="2"/>
                        <path d="M0 150 L50 50 L100 150 L150 50 L200 150" stroke="currentColor" fill="none" strokeWidth="2"/>
                        <circle cx="50" cy="100" r="10" fill="currentColor"/>
                        <circle cx="150" cy="100" r="10" fill="currentColor"/>
                        <circle cx="100" cy="50" r="10" fill="currentColor"/>
                        <circle cx="100" cy="150" r="10" fill="currentColor"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)"/>
            </svg>
            
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-indigenous-gold/20 rounded-full" />
            <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-indigenous-terracotta/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 
                          border-2 border-indigenous-earth/10 rounded-full" />
        </div>
    );
};

export default IndigenousPatterns;