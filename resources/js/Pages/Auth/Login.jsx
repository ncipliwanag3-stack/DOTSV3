import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';
import { motion } from 'framer-motion';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <GuestLayout title="Welcome Back">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-indigenous-gold"
                >
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto bg-indigenous-terracotta/10 rounded-full 
                                      flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-indigenous-terracotta" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <h2 className="font-display text-2xl text-indigenous-dark">Login to Your Account</h2>
                        <p className="text-indigenous-earth font-body">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-indigenous-dark font-body mb-2">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                autoComplete="username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                         focus:ring-indigenous-gold focus:border-transparent transition"
                                placeholder="you@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-indigenous-dark font-body mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                             focus:ring-indigenous-gold focus:border-transparent transition"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-indigenous-gold focus:ring-indigenous-gold"
                                />
                                <span className="ml-2 text-sm text-indigenous-earth font-body">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-indigenous-terracotta hover:underline font-body">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigenous-terracotta text-white py-3 rounded-lg 
                                     hover:bg-indigenous-terracotta/90 transition-colors duration-300 
                                     font-body font-semibold disabled:opacity-50"
                        >
                            {processing ? 'Logging in...' : 'Sign In'}
                        </button>

                        <p className="text-center text-indigenous-earth font-body">
                            Don't have an account?{' '}
                            <a href="/register" className="text-indigenous-terracotta hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </GuestLayout>
    );
};

export default Login;