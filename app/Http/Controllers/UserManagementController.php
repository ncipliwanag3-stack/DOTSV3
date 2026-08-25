<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('dots_id', 'like', "%{$search}%");
            });
        }

        // Role filter
        if ($request->has('role') && $request->role !== 'all') {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(6);
        $roles = Role::all();

        return Inertia::render('UserManagement/UserManagement', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dots_id' => 'required|unique:users',
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'office' => 'required|string',
            'position' => 'required|string',
            'role' => 'required|in:admin,staff,regional_focal',
            'password' => 'required|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        User::create($validated);

        return redirect()->back()->with('success', 'User created successfully');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'office' => 'sometimes|string',
            'position' => 'sometimes|string',
            'role' => 'sometimes|in:admin,staff,regional_focal',
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully');
    }
}