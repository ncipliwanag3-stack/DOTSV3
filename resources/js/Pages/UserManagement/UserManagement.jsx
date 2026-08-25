// resources/js/Pages/UserManagement.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserManagementTab from '@/Components/UserManagement/UserManagementTab';
import RolesPermissionsTab from '@/Components/UserManagement/RolesPermissionsTab';

export default function UserManagement({ users, permissions, filters, user }) {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <AuthenticatedLayout user={user}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'users'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            User Management
                        </button>
                        <button
                            onClick={() => setActiveTab('permissions')}
                            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'permissions'
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Roles & Permissions
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div>
                    {activeTab === 'users' ? (
                        <UserManagementTab 
                            users={users} 
                            filters={filters}
                        />
                    ) : (
                        <RolesPermissionsTab 
                            users={users}
                            permissions={permissions}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}