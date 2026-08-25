<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

use App\Models\Document; // Add this line

use App\Models\DocumentRecipient; // Add this if you're using it

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $documents = [
            [
                 
                'tracking_number' => 'DOC-2024-001',
                'title' => 'Annual Financial Report 2024',
                'type' => 'Report',
                'date_received' => '2024-01-15',
                'status' => 'Pending',
                'urgency' => 'High',
                'description' => 'Financial report for the fiscal year 2024',
                'file_path' => '/documents/financial_report_2024.pdf',
                'created_by' => 30,
                'released_at' => '2026-08-01',
                'archived_at' => '2026-08-01',
                'delete_at' => '2026-08-01',
                'release_date' => '2024-01-20',
                'created_at' => '2026-08-01',
                'updated_at' => '2026-08-01',
                'recipients' => [
                    ['name' => 'Bureau of Lands', 'email' => 'lands@example.com', 'status' => 'Sent'],
                    ['name' => 'Legal Division', 'email' => 'legal@example.com', 'status' => 'Read'],
                ]
            ],
            [
                'tracking_number' => 'DOC-2024-002',
                'title' => 'Project Proposal: System Upgrade',
                'type' => 'Proposal',
                'date_received' => '2024-01-20',
                'status' => 'Pending',
                'urgency' => 'Medium',
                'description' => 'Proposal for upgrading the company management system',
                'file_path' => '/documents/system_upgrade_proposal.pdf',
                'created_by' => 31,
                'released_at' => '2026-08-01',
                'archived_at' => '2026-08-01',
                'delete_at' => '2026-08-01',
                'release_date' => '2024-02-01',
                'created_at' => '2026-08-01',
                'updated_at' => '2026-08-01',
                'recipients' => [
                    ['name' => 'Community Affairs', 'email' => 'community@example.com', 'status' => 'pending'],
                    ['name' => 'Planning Division', 'email' => 'planning@example.com', 'status' => 'pending'],
                ]
            ],
            // Add more documents...
        ];

        foreach ($documents as $docData) {
            $recipients = $docData['recipients'];
            unset($docData['recipients']);
            
            $document = Document::create($docData);
            
            foreach ($recipients as $recipient) {
                DocumentRecipient::create([
                    'document_id' => $document->id,
                    'name' => $recipient['name'],
                    'email' => $recipient['email'],
                    'status' => $recipient['status'],
                    'sent_at' => $recipient['status'] === 'Sent' ? now() : null,
                    'read_at' => $recipient['status'] === 'Read' ? now() : null,
                ]);
            }
        }

    }
}
