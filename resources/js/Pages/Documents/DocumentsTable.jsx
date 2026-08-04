// resources/js/Pages/Documents/DocumentsTable.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { 
    Eye, 
    Printer, 
    Send, 
    Archive as ArchiveIcon, 
    Trash2,
    ChevronUp,
    ChevronDown,
    Settings
} from 'lucide-react';
//import { TribalBorder } from '../../Components/ManoboDesign/TribalElements';

export default function DocumentsTable({ documents, permissions }) {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState({
        tracking_no: true,
        title: true,
        category: true,
        priority: true,
        status: true,
        created_at: true,
        actions: true,
    });
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const handleSort = (field) => {
        if (sortField === field) {
            if (sortDirection === 'asc') setSortDirection('desc');
            else if (sortDirection === 'desc') setSortDirection(null);
            else setSortDirection('asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? 
            <ChevronUp className="w-4 h-4" /> : 
            <ChevronDown className="w-4 h-4" />;
    };

    const handleAction = (action, document) => {
        const confirmMessage = {
            release: 'Are you sure you want to release this document?',
            archive: 'Are you sure you want to archive this document?',
            delete: 'Are you sure you want to delete this document?',
        };

        if (confirm(confirmMessage[action])) {
            const routes = {
                release: `/documents/${document.id}/release`,
                archive: `/documents/${document.id}/archive`,
                delete: `/documents/${document.id}`,
            };

            const method = action === 'delete' ? 'delete' : 'post';
            router[method](routes[action]);
        }
    };

    /*return (
       <TribalBorder className="bg-white p-6 rounded-xl shadow-lg">*/
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <h3 className="text-sm font-semibold text-amber-900">All Documents</h3>
                    <span className="text-sm text-amber-600">{documents.total} entries</span>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowColumnMenu(!showColumnMenu)}
                        className="flex items-center px-3 py-2 text-sm border border-amber-300 rounded-lg hover:bg-amber-50 transition"
                    >
                        <Settings className="w-4 h-4 mr-2 text-amber-600" />
                        Columns
                    </button>
                    
                    {showColumnMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-amber-200/50 z-10">
                            <div className="p-2">
                                {Object.keys(visibleColumns).map((key) => (
                                    <label key={key} className="flex items-center px-2 py-1 hover:bg-amber-50 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns[key]}
                                            onChange={() => setVisibleColumns({
                                                ...visibleColumns,
                                                [key]: !visibleColumns[key]
                                            })}
                                            className="mr-2 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span className="text-sm text-amber-700 capitalize">
                                            {key.replace('_', ' ')}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-b border-amber-200/50">
                            {visibleColumns.tracking_no && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('tracking_no')}
                                >
                                    <div className="flex items-center">
                                        Tracking No.
                                        {getSortIcon('tracking_no')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.title && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('title')}
                                >
                                    <div className="flex items-center">
                                        Title
                                        {getSortIcon('title')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.category && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('category')}
                                >
                                    <div className="flex items-center">
                                        Category
                                        {getSortIcon('category')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.priority && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('priority')}
                                >
                                    <div className="flex items-center">
                                        Priority
                                        {getSortIcon('priority')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.status && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center">
                                        Status
                                        {getSortIcon('status')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.created_at && (
                                <th 
                                    className="px-4 py-3 text-left text-amber-700 font-semibold cursor-pointer hover:bg-amber-200/30 transition"
                                    onClick={() => handleSort('created_at')}
                                >
                                    <div className="flex items-center">
                                        Date Created
                                        {getSortIcon('created_at')}
                                    </div>
                                </th>
                            )}
                            {visibleColumns.actions && (
                                <th className="px-4 py-3 text-left text-amber-700 font-semibold">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {documents.data && documents.data.map((doc, index) => (
                            <tr 
                                key={doc.id}
                                className={`
                                    border-b border-amber-100/50 transition
                                    ${index % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}
                                    hover:bg-amber-100/30
                                    ${doc.priority === 'urgent' ? 'border-l-4 border-l-red-500' : ''}
                                `}
                            >
                                {visibleColumns.tracking_no && (
                                    <td className={`px-4 py-3 font-mono text-xs ${doc.priority === 'urgent' ? 'text-red-600 font-bold' : 'text-amber-800'}`}>
                                        {doc.priority === 'urgent' && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>}
                                        {doc.tracking_no}
                                    </td>
                                )}
                                {visibleColumns.title && (
                                    <td className="px-4 py-3 text-amber-800">{doc.title}</td>
                                )}
                                {visibleColumns.category && (
                                    <td className="px-4 py-3">
                                        <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">
                                            {doc.category}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.priority && (
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                            doc.priority === 'urgent' 
                                                ? 'bg-red-100 text-red-700' 
                                                : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {doc.priority}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.status && (
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                            doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            doc.status === 'released' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                )}
                                {visibleColumns.created_at && (
                                    <td className="px-4 py-3 text-amber-600">
                                        {new Date(doc.created_at).toLocaleDateString()}
                                    </td>
                                )}
                                {visibleColumns.actions && (
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                onClick={() => router.get(`/documents/${doc.id}`)}
                                                className="p-1 hover:bg-amber-100 rounded transition"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4 text-amber-600" />
                                            </button>
                                            <button 
                                                className="p-1 hover:bg-amber-100 rounded transition"
                                                title="Print"
                                            >
                                                <Printer className="w-4 h-4 text-amber-600" />
                                            </button>
                                            {doc.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleAction('release', doc)}
                                                        className="p-1 hover:bg-green-100 rounded transition"
                                                        title="Release"
                                                    >
                                                        <Send className="w-4 h-4 text-green-600" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction('archive', doc)}
                                                        className="p-1 hover:bg-blue-100 rounded transition"
                                                        title="Archive"
                                                    >
                                                        <ArchiveIcon className="w-4 h-4 text-blue-600" />
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                onClick={() => handleAction('delete', doc)}
                                                className="p-1 hover:bg-red-100 rounded transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
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
            {documents.links && (
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-amber-600">
                        Showing {documents.from} to {documents.to} of {documents.total}
                    </span>
                    <div className="flex space-x-2">
                        {documents.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                className={`
                                    px-3 py-1 text-sm rounded-lg transition
                                    ${link.active 
                                        ? 'bg-amber-600 text-white' 
                                        : 'border border-amber-300 hover:bg-amber-50'
                                    }
                                    ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        /*</TribalBorder>*/
    /*);*/
}