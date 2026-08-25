// resources/js/Components/UserManagement/UserManagementTab.jsx
import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { 
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import AddUserModal from './AddUserModal';

export default function UserManagementTab({ users, filters }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showColumnVisibility, setShowColumnVisibility] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState({
        dots_id: true,
        name: true,
        office: true,
        email: true,
        position: true,
        role: true,
        actions: true,
    });

    const { data, setData, get } = useForm({
        search: filters?.search || '',
        role: filters?.role || 'all',
    });

    const handleSearch = () => {
        get('/user-management', data);
    };

    const handleDelete = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${userId}`);
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setShowAddModal(true);
    };

    return (
        <div>
            {/* Search and Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={data.role}
                        onChange={(e) => {
                            setData('role', e.target.value);
                            handleSearch();
                        }}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="regional_focal">Regional Focal</option>
                    </select>

                    <button
                        onClick={() => setShowColumnVisibility(!showColumnVisibility)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
                    >
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => {
                            setEditUser(null);
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center gap-2"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Column Visibility Dropdown */}
            {showColumnVisibility && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-10">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Columns</h4>
                    {Object.keys(visibleColumns).map((key) => (
                        <label key={key} className="flex items-center gap-2 py-1 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={visibleColumns[key]}
                                onChange={() => setVisibleColumns({
                                    ...visibleColumns,
                                    [key]: !visibleColumns[key],
                                })}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                    ))}
                </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                            <tr>
                                {visibleColumns.dots_id && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DOTS ID</th>
                                )}
                                {visibleColumns.name && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</th>
                                )}
                                {visibleColumns.office && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Office</th>
                                )}
                                {visibleColumns.email && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                )}
                                {visibleColumns.position && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                                )}
                                {visibleColumns.role && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                )}
                                {visibleColumns.actions && (
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.data.map((user, index) => (
                                <tr 
                                    key={user.id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-indigo-50/50 transition-colors ${
                                        user.urgent ? 'border-l-4 border-red-500' : ''
                                    }`}
                                >
                                    {visibleColumns.dots_id && (
                                        <td className={`px-4 py-3 text-sm font-mono ${user.urgent ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                                            {user.dots_id}
                                            {user.urgent && (
                                                <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            )}
                                        </td>
                                    )}
                                    {visibleColumns.name && (
                                        <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                                    )}
                                    {visibleColumns.office && (
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.office}</td>
                                    )}
                                    {visibleColumns.email && (
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                    )}
                                    {visibleColumns.position && (
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.position}</td>
                                    )}
                                    {visibleColumns.role && (
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                                                'bg-amber-100 text-amber-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    )}
                                    {visibleColumns.actions && (
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
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
                {users.links && (
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {users.from} to {users.to} of {users.total} entries
                        </p>
                        <div className="flex gap-1">
                            {users.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                            ? 'text-gray-700 hover:bg-gray-100'
                                            : 'text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!link.url}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit User Modal */}
            <AddUserModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                user={editUser}
                isEdit={!!editUser}
            />
        </div>
    );
}