<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

////////////
use App\Models\Document;
use App\Models\ActivityLog;
use App\Models\Notification;

use Inertia\Inertia;



use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;



class DashboardController extends Controller
{
    //
     //public function index()
    //{
      //  return Inertia::render('Dashboard', [
        //    'user' => auth()->user()
        //]);
    //}

     public function index()
    {
        $user = auth()->user();

        // Stats
        $stats = [
            'pending' => Document::whereRaw('LOWER(status) = ?', ['pending'])->count(),
            'released' => Document::whereRaw('LOWER(status) = ?', ['released'])
                ->whereDate('released_at', today())
                ->count(),
            'archived' => Document::whereRaw('LOWER(status) = ?', ['archived'])->count(),
            'overdue' => Document::whereRaw('LOWER(status) = ?', ['overdue'])->count(),
        ];

        // Latest document activity status
        $activities = Document::query()
            ->select([
                'id',
                'tracking_number',
                'title',
                'last_transaction',
                'status',
                'updated_at',
            ])
            ->latest('updated_at')
            ->paginate(10);

        // Overdue Documents
        $overdueDocuments = Document::with(['receiver', 'releaser'])
            ->whereRaw('LOWER(status) = ?', ['overdue'])
            ->latest()
            ->paginate(5);

        // Unread Notifications
        $unreadCount = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();

        $recentNotifications = Notification::where('user_id', $user->id)
            ->latest()
            ->limit(4)
            ->get();
    return Inertia::render('Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'activities' => $activities,
            'overdueDocuments' => $overdueDocuments,
            'unreadCount' => $unreadCount,
            'recentNotifications' => $recentNotifications,
        ]);
    }

    public function receiveDocument(Request $request)
    {
        $request->validate([
            'tracking_number' => 'required|exists:documents,tracking_number',
        ]);

        $document = Document::where('tracking_number', $request->tracking_number)->first();
        
        if ($document->status !== 'pending') {
            return back()->with('error', 'Document is not pending for release.');
        }

        $document->update([
            'status' => 'released',
            'release_date' => now(),
            'released_by' => auth()->id(),
        ]);
    // Log activity
        ActivityLog::create([
            'user_id' => auth()->id(),
            'document_id' => $document->id,
            'action' => 'received',
            'description' => "Received document: {$document->tracking_number}",
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Create notification
        Notification::create([
            'user_id' => auth()->id(),
            'title' => 'Document Received',
            'message' => "You have successfully received document {$document->tracking_number}",
            'type' => 'success',
            'link' => route('documents.show', $document->id),
        ]);
     return back()->with('success', 'Document received successfully.');
    }

    public function markNotificationRead(Request $request)
    {
        $notification = Notification::findOrFail($request->id);
        
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    public function markAllNotificationsRead()
    {
        Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
