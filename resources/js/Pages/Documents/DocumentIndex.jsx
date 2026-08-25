import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DocumentTable from './Components/DocumentTable';
import AddDocumentModal from './Components/AddDocumentModal';
import ColumnVisibilityPanel from './Components/ColumnVisibilityPanel';
//import EmailStatusTracker from './Components/EmailStatusTracker';
import { PlusIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';

export default function DocumentIndex() {
    const { documents } = usePage().props;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showColumnPanel, setShowColumnPanel] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        tracking: true,
        title: true,
        type: true,
        dateReceived: true,
        status: true,
        urgency: true,
        actions: true,
    });

    return (
        <AuthenticatedLayout>
            <div className="bg-white rounded-lg shadow">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                        <p className="text-sm text-gray-500">Manage and track all documents</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowColumnPanel(!showColumnPanel)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <AdjustmentsVerticalIcon className="w-4 h-4 mr-2" />
                            Columns
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Document
                        </button>
                    </div>
                </div>

                {/* Column Visibility Panel */}
                {showColumnPanel && (
                    <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
                        <ColumnVisibilityPanel
                            visibleColumns={visibleColumns}
                            setVisibleColumns={setVisibleColumns}
                        />
                    </div>
                )}

                {/* Document Table */}
                <div className="p-6">
                    <DocumentTable
                        documents={documents}
                        visibleColumns={visibleColumns}
                    />
                </div>
            </div>

            {/* Add Document Modal */}
            <AddDocumentModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
        </AuthenticatedLayout>
    );
}