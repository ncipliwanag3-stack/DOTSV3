import React, { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import ArchivesTable from '@/Components/Archives/ArchivesTable';

export default function ArchivesIndex({ archives, years }) {
    const [selectedYear, setSelectedYear] = useState('All Archives');
    const [showColumns, setShowColumns] = useState({
        tracking_no: true,
        title: true,
        category: true,
        priority: true,
        archived_date: true,
        archived_by: true,
        department: true,
    });

    return (
        <AuthenticatedLayout title="Archives">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-green-900">Archives</h1>
                
                {/* Year Tabs */}
                <div className="mt-4 flex items-center space-x-2 border-b border-gray-200">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                                selectedYear === year 
                                    ? 'border-green-600 text-green-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <ArchivesTable 
                archives={archives} 
                selectedYear={selectedYear}
                showColumns={showColumns}
                setShowColumns={setShowColumns}
            />
        </AuthenticatedLayout>
    );
}