import React from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = '/dashboard';
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-gold/10 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border-2 border-gold/20">
                <div>
                    <div className="text-center">
                        <span className="text-4xl block mb-2">🌿</span>
                        <h2 className="text-3xl font-bold text-terracotta-dark font-serif">
                            Join Our Community
                        </h2>
                        <p className="mt-2 text-sm text-terracotta/70">
                            Create an account to connect with indigenous communities
                        </p>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-terracotta-dark font-medium mb-2">
                                Full Name
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
                                autoComplete="email"
                                className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-terracotta-dark font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="new-password"
                                className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-terracotta-dark font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                autoComplete="new-password"
                                className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gold text-terracotta-dark px-6 py-3 rounded-lg hover:bg-gold-light transition-colors duration-200 font-semibold disabled:opacity-50"
                        >
                            {processing ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-terracotta/70">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-gold-dark hover:text-gold transition-colors duration-200 font-semibold"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gold/20 text-center">
                    <p className="text-xs text-terracotta/50">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}