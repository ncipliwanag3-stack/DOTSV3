import React from 'react';
import GuestLayout from '../Components/Layouts/GuestLayout';

export default function About({ title, content }) {
    const values = [
        { icon: '🤝', title: 'Community First', description: 'Working directly with indigenous communities' },
        { icon: '📖', title: 'Preservation', description: 'Documenting and preserving cultural heritage' },
        { icon: '🌿', title: 'Sustainability', description: 'Supporting sustainable traditional practices' },
        { icon: '🌟', title: 'Education', description: 'Raising awareness and sharing knowledge' },
    ];

    return (
        <GuestLayout title="About">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-gold">
                    <h1 className="text-4xl font-bold text-terracotta-dark mb-6 font-serif">About Us</h1>
                    <p className="text-lg text-terracotta/80 leading-relaxed mb-6">{content}</p>
                    <div className="bg-cream/50 p-6 rounded-xl border border-gold/20">
                        <h2 className="text-2xl font-bold text-terracotta-dark mb-4 font-serif">Our Mission</h2>
                        <p className="text-terracotta/80 leading-relaxed">
                            To empower indigenous communities across Asia through cultural preservation,
                            education, and advocacy, ensuring their voices are heard and their traditions
                            are celebrated for generations to come.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <div className="text-4xl mb-4">{value.icon}</div>
                            <h3 className="text-xl font-bold text-terracotta-dark mb-2">{value.title}</h3>
                            <p className="text-terracotta/70">{value.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-terracotta-light/20 rounded-2xl p-8 text-center border-2 border-gold/30">
                    <h2 className="text-2xl font-bold text-terracotta-dark mb-4 font-serif">
                        Join Our Journey
                    </h2>
                    <p className="text-terracotta/80 mb-4">
                        Be part of preserving and celebrating the rich cultural heritage of Asia's indigenous peoples.
                    </p>
                    <button className="bg-gold text-terracotta-dark px-8 py-3 rounded-lg hover:bg-gold-light transition-colors duration-200 font-semibold">
                        Get Involved
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}