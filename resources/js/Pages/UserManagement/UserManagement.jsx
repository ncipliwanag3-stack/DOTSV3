// resources/js/pages/UserManagement/UserManagement.jsx
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
//import AddUserModal from '@/UserManagement/AddUserModal';
import AddUserModal from "./AddUserModal"
import RolesPermissions from './RolesPermissions';
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function UserManagement({ auth, users, roles }) {
    const [activeTab, setActiveTab] = useState('users');
    const [showAddModal, setShowAddModal] = useState(false);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [visibleColumns, setVisibleColumns] = useState({
        dotsId: true,
        name: true,
        office: true,
        email: true,
        position: true,
        role: true,
        actions: true,
    });

    const toggleColumn = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'users'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'roles'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Roles & Permissions
                    </button>
                </nav>
            </div>

            {activeTab === 'users' ? (
                <>
                    {/* User Management Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        {/* Controls */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="relative flex-1 max-w-xs">
                                        <input
                                            type="text"
                                            placeholder="Search by name or email..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        />
                                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="regional_focal">Regional Focal</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 text-sm">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>Columns</span>
                                    </button>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center space-x-2"
                                    >
                                        <PlusIcon className="w-5 h-5" />
                                        <span>Add User</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* User Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {visibleColumns.dotsId && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOTS ID</th>
                                        )}
                                        {visibleColumns.name && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                        )}
                                        {visibleColumns.office && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office</th>
                                        )}
                                        {visibleColumns.email && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        )}
                                        {visibleColumns.position && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                        )}
                                        {visibleColumns.role && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        )}
                                        {visibleColumns.actions && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.data.map((user, index) => (
                                        <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            {visibleColumns.dotsId && (
                                                <td className="px-4 py-3 text-sm font-mono text-indigo-600">{user.dots_id}</td>
                                            )}
                                            {visibleColumns.name && (
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                                            )}
                                            {visibleColumns.office && (
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.office}</td>
                                            )}
                                            {visibleColumns.email && (
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                                            )}
                                            {visibleColumns.position && (
                                                <td className="px-4 py-3 text-sm text-gray-900">{user.position}</td>
                                            )}
                                            {visibleColumns.role && (
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                        user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                        {user.role.replace('_', ' ')}
                                                    </span>
                                                </td>
                                            )}
                                            {visibleColumns.actions && (
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center space-x-2">
                                                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                                            <PencilIcon className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                                            <TrashIcon className="w-4 h-4" />
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
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing {users.from} to {users.to} of {users.total}
                            </p>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                                {users.links.map((link, index) => (
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

                    {/* Add User Modal */}
                    <AddUserModal 
                        isOpen={showAddModal} 
                        onClose={() => setShowAddModal(false)} 
                        roles={roles}
                    />
                </>
            ) : (
                <RolesPermissions roles={roles} />
            )}
        </AuthenticatedLayout>
    );
}