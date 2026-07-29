import React from 'react';
import GuestLayout from '../Components/Layouts/GuestLayout';

export default function Process({ steps }) {
    const processImages = [
        '👥',
        '📝',
        '🌍'
    ];

    return (
        <GuestLayout title="Process">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-terracotta-dark mb-4 font-serif">Our Process</h1>
                    <p className="text-lg text-terracotta/80">
                        A journey of cultural preservation and community empowerment
                    </p>
                </div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-gold">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center text-3xl">
                                            {processImages[index]}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm font-bold text-gold-dark bg-gold/20 px-3 py-1 rounded-full">
                                                Step {step.step}
                                            </span>
                                            <h3 className="text-2xl font-bold text-terracotta-dark">{step.title}</h3>
                                        </div>
                                        <p className="text-terracotta/70 text-lg">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gold/30"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-cream rounded-2xl p-8 text-center border-2 border-gold/20">
                    <h2 className="text-2xl font-bold text-terracotta-dark mb-4 font-serif">
                        Ready to Begin?
                    </h2>
                    <p className="text-terracotta/80 mb-6">
                        Connect with us to learn more about our work and how you can contribute.
                    </p>
                    <button className="bg-terracotta text-white px-8 py-3 rounded-lg hover:bg-terracotta-dark transition-colors duration-200 font-semibold">
                        Contact Us Today
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}