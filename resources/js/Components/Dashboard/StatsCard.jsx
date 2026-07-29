// resources/js/Components/Dashboard/StatsCard.jsx
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function StatsCard({ title, value, icon: Icon, color, href }) {
    const colorClasses = {
        amber: 'bg-amber-100 text-amber-600',
        green: 'bg-green-100 text-green-600',
        gray: 'bg-gray-100 text-gray-600',
        red: 'bg-red-100 text-red-600',
    };

    const hoverClasses = {
        amber: 'hover:bg-amber-50',
        green: 'hover:bg-green-50',
        gray: 'hover:bg-gray-50',
        red: 'hover:bg-red-50',
    };

    return (
        <Link href={href} className="block">
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md ${hoverClasses[color]}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">{title}</p>
                            <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
                        </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </Link>
    );
}