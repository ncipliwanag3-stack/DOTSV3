<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Archive;

use Inertia\Inertia;

class ArchiveController extends Controller
{
    //
    /*public function index()
    {
        $archives = Archive::orderBy('archived_date', 'desc')->paginate(16);
        return response()->json($archives);
    }*/

    /*public function byYear($year)
    {
        if ($year === 'All Archives') {
            $archives = Archive::orderBy('archived_date', 'desc')->get();
        } else {
            $archives = Archive::where('year', $year)
                ->orderBy('archived_date', 'desc')
                ->get();
        }
        
        return response()->json($archives);
    }*/

    /*public function search(Request $request)
    {
        $query = $request->input('query');
        $archives = Archive::where('title', 'LIKE', "%{$query}%")
            ->orWhere('tracking_number', 'LIKE', "%{$query}%")
            ->get();
        
        return response()->json($archives);
    }*/
    
        public function index(Request $request)
    {
        $query = Archive::with(['document', 'archivedBy']);

        // Year filter
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        // Column visibility and sorting
        $sortField = $request->get('sort_field', 'date_archived');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $archives = $query->paginate(10);

        $years = Archive::select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        return Inertia::render('Archives', [
            'archives' => $archives,
            'years' => $years,
            'currentYear' => $request->get('year', date('Y')),
        ]);
    }

}
