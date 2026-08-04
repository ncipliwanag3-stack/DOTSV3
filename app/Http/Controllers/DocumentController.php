<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Document;
use App\Models\AuditTrail;

use Inertia\Inertia;
use Illuminate\Support\Str;






class DocumentController extends Controller
{
    //
    public function index()
    {
        $documents = Document::with('creator')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
        ]);
    }

     public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            //'division' => 'required|string',
            //'sender' => 'required|string',
            //'recipient' => 'required|string',
            'received_date' => 'required|date',
            'due_date' => 'nullable|date',
            //'priority' => 'required|in:normal,urgent',
            'remarks' => 'nullable|string',
        ]);
        
        $validated['tracking_no'] = 'TRK-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        $validated['created_by'] = auth()->id();
        $validated['status'] = $request->is_finalized ? 'pending' : 'draft';

        $document = Document::create($validated);

        audit_trail('Documents', 'Create', "Created document: {$document->tracking_no}");

        return redirect()->back()->with('success', 'Document created successfully!');
    }
}
