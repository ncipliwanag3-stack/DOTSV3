import React, { useState } from 'react';
import GuestLayout from '../Components/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function Contact({ address, email, phone }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                alert('Message sent successfully!');
            }
        });
    };

    return (
        <GuestLayout title="Contact">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-terracotta-dark mb-4 font-serif">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-terracotta/80">
                        We'd love to hear from you and connect with indigenous communities
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-terracotta-dark mb-6 font-serif">
                                Contact Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <h4 className="font-semibold text-terracotta-dark">Address</h4>
                                        <p className="text-terracotta/70">{address}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <h4 className="font-semibold text-terracotta-dark">Email</h4>
                                        <a href={`mailto:${email}`} className="text-terracotta/70 hover:text-terracotta transition-colors duration-200">
                                            {email}
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <h4 className="font-semibold text-terracotta-dark">Phone</h4>
                                        <p className="text-terracotta/70">{phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gold/20">
                                <h3 className="font-semibold text-terracotta-dark mb-3">Follow Us</h3>
                                <div className="flex space-x-4 text-2xl">
                                    <a href="#" className="text-terracotta/60 hover:text-terracotta transition-colors duration-200">🌐</a>
                                    <a href="#" className="text-terracotta/60 hover:text-terracotta transition-colors duration-200">📱</a>
                                    <a href="#" className="text-terracotta/60 hover:text-terracotta transition-colors duration-200">📺</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-terracotta-dark mb-6 font-serif">
                            Send a Message
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-terracotta-dark font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-terracotta-dark font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-terracotta-dark font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    required
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gold text-terracotta-dark px-6 py-3 rounded-lg hover:bg-gold-light transition-colors duration-200 font-semibold disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}