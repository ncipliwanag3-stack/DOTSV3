// resources/js/pages/UserManagement/RolesPermissions.jsx
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function RolesPermissions({ roles }) {
    const [permissions, setPermissions] = useState({
        admin: {
            userManagement: { create: true, read: true, update: true, delete: true },
            documents: { create: true, read: true, update: true, delete: true },
            auditTrails: { create: false, read: true, update: false, delete: false },
            archives: { create: false, read: true, update: false, delete: true },
        },
        staff: {
            userManagement: { create: false, read: true, update: false, delete: false },
            documents: { create: true, read: true, update: true, delete: false },
            auditTrails: { create: false, read: true, update: false, delete: false },
            archives: { create: false, read: true, update: false, delete: false },
        },
        regionalFocal: {
            userManagement: { create: false, read: true, update: false, delete: false },
            documents: { create: false, read: true, update: false, delete: false },
            auditTrails: { create: false, read: true, update: false, delete: false },
            archives: { create: false, read: true, update: false, delete: false },
        },
    });

    const modules = [
        { key: 'userManagement', label: 'User Management' },
        { key: 'documents', label: 'Documents' },
        { key: 'auditTrails', label: 'Audit Trails' },
        { key: 'archives', label: 'Archives' },
    ];

    const actions = ['create', 'read', 'update', 'delete'];

    const handlePermissionChange = (role, module, action) => {
        setPermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [module]: {
                    ...prev[role][module],
                    [action]: !prev[role][module][action]
                }
            }
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Roles & Permissions</h2>
                <p className="text-sm text-gray-500">Manage role-based access control for the system</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                            {Object.keys(permissions).map(role => (
                                <th key={role} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {role.replace(/([A-Z])/g, ' $1').trim()}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {modules.map(module => (
                            <tr key={module.key} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                    {module.label}
                                </td>
                                {Object.keys(permissions).map(role => (
                                    <td key={`${role}-${module.key}`} className="px-4 py-3">
                                        <div className="flex items-center justify-center space-x-3">
                                            {actions.map(action => (
                                                <label key={action} className="flex items-center space-x-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={permissions[role][module.key][action]}
                                                        onChange={() => handlePermissionChange(role, module.key, action)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-xs text-gray-500">{action}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}