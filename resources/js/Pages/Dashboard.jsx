// resources/js/Pages/Dashboard.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatsCard from '@/Components/Dashboard/StatsCard';
import DocumentTable from '@/Components/Dashboard/DocumentTable';
import { 
    ClockIcon, 
    CheckCircleIcon, 
    ArchiveBoxIcon,
    ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard({ 
    user, 
    stats, 
    activities, 
    overdueDocuments, 
    unreadCount, 
    recentNotifications 
}) {
    const statsData = [
        {
            title: 'Pending for Release',
            value: stats.pending,
            icon: ClockIcon,
            color: 'amber',
            href: '/documents?status=pending'
        },
        {
            title: 'Released Today',
            value: stats.released,
            icon: CheckCircleIcon,
            color: 'green',
            href: '/documents?status=released'
        },
        {
            title: 'Archived',
            value: stats.archived,
            icon: ArchiveBoxIcon,
            color: 'gray',
            href: '/documents?status=archived'
        },
    ];

    const overdueData = [
        {
            title: 'Overdue',
            value: stats.overdue,
            icon: ExclamationTriangleIcon,
            color: 'red',
            href: '/documents?status=overdue'
        },
    ];

    return (
        <AuthenticatedLayout
            user={user}
            stats={stats}
            activities={activities}
            overdueDocuments={overdueDocuments}
            unreadCount={unreadCount}
            recentNotifications={recentNotifications}
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
                {overdueData.map((stat, index) => (
                    <StatsCard key={`overdue-${index}`} {...stat} />
                ))}
            </div>

            {/* Latest Activity Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Activity Status</h2>
                <DocumentTable
                    documents={activities.data}
                    columns={['tracking_number', 'title', 'last_transaction']}
                    pagination={activities}
                    type="activity"
                />
            </div>

            {/* Overdue Documents Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-red-600 mb-4">Overdue Documents</h2>
                <DocumentTable
                    documents={overdueDocuments.data}
                    columns={['tracking_number', 'title', 'last_transaction']}
                    pagination={overdueDocuments}
                    type="overdue"
                />
            </div>
        </AuthenticatedLayout>
    );
}