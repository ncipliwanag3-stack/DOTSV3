// resources/js/Components/Dashboard/DocumentTable.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

//import OverdueDocumentsTable from './Dashboard/OverdueDocumentsTable';

export default function DocumentTable({ documents, columns, pagination, type }) {
    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-100 text-yellow-800',
            Processing: 'bg-yellow-100 text-yellow-800',
            Released: 'bg-green-100 text-green-800',
            Archived: 'bg-gray-100 text-gray-800',
            Overdue: 'bg-red-100 text-red-800',
            Terminal: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getColumnLabel = (column) => {
        const labels = {
            tracking_number: 'Tracking No.',
            title: 'Title',
            last_transaction: 'Last Transaction',
            status: 'Status',
            received_date: 'Received Date',
            due_date: 'Due Date',
            receiver: 'Received By',
            releaser: 'Released By',
        };
        return labels[column] || column;
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {columns.map((column) => (
                                <th key={column} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {getColumnLabel(column)}
                                </th>
                            ))}
                           
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {documents.length > 0 ? (
                            documents.map((doc) => (
                                <tr key={doc.id} className={`hover:bg-gray-50 transition-colors ${type === 'overdue' ? 'bg-red-50/50' : ''}`}>
                                    {columns.includes('tracking_number') && (
                                        <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                            {doc.tracking_number}
                                        </td>
                                    )}
                                    {columns.includes('title') && (
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {doc.title}
                                        </td>
                                    )}
                                    {columns.includes('last_transaction') && (
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {doc.last_transaction || 'N/A'}
                                        </td>
                                    )}
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                                            {doc.status || 'N/A'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                                    No documents found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                        Showing {pagination.from} to {pagination.to} of {pagination.total} entries
                    </div>
                    <div className="flex items-center space-x-2">
                        
                        <span className="px-3 py-1 text-sm text-gray-700">
                            Page {pagination.current_page} of {pagination.last_page}
                        </span>

                        
                    </div>
                </div>
            )}
        </div>
    );
}