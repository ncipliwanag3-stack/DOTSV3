import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { XMarkIcon, EnvelopeIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function EmailStatusTracker({ document, onClose }) {
    const [recipientStatuses, setRecipientStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (document && document.id) {
            fetchEmailStatus();
        }
    }, [document]);

    const fetchEmailStatus = async () => {
        try {
            const response = await router.get(`/documents/${document.id}/email-status`);
            setRecipientStatuses(response.data || []);
        } catch (error) {
            console.error('Error fetching email status:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Sent':
                return <EnvelopeIcon className="w-5 h-5 text-blue-500" />;
            case 'Read':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case 'Pending':
            default:
                return <ClockIcon className="w-5 h-5 text-yellow-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Sent':
                return 'text-blue-600';
            case 'Read':
                return 'text-green-600';
            case 'Pending':
            default:
                return 'text-yellow-600';
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Email Status Tracker</h3>
                        <p className="text-sm text-gray-500">{document?.tracking_number} - {document?.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : recipientStatuses.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No recipients found for this document.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recipientStatuses.map((recipient, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            {getStatusIcon(recipient.status)}
                                            <div>
                                                <p className="font-medium text-gray-900">{recipient.name}</p>
                                                <p className="text-sm text-gray-500">{recipient.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`text-sm font-medium ${getStatusColor(recipient.status)}`}>
                                                {recipient.status}
                                            </span>
                                            {recipient.sent_at && (
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Sent: {new Date(recipient.sent_at).toLocaleString()}
                                                </p>
                                            )}
                                            {recipient.read_at && (
                                                <p className="text-xs text-gray-400">
                                                    Read: {new Date(recipient.read_at).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1 text-yellow-500" />
                                Pending
                            </span>
                            <span className="flex items-center">
                                <EnvelopeIcon className="w-4 h-4 mr-1 text-blue-500" />
                                Sent
                            </span>
                            <span className="flex items-center">
                                <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
                                Read
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}