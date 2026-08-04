<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\AuditTrail;

use Inertia\Inertia;

class AuditTrailController extends Controller
{
    //
     public function index(Request $request)
    {
        $query = AuditTrail::with('user');

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('module', 'like', "%{$search}%")
                  ->orWhere('event', 'like', "%{$search}%")
                  ->orWhere('user', 'like', "%{$search}%");
            });
        }

        // Sorting
        if ($request->has('sort')) {
            $direction = $request->get('direction', 'asc');
            $query->orderBy($request->sort, $direction);
        }

        $auditTrails = $query->paginate(10);

        return Inertia::render('AuditTrails/AuditTrailList', [
            'auditTrails' => $auditTrails,
        ]);
    }
     
}
