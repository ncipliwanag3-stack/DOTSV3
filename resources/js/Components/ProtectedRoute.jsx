import React from 'react';
//import { Navigate } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function ProtectedRoute({ children }) {
    const { auth } = usePage().props;

    if (!auth?.user) {
        return <Navigate href="/login" />;
    }

    return children;
}