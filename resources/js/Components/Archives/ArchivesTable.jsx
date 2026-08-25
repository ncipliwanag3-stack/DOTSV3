import React, { useState } from 'react';
import { 
    Eye, 
    Printer, 
    //Checkbox, 
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function ArchivesTable({ archives }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState({
        select: true,
        tracking: true,
        title: true,
        type: true,
        category: true,
        date: true,
        status: true,
        actions: true,
    });

    const columns = [
        { id: 'select', label: '', sortable: false },
        { id: 'tracking', label: 'Tracking No.', sortable: true },
        { id: 'title', label: 'Title', sortable: true },
        { id: 'type', label: 'Type', sortable: true },
        { id: 'category', label: 'Category', sortable: true },
        { id: 'date', label: 'Date Archived', sortable: true },
        { id: 'status', label: 'Status', sortable: true },
        { id: 'actions', label: 'Actions', sortable: false },
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(archives.data.map(item => item.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev => 
            prev.includes(id) 
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Controls */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Printer className="h-4 w-4 inline mr-1" />
                        Print
                    </button>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Columns</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map((column) => (
                                visibleColumns[column.id] !== false && (
                                    <th
                                        key={column.id}
                                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.id === 'select' && (
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.length === archives.data.length}
                                                onChange={handleSelectAll}
                                                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                            />
                                        )}
                                        {column.label}
                                    </th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {archives.data.map((archive, index) => (
                            <tr
                                key={archive.id}
                                className={`hover:bg-gray-50 transition-colors ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                } ${selectedRows.includes(archive.id) ? 'bg-amber-50' : ''}`}
                            >
                                {visibleColumns.select && (
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(archive.id)}
                                            onChange={() => handleSelectRow(archive.id)}
                                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                        />
                                    </td>
                                )}
                                {visibleColumns.tracking && (
                                    <td className="px-4 py-3 font-mono text-sm text-gray-600">
                                        {archive.tracking_number}
                                    </td>
                                )}
                                {visibleColumns.title && (
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {archive.title}
                                            </p>
                                            {archive.is_urgent && (
                                                <span className="inline-flex items-center text-xs text-red-600">
                                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></span>
                                                    Urgent
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                )}
                                {visibleColumns.type && (
                                    <td className="px-4 py-3">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                            {archive.type}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.category && (
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {archive.category}
                                    </td>
                                )}
                                {visibleColumns.date && (
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {new Date(archive.date_archived).toLocaleDateString()}
                                    </td>
                                )}
                                {visibleColumns.status && (
                                    <td className="px-4 py-3">
                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                            Archived
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.actions && (
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-1 hover:bg-blue-50 rounded transition-colors"
                                                title="View Document"
                                            >
                                                <Eye className="h-4 w-4 text-blue-600" />
                                            </button>
                                            <button
                                                className="p-1 hover:bg-gray-50 rounded transition-colors"
                                                title="Print Disposition Form"
                                            >
                                                <Printer className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing {archives.from} to {archives.to} of {archives.total} entries
                </p>
                <div className="flex items-center space-x-2">
                    <button
                        disabled={!archives.prev_page_url}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    {archives.links.map((link, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                link.active
                                    ? 'bg-amber-600 text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                    <button
                        disabled={!archives.next_page_url}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}