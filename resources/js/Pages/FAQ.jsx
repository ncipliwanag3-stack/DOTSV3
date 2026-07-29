import React, { useState } from 'react';
import GuestLayout from '../Components/Layouts/GuestLayout';

export default function FAQ({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <GuestLayout title="FAQ">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-terracotta-dark mb-4 font-serif">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-terracotta/80">
                        Find answers to common questions about indigenous peoples and our work
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-cream/50 transition-colors duration-200"
                            >
                                <span className="text-lg font-semibold text-terracotta-dark">{faq.question}</span>
                                <span className="text-2xl text-gold transition-transform duration-200">
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4">
                                    <p className="text-terracotta/80 border-t border-gold/20 pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-gold/10 rounded-2xl p-8 text-center border border-gold/30">
                    <h3 className="text-xl font-bold text-terracotta-dark mb-2 font-serif">
                        Still Have Questions?
                    </h3>
                    <p className="text-terracotta/80 mb-4">
                        We're here to help. Reach out to us for more information.
                    </p>
                    <button className="bg-terracotta text-white px-6 py-2 rounded-lg hover:bg-terracotta-dark transition-colors duration-200 font-semibold">
                        Contact Us
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}