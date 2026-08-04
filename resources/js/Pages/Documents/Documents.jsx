import React, { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layout/AuthenticatedLayout';
import DocumentsTable from '@/Components/Documents/DocumentsTable';
import AddDocumentForm from '@/Components/Documents/AddDocumentForm';
import { Plus, Filter, Search } from 'lucide-react';

export default function Documents({ user, documents, filters }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');

    return (
        <AuthenticatedLayout user={user}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-amber-900">
                            Document Management
                        </h1>
                        <p className="text-amber-700/70">
                            Manage and track all documents in the system
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white 
                            rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        <Plus size={18} />
                        Add Document
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title or tracking number..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                                focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg 
                            focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="pending_release">Pending Release</option>
                        <option value="released">Released</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 
                        rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter size={18} />
                        More Filters
                    </button>
                </div>

                {/* Table */}
                <DocumentsTable documents={documents} />

                {/* Add Document Form Modal */}
                {showAddForm && (
                    <AddDocumentForm 
                        onClose={() => setShowAddForm(false)}
                        onSuccess={() => {
                            setShowAddForm(false);
                            // Refresh data
                            window.location.reload();
                        }}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}