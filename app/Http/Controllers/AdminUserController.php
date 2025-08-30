<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Changed from Property to User
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash; // Import Hash facade for password hashing

class AdminUserController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()->paginate(10); // Changed from properties to users
        return Inertia::render('Admin/Users/Index', ['users' => $users]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // User fields - TODO: Customize validation rules for User model
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:admin,host,customer',
        ]);

        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
        ]); // Changed from Property::create to User::create and added password hashing

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) // Changed from Property $property to User $user
    {
        return Inertia::render('Admin/Users/Show', ['user' => $user]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user) // Changed from Property $property to User $user
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user) // Changed from Property $property to User $user
    {
        $validatedData = $request->validate([
            // User fields - TODO: Customize validation rules for User model
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|in:admin,host,customer',
        ]);

        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->role = $validatedData['role'];

        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->save(); // Changed from $property->update to $user->save

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) // Changed from Property $property to User $user
    {
        $user->delete(); // Changed from $property->delete to $user->delete
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.'); // Changed route and message
    }
}
