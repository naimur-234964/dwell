<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Amenity; // Changed from Property to Amenity
use Inertia\Inertia;

class AdminAmenityController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $amenities = Amenity::latest()->paginate(10); // Changed from properties to amenities
        return Inertia::render('Admin/Amenities/Index', ['amenities' => $amenities]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Amenities/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Amenity fields - TODO: Customize validation rules for Amenity model
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Amenity::create($validatedData); // Changed from Property::create to Amenity::create

        return redirect()->route('admin.amenities.index')->with('success', 'Amenity created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(Amenity $amenity) // Changed from Property $property to Amenity $amenity
    {
        return Inertia::render('Admin/Amenities/Show', ['amenity' => $amenity]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenity $amenity) // Changed from Property $property to Amenity $amenity
    {
        return Inertia::render('Admin/Amenities/Edit', [
            'amenity' => $amenity, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amenity $amenity) // Changed from Property $property to Amenity $amenity
    {
        $validatedData = $request->validate([
            // Amenity fields - TODO: Customize validation rules for Amenity model
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $amenity->update($validatedData); // Changed from $property->update to $amenity->update

        return redirect()->route('admin.amenities.index')->with('success', 'Amenity updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenity $amenity) // Changed from Property $property to Amenity $amenity
    {
        $amenity->delete(); // Changed from $property->delete to $amenity->delete
        return redirect()->route('admin.amenities.index')->with('success', 'Amenity deleted successfully.'); // Changed route and message
    }
}
