// resources/js/Components/Layouts/AuthenticatedLayout.jsx
import React, { useState } from 'react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import TopBar from '@/Components/Dashboard/TopBar';

export default function AuthenticatedLayout({ children, user, stats, activities, overdueDocuments, unreadCount, recentNotifications }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="flex h-screen">
                <Sidebar 
                    user={user} 
                    isOpen={sidebarOpen} 
                    setIsOpen={setSidebarOpen} 
                />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar 
                        user={user}
                        unreadCount={unreadCount}
                        recentNotifications={recentNotifications}
                    />
                    
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}