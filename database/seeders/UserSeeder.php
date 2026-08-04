<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        
        // Create Admin User
        User::create([
            'dots_id' => 'DOTS-2026-000001',
            'name' => 'Maria Santos',
            'email' => 'admin@ncip.gov.ph',
            'password' => Hash::make('password123'),
            'office' => 'NCIP Central Office',
            'position' => 'System Administrator',
            'role_id' => $adminRole->id,
            'is_active' => true
        ]);
        
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@ncip.gov.ph',
            'password' => Hash::make('password123'),
            'is_admin' => true,
            'role' => 'admin',
            'division' => 'Indigenous Peoples Rights',
        ]);

        User::create([
            'name' => 'Test User',
            'email' => 'user@ncip.gov.ph',
            'password' => Hash::make('password123'),
            'is_admin' => false,
            'role' => 'admin',
            'division' => 'Indigenous Peoples Rights',
        ]);

        // Create staff user
        $staff = User::create([
            'name' => 'Staff User',
            'email' => 'staff@ncip.gov.ph',
            'password' => bcrypt('password'),
            'role' => 'staff',
            'division' => 'Ancestral Domain',
        ]);

        // Create sample documents
        $documents = [
            [
                'tracking_number' => 'NCIP-2024-0001',
                'title' => 'Certificate of Ancestral Domain Claim',
                'status' => 'pending',
                'received_date' => now()->subDays(5),
                'category' => 'Ancestral Domain',
                'received_by' => $staff->id,
            ],
            [
                'tracking_number' => 'NCIP-2024-0002',
                'title' => 'Free and Prior Informed Consent Application',
                'status' => 'released',
                'received_date' => now()->subDays(3),
                'release_date' => now()->subDays(1),
                'category' => 'FPIC',
                'received_by' => $staff->id,
                'released_by' => $admin->id,
            ],
            // Add more documents as needed
        ];
        foreach ($documents as $doc) {
            Document::create($doc);
        }

        // Create activity logs
        $activities = [
            [
                'user_id' => $admin->id,
                'document_id' => 1,
                'action' => 'created',
                'description' => 'Created document NCIP-2024-0001',
            ],
            [
                'user_id' => $staff->id,
                'document_id' => 2,
                'action' => 'received',
                'description' => 'Received document NCIP-2024-0002',
            ],
        ];
        foreach ($activities as $activity) {
            ActivityLog::create($activity);
        }

        // Create notifications
        $notifications = [
            [
                'user_id' => $admin->id,
                'title' => 'New Document Received',
                'message' => 'Document NCIP-2024-0001 has been received',
                'type' => 'info',
                'is_read' => false,
            ],
            [
                'user_id' => $staff->id,
                'title' => 'Document Released',
                'message' => 'Document NCIP-2024-0002 has been released',
                'type' => 'success',
                'is_read' => true,
            ],
        ];
        foreach ($notifications as $notification) {
            Notification::create($notification);
        }
    }
}