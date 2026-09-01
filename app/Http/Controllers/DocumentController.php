<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Document;
use App\Models\AuditTrail;

use Inertia\Inertia;
use Illuminate\Support\Str;
//////////////////////

use App\Models\Recipient;
use App\Http\Requests\DocumentRequest;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

////////////////
use App\Models\DocumentRecipient;

////////////////////////////


class DocumentController extends Controller
{
    
   
    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'origin_type',
            'status',
            'division_code',
            'division',
            'date_from',
            'date_to',
            'sort_by',
            'sort_direction',
        ]);

        $query = Document::with(['creator', 'recipients']);

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($documentQuery) use ($search) {
                $documentQuery->where('title', 'like', "%{$search}%")
                    ->orWhere('tracking_number', 'like', "%{$search}%")
                    ->orWhere('origin_type', 'like', "%{$search}%")
                    ->orWhere('fullname', 'like', "%{$search}%")
                    ->orWhere('division', 'like', "%{$search}%")
                    ->orWhere('last_transaction', 'like', "%{$search}%");
            });
        }

        $query->when($request->filled('origin_type'), fn ($query) => $query->where('origin_type', $request->origin_type));
        $query->when($request->filled('division_code'), fn ($query) => $query->where('division_code', $request->division_code));
        $query->when($request->filled('division'), fn ($query) => $query->where('division', $request->division));
        $query->when($request->filled('status'), function ($query) use ($request) {
            $query->whereRaw('LOWER(status) = ?', [strtolower($request->status)]);
        });
        $query->when($request->filled('date_from'), fn ($query) => $query->whereDate('date_received', '>=', $request->date_from));
        $query->when($request->filled('date_to'), fn ($query) => $query->whereDate('date_received', '<=', $request->date_to));

        $sortBy = in_array($request->sort_by, ['created_at', 'title', 'origin_type', 'last_transaction', 'fullname', 'division_code', 'division', 'date_received', 'status'], true)
            ? $request->sort_by
            : 'created_at';
        $sortDirection = $request->sort_direction === 'asc' ? 'asc' : 'desc';

        $documents = $query
            ->orderBy($sortBy, $sortDirection)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();
            
        return Inertia::render('Documents/DocumentIndex', [
            'documents' => $documents,
            'filters' => $filters,
        ]);
    }

        /*public function index(Request $request)
    {
        $query = Document::with('creator', 'recipients');

        if ($request->has('search')) {
            $query->where('title', 'like', "%{$request->search}%")
                  ->orWhere('tracking_number', 'like', "%{$request->search}%");
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $sortColumn = $request->input('sort_column', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortColumn, $sortDirection);

        $documents = $query->paginate(10);

        return response()->json($documents);
    }*/
    //////////////////
    
    /*public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'date_received' => 'required|date',
            'status' => 'required|in:Pending,Processing,For Release,Released,Archived,Terminal',
            'urgency' => 'required|in:Low,Medium,High,Urgent',
            'description' => 'nullable|string',
            'recipients' => 'required|array|min:1',
            'recipients.*.name' => 'required|string|max:255',
            'recipients.*.email' => 'required|email|max:255',
            'file' => 'nullable|file|max:10240|mimes:doc,docx,pdf,xls,xlsx,ppt,pptx,txt',
        ]);

        $trackingNumber = 'DOTS-2026-' . str_pad(Document::count() + 1, 4, '0', STR_PAD_LEFT);

        $document = Document::create([
            'tracking_number' => $trackingNumber,
            'title' => $validated['title'],
            'type' => $validated['type'],
            'date_received' => $validated['date_received'],
            'status' => $validated['status'],
            'urgency' => $validated['urgency'],
            'description' => $validated['description'],
            'created_by' => auth()->id(),
        ]);

        // Handle file upload
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('documents', 'public');
            $document->update(['file_path' => $path]);
        }

        // Create recipients
        foreach ($validated['recipients'] as $recipient) {
            DocumentRecipient::create([
                'document_id' => $document->id,
                'name' => $recipient['name'],
                'email' => $recipient['email'],
                'status' => 'Pending',
            ]);
        }

        return redirect()->back()->with('success', 'Document created successfully');
    }*/

    //////////////////////////
    public function store(DocumentRequest $request)
    {
        $data = $request->validated();
        $recipients = $request->input('recipients', []);

        if (is_string($recipients)) {
            $recipients = json_decode($recipients, true) ?? [];
        }

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('documents', 'public');
            $data['file_path'] = $path;
        }

        $data['tracking_number'] = $this->generateTrackingNumber();
        $data['created_by'] = auth()->id();
        $data['last_transaction'] = $data['last_transaction'] ?: 'Document Created';

        $document = Document::create($data);

        // Create recipients and send tracking notification email
        foreach ($recipients as $recipient) {
            $recipientEmail = trim((string) ($recipient['email'] ?? ''));
            $recipientName = trim((string) ($recipient['name'] ?? $recipient['fullname'] ?? 'Recipient'));

            $recipientRecord = DocumentRecipient::create([
                'document_id' => $document->id,
                'name' => $recipientName,
                'email' => $recipientEmail,
                'status' => 'Pending'
            ]);

            if ($recipientEmail !== '') {
                Mail::raw(
                    "Document Tracking Update\n\nDocument: {$document->title}\nTracking Number: {$document->tracking_number}\nStatus: {$document->status}\nLast Transaction: {$document->last_transaction}\n\nPlease monitor the document updates in the tracking system.",
                    function ($message) use ($recipientEmail, $recipientName, $document) {
                        $message->to($recipientEmail, $recipientName)
                            ->subject('Document Tracking System Update - ' . $document->tracking_number)
                            ->replyTo(config('mail.from.address'), config('mail.from.name'));
                    }
                );

                $recipientRecord->update([
                    'status' => 'Sent',
                    'sent_at' => now(),
                ]);
            }
        }

        $document->refresh();

        $document->load('recipients');

        if ($request->expectsJson()) {
            return response()->json($document, 201);
        }

        return redirect('/documents')->with('success', 'Document created successfully');
    }

    /////////////////
     public function update(Request $request, Document $document)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'origin_type' => 'sometimes|string|max:255',
            'last_transaction' => 'nullable|string|max:255',
            'status' => 'sometimes|in:Pending,Processing,For Release,Released,Archived,Terminal',
            'urgency' => 'sometimes|in:Low,Medium,High,Urgent',
            'description' => 'nullable|string',
        ]);

        $document->update($validated);

        return redirect()->back()->with('success', 'Document updated successfully');
    }
    ///////////////////////////////

    public function show(Document $document)
    {
        return response()->json($document->load('creator', 'recipients'));
    }

    ///////////////////////////////
    public function destroy(Document $document)
    {
        // Delete file if exists
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }
        
        $document->delete();

        return redirect()->back()->with('success', 'Document deleted successfully');
    }
     
      

    //////////////////////////////////////

    public function release(Request $request, Document $document)
    {
        $transactionMessage = 'Released on ' . now()->format('Y-m-d H:i:s');

        $document->update([
            'status' => 'Released',
            'released_at' => now(),
            'last_transaction' => $transactionMessage,
        ]);

        // Update recipient statuses
        $document->recipients()->update(['status' => 'Sent', 'sent_at' => now()]);

        return redirect()->back()->with('success', 'Document released successfully');
    }
    //////////////////////////////
     
    public function terminal(Request $request, Document $document)
    {
        $document->update([
            'status' => 'Terminal',
            'last_transaction' => 'Marked as Terminal on ' . now()->format('Y-m-d H:i:s'),
        ]);

        return redirect()->back()->with('success', 'Document terminal status updated');
    }
    ///////////////////////////////

     public function getDocumentData()
    {
        $documents = Document::with(['recipients'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'tracking' => $doc->tracking_number,
                    'title' => $doc->title,
                    'type' => $doc->type,
                    'originType' => $doc->origin_type,
                    'lastTransaction' => $doc->last_transaction,
                    'fullname' => $doc->fullname,
                    'divisionCode' => $doc->division_code,
                    'division' => $doc->division,
                    'dateReceived' => $doc->date_received->format('Y-m-d'),
                    'status' => $doc->status,
                    'urgency' => $doc->urgency,
                    'recipients' => $doc->recipients->pluck('name')->toArray(),
                    'recipientDetails' => $doc->recipients->map(function ($recipient) {
                        return [
                            'name' => $recipient->name,
                            'email' => $recipient->email,
                            'status' => $recipient->status,
                            'sentAt' => $recipient->sent_at?->format('Y-m-d H:i:s'),
                            'readAt' => $recipient->read_at?->format('Y-m-d H:i:s'),
                        ];
                        }),
                    'filePath' => $doc->file_path,
                    'description' => $doc->description,
                ];
            });

        return response()->json($documents);
    }

    //////////////////////////////////

    public function archive(Request $request, Document $document)
    {
        $document->update([
            'status' => 'Archived',
            'archived_at' => now(),
            'last_transaction' => 'Archived on ' . now()->format('Y-m-d H:i:s'),
        ]);

        AuditTrail::create([
            'user_id' => auth()->id(),
            'document_id' => $document->id,
            'action' => 'Archived document',
            'details' => "Document {$document->tracking_number} was archived",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->back()->with('success', 'Document archived successfully');
    }
    //////////////////
    public function getEmailStatus(Document $document)
    {
        $statuses = $document->recipients->map(function ($recipient) {
            return [
                'name' => $recipient->name,
                'email' => $recipient->email,
                'status' => $recipient->status,
                'sent_at' => $recipient->sent_at,
                'read_at' => $recipient->read_at
            ];
        });

        return response()->json($statuses);
    }

    //////////////////////////////

    private function generateTrackingNumber()
    {
        $date = now();
        $prefix = $date->format('y-m-d');
        $sequence = Document::whereDate('created_at', $date->toDateString())->count() + 1;

        do {
            $trackingNumber = 'CO-OPPR-ICTD-' . $prefix . '-' . str_pad($sequence, 5, '0', STR_PAD_LEFT);
            $sequence++;
        } while (Document::withTrashed()->where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }

    

}
