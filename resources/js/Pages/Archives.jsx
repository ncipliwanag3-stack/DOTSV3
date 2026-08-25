import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ArchivesTable from '@/Components/Archives/ArchivesTable';
import YearTabs from '@/Components/Archives/YearTabs';

export default function Archives({ archives, years, currentYear }) {
    const [selectedYear, setSelectedYear] = useState(currentYear);

    return (
        <AuthenticatedLayout header="Archives">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Archives</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Access and manage archived documents
                        </p>
                    </div>
                </div>

                <YearTabs
                    years={years}
                    selectedYear={selectedYear}
                    onSelectYear={setSelectedYear}
                />

                <ArchivesTable archives={archives} />
            </div>
        </AuthenticatedLayout>
    );
}