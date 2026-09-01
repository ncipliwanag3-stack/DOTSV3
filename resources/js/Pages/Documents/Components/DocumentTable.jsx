import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
    EyeIcon,
    PrinterIcon,
    PaperAirplaneIcon,
    XCircleIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import EmailStatusTracker from './EmailStatusTracker';

export default function DocumentTable({ documents, visibleColumns }) {
    const [sortColumn, setSortColumn] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [showEmailTracker, setShowEmailTracker] = useState(false);

    const handleSort = (column) => {
        if (sortColumn === column) {
            // Cycle: asc -> desc -> none
            if (sortDirection === 'asc') setSortDirection('desc');
            else if (sortDirection === 'desc') {
                setSortDirection(null);
                setSortColumn(null);
                return;
            }
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleAction = (action, document) => {
        if (action === 'view') {
            // View document
            router.get(`/documents/${document.id}`);
        } else if (action === 'print') {
            // Print document
            window.print();
        } else if (action === 'release') {
            if (confirm('Are you sure you want to release this document?')) {
                router.post(`/documents/${document.id}/release`);
            }
        } else if (action === 'terminal') {
            if (confirm('Are you sure you want to terminate this document?')) {
                router.post(`/documents/${document.id}/terminal`);
            }
        } else if (action === 'delete') {
            if (confirm('Are you sure you want to delete this document?')) {
                router.delete(`/documents/${document.id}`);
            }
        } else if (action === 'email-status') {
            setSelectedDocument(document);
            setShowEmailTracker(true);
        }
    };

    const normalizeDocumentStatus = (doc) => {
        const status = String(doc?.status || '').trim();
        const receivedDate = doc?.date_received ? new Date(doc.date_received) : null;

        if (status.toLowerCase() === 'pending' && receivedDate) {
            const overdueThreshold = new Date();
            overdueThreshold.setHours(overdueThreshold.getHours() - 24);
            if (receivedDate < overdueThreshold) {
                return 'Overdue';
            }
        }

        return status || 'Pending';
    };

    const getStatusColor = (status) => {
        const colors = {
            'Draft': 'bg-gray-100 text-gray-800',
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Released': 'bg-green-100 text-green-800',
            'Archived': 'bg-blue-100 text-blue-800',
            'Terminated': 'bg-red-100 text-red-800',
            'Overdue': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getUrgencyColor = (urgency) => {
        const colors = {
            'Low': 'text-blue-600',
            'Medium': 'text-yellow-600',
            'High': 'text-orange-600',
            'Urgent': 'text-red-600',
        };
        return colors[urgency] || 'text-gray-600';
    };

    const isUrgent = (urgency) => urgency === 'Urgent';

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {visibleColumns.tracking && (
                                <th
                                    onClick={() => handleSort('tracking_number')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Tracking #
                                    {sortColumn === 'tracking_number' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.title && (
                                <th
                                    onClick={() => handleSort('title')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Title
                                    {sortColumn === 'title' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.type && (
                                <th
                                    onClick={() => handleSort('type')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Type
                                    {sortColumn === 'type' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.originType && (
                                <th
                                    onClick={() => handleSort('origin_type')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Origin Type
                                    {sortColumn === 'origin_type' && (
                                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.lastTransaction && (
                                <th
                                    onClick={() => handleSort('last_transaction')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Last Transaction
                                    {sortColumn === 'last_transaction' && (
                                        <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.fullname && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>}
                            {visibleColumns.divisionCode && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division Code</th>}
                             {visibleColumns.division && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>}

                            {visibleColumns.dateReceived && (
                                <th
                                    onClick={() => handleSort('date_received')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Date Received
                                    {sortColumn === 'date_received' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.status && (
                                <th
                                    onClick={() => handleSort('status')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Status
                                    {sortColumn === 'status' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.urgency && (
                                <th
                                    onClick={() => handleSort('urgency')}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    Urgency
                                    {sortColumn === 'urgency' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            )}
                            {visibleColumns.actions && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.data.map((doc, index) => {
                            const displayStatus = normalizeDocumentStatus(doc);

                            return (
                            <tr
                                key={doc.id}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                            >
                                {visibleColumns.tracking && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                        {doc.tracking_number}
                                    </td>
                                )}
                                {visibleColumns.title && (
                                    <td className={`px-6 py-4 text-sm ${isUrgent(doc.urgency) ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                        {isUrgent(doc.urgency) && (
                                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                        )}
                                        {doc.title}
                                    </td>
                                )}
                                {visibleColumns.type && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {doc.type}
                                    </td>
                                )}
                                {visibleColumns.originType && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {doc.origin_type || 'N/A'}
                                    </td>
                                )}
                                {visibleColumns.lastTransaction && (
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {doc.last_transaction || 'N/A'}
                                    </td>
                                )}
                                {visibleColumns.fullname && <td className="px-6 py-4 text-sm text-gray-500">{doc.fullname || 'N/A'}</td>}
                                {visibleColumns.divisionCode && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.division_code || 'N/A'}</td>}
                                {visibleColumns.division && <td className="px-6 py-4 text-sm text-gray-500">{doc.division || 'N/A'}</td>}
                                {visibleColumns.dateReceived && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(doc.date_received).toLocaleDateString()}
                                    </td>
                                )}
                                {visibleColumns.status && (
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(displayStatus)}`}>
                                            {displayStatus}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.urgency && (
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getUrgencyColor(doc.urgency)}`}>
                                        {doc.urgency}
                                    </td>
                                )}
                                {visibleColumns.actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleAction('view', doc)}
                                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                                title="View"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction('print', doc)}
                                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
                                                title="Print"
                                            >
                                                <PrinterIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction('release', doc)}
                                                className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                                title="Release"
                                            >
                                                <PaperAirplaneIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction('terminal', doc)}
                                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                                title="Terminal"
                                            >
                                                <XCircleIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction('delete', doc)}
                                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                title="Delete"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAction('email-status', doc)}
                                                className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                                                title="Email Status"
                                            >
                                                <PaperAirplaneIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Showing {documents.from} to {documents.to} of {documents.total} results
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.get(documents.prev_page_url)}
                        disabled={!documents.prev_page_url}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {documents.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => router.get(link.url)}
                            className={`px-3 py-1 border rounded-md text-sm ${
                                link.active
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'border-gray-300 hover:bg-gray-50'
                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                    <button
                        onClick={() => router.get(documents.next_page_url)}
                        disabled={!documents.next_page_url}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Email Status Tracker Modal */}
            {showEmailTracker && selectedDocument && (
                <EmailStatusTracker
                    document={selectedDocument}
                    onClose={() => {
                        setShowEmailTracker(false);
                        setSelectedDocument(null);
                    }}
                />
            )}
        </div>
    );
}