import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

import { Search, QrCode, Bell, LogOut, Check, X } from 'lucide-react';
//import QRScannerModal from '../Modals/QRScannerModal';
//import ConfirmModal from '../Modals/ConfirmModal';

import { 
    BellIcon, 
    QrCodeIcon, 
    ArrowRightOnRectangleIcon,
    CheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function TopBar({ user, unreadCount, recentNotifications }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const { post, processing } = useForm();

    const handleReceive = () => {
        if (!trackingNumber) {
            alert('Please enter a tracking number');
            return;
        }
        setShowConfirmModal(true);
    };

    const confirmReceive = () => {
        post('/documents/receive', {
            data: { tracking_number: trackingNumber },
            onSuccess: () => {
                setShowConfirmModal(false);
                setTrackingNumber('');
            }
        });
    };

    const markAsRead = (notificationId) => {
        post('/notifications/read', {
            data: { id: notificationId }
        });
    };

    const markAllAsRead = () => {
        post('/notifications/read-all');
    };

    return (
        <header className="bg-white shadow-sm px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left: Context */}
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Division:</span> Indigenous Peoples Rights
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Date:</span> {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-4">
                    {/* Tracking Input */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Enter Tracking Number"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm w-48"
                        />
                        <button
                            onClick={() => setShowQRScanner(true)}
                            className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                            title="Scan QR Code"
                        >
                            <QrCodeIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleReceive}
                            disabled={processing}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                            Receive
                        </button>
                    </div>

                    {/* Notification Bell */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative"
                        >
                            <BellIcon className="w-6 h-6" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-amber-600 hover:text-amber-700"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {recentNotifications.length > 0 ? (
                                        recentNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                                                    !notification.is_read ? 'bg-amber-50' : ''
                                                }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(notification.created_at).fromNow()}
                                                        </p>
                                                    </div>
                                                    {!notification.is_read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="ml-2 text-amber-600 hover:text-amber-700"
                                                        >
                                                            <CheckIcon className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            <p>No notifications</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <Link
                        href="/logout"
                        method="post"
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* QR Scanner Modal */}
            {showQRScanner && (
                <QRScannerModal onClose={() => setShowQRScanner(false)} />
            )}

            {/* Confirm Modal */}
            {showConfirmModal && (
                <ConfirmModal
                    onConfirm={confirmReceive}
                    onCancel={() => setShowConfirmModal(false)}
                    trackingNumber={trackingNumber}
                />
            )}
        </header>
    );
}

// QR Scanner Modal
function QRScannerModal({ onClose }) {
    const [isScanning, setIsScanning] = useState(true);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">QR Code Scanner</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 border-4 border-amber-500 rounded-lg animate-pulse">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-sm text-gray-600 bg-white/90 p-2 rounded-lg mx-4">
                            Scanning for QR code...
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

// Confirm Modal
function ConfirmModal({ onConfirm, onCancel, trackingNumber }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
                    <p className="text-gray-600 mb-1">
                        You are about to receive document:
                    </p>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded-lg mb-4">
                        {trackingNumber}
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                            Yes, Receive
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}