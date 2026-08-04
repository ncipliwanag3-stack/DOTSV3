// resources/js/Pages/Documents/Index.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DocumentsTable from './DocumentsTable';
import AddDocumentForm from './AddDocumentForm';
import { Plus, Search, Filter } from 'lucide-react';

export default function DocumentIndex({ documents, permissions }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    return (
        <AuthenticatedLayout title="Documents" permissions={permissions}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-amber-900">Document Management</h1>
                        <p className="text-amber-600 text-sm">Manage and track all documents</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:from-amber-800 hover:to-amber-900 transition shadow-lg shadow-amber-700/20"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Document
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg border border-amber-200/50">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-amber-400" />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="released">Released</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button className="flex items-center px-4 py-2 border border-amber-300 rounded-lg hover:bg-amber-50 transition">
                        <Filter className="w-5 h-5 mr-2 text-amber-600" />
                        More Filters
                    </button>
                </div>

                {/* Documents Table */}
                <DocumentsTable 
                    documents={documents} 
                    permissions={permissions}
                />

                {/* Add Document Form Modal */}
                {showAddForm && (
                    <AddDocumentForm 
                        onClose={() => setShowAddForm(false)}
                        onSuccess={() => {
                            setShowAddForm(false);
                            // Refresh data
                        }}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}