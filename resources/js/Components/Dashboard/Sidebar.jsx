import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    HomeIcon, 
    DocumentIcon, 
    ClipboardDocumentListIcon,
    ShieldCheckIcon,
    ArrowRightOnRectangleIcon,
    XMarkIcon,
    Bars3Icon
} from '@heroicons/react/24/outline';

export default function Sidebar({ user, isOpen, setIsOpen }) {
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const { url } = usePage();

   //////////////// user-management.permissions  user-management
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Documents', href: '/documents', icon: DocumentIcon }, 
        { name: 'Other Information System', href: '/other-info', icon: ClipboardDocumentListIcon },
        { name: 'Archives', href: '/archives', icon: HomeIcon },
        { name: 'Audit Trails', href: '/audit-trails', icon: HomeIcon },
        { name: 'User Management', href: '/user-management', icon: HomeIcon },
    ];

    return (
        <>
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
                {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-40
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 transition-transform duration-300 ease-in-out
                w-72 bg-gradient-to-b from-amber-800 to-amber-900 text-white
                flex flex-col h-full
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-amber-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold">D</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-wider">DOTS</h1>
                                <span className="text-xs bg-amber-600 px-2 py-0.5 rounded-full">v2.4.1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Card */}
                <div className="p-4 mx-4 mt-4 bg-amber-700/50 rounded-lg border border-amber-600">
                    <div className="flex items-center space-x-3">
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user?.name || "User avatar"}
                                className="w-12 h-12 rounded-full border-2 border-amber-400"
                            />
                        ) : (
                            <div
                                aria-label={user?.name || "User avatar"}
                                className="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-600 flex items-center justify-center text-lg font-semibold"
                            >
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.name || ''}</p>
                            <p className="text-xs text-amber-200">{user?.role}</p>
                            <span className="inline-block mt-1 text-xs bg-amber-600 px-2 py-0.5 rounded-full">
                                Admin Access
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center px-4 py-3 rounded-lg transition-all duration-200
                                    ${isActive 
                                        ? 'bg-amber-600 text-white shadow-lg' 
                                        : 'text-amber-100 hover:bg-amber-700/50'
                                    }
                                `}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Links */}
                <div className="px-4 py-4 border-t border-amber-700 space-y-2">
                    <button
                        onClick={() => setShowPrivacyModal(true)}
                        className="flex items-center w-full px-4 py-2 text-sm text-amber-100 hover:bg-amber-700/50 rounded-lg transition-colors"
                    >
                        <ShieldCheckIcon className="w-5 h-5 mr-3" />
                        Data Privacy Notice
                    </button>

                    <Link
                        href="/logout"
                        method="post"
                        className="flex items-center w-full px-4 py-2 text-sm text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                        Log Out
                    </Link>
                </div>
            </div>

            {/* Privacy Modal */}
            {showPrivacyModal && (
                <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
            )}
        </>
    );
}

// Privacy Modal Component
function PrivacyModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-amber-900">Data Privacy Notice</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 prose prose-amber max-w-none">
                    <h3>Republic Act No. 10173</h3>
                    <h4>Data Privacy Act of 2012</h4>
                    <p>
                        The National Commission of Indigenous Peoples (NCIP) is committed to protecting 
                        the privacy and confidentiality of personal information collected from our 
                        stakeholders in accordance with Republic Act No. 10173, also known as the 
                        Data Privacy Act of 2012.
                    </p>
                    <h4>Information We Collect</h4>
                    <ul>
                        <li>Personal information (name, contact details, etc.)</li>
                        <li>Document tracking information</li>
                        <li>Transaction history</li>
                    </ul>
                    <h4>How We Use Your Information</h4>
                    <ul>
                        <li>Process and track document requests</li>
                        <li>Provide updates on document status</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                    <h4>Data Security</h4>
                    <p>
                        We implement appropriate security measures to protect your personal information 
                        against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <h4>Your Rights</h4>
                    <p>
                        You have the right to access, correct, and request deletion of your personal 
                        information in accordance with the Data Privacy Act.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        For inquiries, contact our Data Privacy Officer at dpo@ncip.gov.ph
                    </p>
                </div>
            </div>
        </div>
    );
}