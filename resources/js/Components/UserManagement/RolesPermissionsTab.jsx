// resources/js/Components/UserManagement/RolesPermissionsTab.jsx
import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function RolesPermissionsTab({ users, permissions }) {
    const [editingPermissions, setEditingPermissions] = useState(null);
    const modules = ['User Management', 'Documents', 'Dashboard', 'Archives', 'Audit Trails'];
    const roles = ['admin', 'staff', 'regional_focal'];

    const getRolePermissions = (userId) => {
        const perms = permissions[userId] || [];
        return perms.reduce((acc, perm) => ({
            ...acc,
            [perm.module]: {
                can_create: perm.can_create,
                can_read: perm.can_read,
                can_update: perm.can_update,
                can_delete: perm.can_delete,
            }
        }), {});
    };

    const { data, setData, post, processing } = useForm({
        permissions: {},
    });

    const handlePermissionChange = (userId, module, action) => {
        const userPerms = { ...data.permissions[userId] };
        if (!userPerms[module]) {
            userPerms[module] = {
                module,
                can_create: false,
                can_read: false,
                can_update: false,
                can_delete: false,
            };
        }
        userPerms[module][action] = !userPerms[module][action];
        
        setData('permissions', {
            ...data.permissions,
            [userId]: Object.values(userPerms),
        });
    };

    const savePermissions = (userId) => {
        post(`/users/${userId}/permissions`, {
            data: { permissions: data.permissions[userId] },
            onSuccess: () => {
                setEditingPermissions(null);
            },
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                            {modules.map((module) => (
                                <th key={module} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={4}>
                                    {module}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                        <tr className="bg-gray-50">
                            <th colSpan={2}></th>
                            {modules.map((module) => (
                                <th key={`${module}-actions`} className="px-1 py-2 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider" colSpan={4}>
                                    <span className="flex justify-center gap-2">
                                        <span className="w-8">Create</span>
                                        <span className="w-8">Read</span>
                                        <span className="w-8">Update</span>
                                        <span className="w-8">Delete</span>
                                    </span>
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.data.map((user) => {
                            const userPerms = getRolePermissions(user.id);
                            const isEditing = editingPermissions === user.id;

                            return (
                                <tr key={user.id} className="hover:bg-indigo-50/50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    {modules.map((module) => (
                                        <td key={`${user.id}-${module}`} className="px-1 py-2 text-center" colSpan={4}>
                                            <div className="flex justify-center gap-2">
                                                {['can_create', 'can_read', 'can_update', 'can_delete'].map((action) => {
                                                    const isChecked = isEditing
                                                        ? data.permissions[user.id]?.find(p => p.module === module)?.[action] ?? false
                                                        : userPerms[module]?.[action] ?? false;

                                                    return (
                                                        <input
                                                            key={action}
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() => handlePermissionChange(user.id, module, action)}
                                                            disabled={!isEditing}
                                                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-right">
                                        {isEditing ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => savePermissions(user.id)}
                                                    disabled={processing}
                                                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingPermissions(null)}
                                                    className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingPermissions(user.id);
                                                        // Initialize form with current permissions
                                                        const perms = modules.map(module => ({
                                                            module,
                                                            ...(userPerms[module] || {
                                                                can_create: false,
                                                                can_read: false,
                                                                can_update: false,
                                                                can_delete: false,
                                                            }),
                                                        }));
                                                        setData('permissions', {
                                                            ...data.permissions,
                                                            [user.id]: perms,
                                                        });
                                                    }}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}