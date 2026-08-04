// resources/js/pages/AuditTrails/AuditTrailList.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    PrinterIcon, 
    EyeIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function AuditTrailList({ auth, auditTrails }) {
    const [visibleColumns, setVisibleColumns] = useState({
        module: true,
        event: true,
        logDate: true,
        user: true,
    });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const toggleColumn = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    const handleSort = (key) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                if (prev.direction === 'asc') return { key, direction: 'desc' };
                if (prev.direction === 'desc') return { key: null, direction: 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ChevronUpDownIcon className="w-4 h-4" />;
        return sortConfig.direction === 'asc' ? 
            <ChevronUpIcon className="w-4 h-4" /> : 
            <ChevronDownIcon className="w-4 h-4" />;
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Header with controls */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-gray-900">Audit Trails</h2>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {auditTrails.total} entries
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 text-sm">
                                <PrinterIcon className="w-4 h-4" />
                                <span>Print</span>
                            </button>
                            <div className="relative group">
                                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 text-sm">
                                    <EyeIcon className="w-4 h-4" />
                                    <span>Columns</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                                    <div className="p-2">
                                        {Object.keys(visibleColumns).map(column => (
                                            <label key={column} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-50 rounded cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={visibleColumns[column]}
                                                    onChange={() => toggleColumn(column)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="text-sm capitalize">{column}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">10 per page</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {visibleColumns.module && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            onClick={() => handleSort('module')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>Module</span>
                                            {getSortIcon('module')}
                                        </button>
                                    </th>
                                )}
                                {visibleColumns.event && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            onClick={() => handleSort('event')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>Event</span>
                                            {getSortIcon('event')}
                                        </button>
                                    </th>
                                )}
                                {visibleColumns.logDate && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            onClick={() => handleSort('log_date')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>Log Date</span>
                                            {getSortIcon('log_date')}
                                        </button>
                                    </th>
                                )}
                                {visibleColumns.user && (
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            onClick={() => handleSort('user')}
                                            className="flex items-center space-x-1 hover:text-gray-700"
                                        >
                                            <span>User</span>
                                            {getSortIcon('user')}
                                        </button>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {auditTrails.data.map((trail, index) => (
                                <tr key={trail.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    {visibleColumns.module && (
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                {trail.module}
                                            </span>
                                        </td>
                                    )}
                                    {visibleColumns.event && (
                                        <td className="px-4 py-3 text-sm text-gray-900">{trail.event}</td>
                                    )}
                                    {visibleColumns.logDate && (
                                        <td className="px-4 py-3 text-sm font-mono text-gray-600">
                                            {new Date(trail.log_date).toLocaleString()}
                                        </td>
                                    )}
                                    {visibleColumns.user && (
                                        <td className="px-4 py-3 text-sm text-gray-900">{trail.user}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing {auditTrails.from} to {auditTrails.to} of {auditTrails.total}
                    </p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                        {auditTrails.links.map((link, index) => (
                            <button 
                                key={index}
                                className={`px-3 py-1 border rounded text-sm ${
                                    link.active 
                                        ? 'bg-indigo-600 text-white border-indigo-600' 
                                        : 'border-gray-300 hover:bg-gray-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}