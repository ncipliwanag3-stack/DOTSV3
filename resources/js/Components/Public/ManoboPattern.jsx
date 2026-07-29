import React from 'react';

const ManoboPattern = () => {
    return (
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id="manobo-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Traditional Manobo-inspired geometric patterns */}
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#78350F" strokeWidth="2"/>
                    <path d="M25 25 L75 25 L75 75 L25 75 Z" fill="none" stroke="#78350F" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#78350F" strokeWidth="2"/>
                    <path d="M50 15 L60 30 L40 30 Z" fill="#78350F" opacity="0.3"/>
                    <path d="M50 85 L60 70 L40 70 Z" fill="#78350F" opacity="0.3"/>
                    <path d="M15 50 L30 40 L30 60 Z" fill="#78350F" opacity="0.3"/>
                    <path d="M85 50 L70 40 L70 60 Z" fill="#78350F" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#manobo-pattern)" />
            </svg>
        </div>
    );
};

export default ManoboPattern;