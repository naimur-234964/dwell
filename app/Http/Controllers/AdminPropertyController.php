<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class AdminPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::all();
        return Inertia::render('Admin/Properties/Index', ['properties' => $properties]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Properties/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric|min:0',
            'number_of_guests' => 'required|integer|min:1',
            'number_of_bedrooms' => 'required|integer|min:0',
            'number_of_beds' => 'required|integer|min:0',
            'number_of_bathrooms' => 'required|integer|min:0',
            'is_available' => 'boolean',
            'user_id' => 'required|exists:users,id', // Admin can assign to any user
        ]);

        Property::create($validatedData);

        return redirect()->route('admin.properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        return Inertia::render('Admin/Properties/Show', ['property' => $property]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        return Inertia::render('Admin/Properties/Edit', ['property' => $property]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric|min:0',
            'number_of_guests' => 'required|integer|min:1',
            'number_of_bedrooms' => 'required|integer|min:0',
            'number_of_beds' => 'required|integer|min:0',
            'number_of_bathrooms' => 'required|integer|min:0',
            'is_available' => 'boolean',
            'user_id' => 'required|exists:users,id', // Admin can assign to any user
        ]);

        $property->update($validatedData);

        return redirect()->route('admin.properties.index')->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->route('admin.properties.index')->with('success', 'Property deleted successfully.');
    }
}
