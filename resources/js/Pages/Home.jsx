import React, { useState, useEffect } from 'react';
import GuestLayout from '../Layouts/GuestLayout';
import { motion } from 'framer-motion';
import IndigenousPatterns from '../Components/UI/IndigenousPatterns';

const Home = ({ heroContent }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <GuestLayout>
            {/* Hero Section with Indigenous Design */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 indigenous-pattern-bg opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigenous-cream" />
                
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mb-8 flex justify-center">
                            <div className="w-24 h-24 rounded-full border-4 border-indigenous-gold bg-indigenous-terracotta 
                                          flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-indigenous-dark mb-6">
                            {heroContent.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-indigenous-earth mb-8 font-body">
                            {heroContent.subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/about" className="bg-indigenous-terracotta text-white px-8 py-3 rounded-lg 
                                                      hover:bg-indigenous-terracotta/90 transition-colors duration-300
                                                      font-body">
                                Learn More
                            </a>
                            <a href="/contact" className="border-2 border-indigenous-terracotta text-indigenous-terracotta 
                                                      px-8 py-3 rounded-lg hover:bg-indigenous-terracotta/10 
                                                      transition-colors duration-300 font-body">
                                Get Involved
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Cultural Showcase */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-3xl md:text-4xl text-center text-indigenous-dark mb-12">
                        Our Cultural Heritage
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '🎭', title: 'Indigenous Arts', desc: 'Traditional crafts and artistry' },
                            { icon: '🎵', title: 'Music & Dance', desc: 'Rhythms of our ancestors' },
                            { icon: '📜', title: 'Oral Traditions', desc: 'Stories passed through generations' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300
                                          border-t-4 border-indigenous-gold"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-display text-xl text-indigenous-dark mb-2">{item.title}</h3>
                                <p className="text-indigenous-earth font-body">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
};

export default Home;