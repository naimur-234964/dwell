<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Amenity;
use App\Models\Property;
use Inertia\Inertia;

class HostAmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hostId = auth()->id();
        // Fetch amenities associated with the host's properties
        $amenities = Amenity::whereHas('properties', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->latest()->paginate(10);

        return Inertia::render('Host/Amenities/Index', ['amenities' => $amenities]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Host/Amenities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Amenity::create($validatedData);

        return redirect()->route('host.amenities.index')->with('success', 'Amenity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Amenity $amenity)
    {
        return Inertia::render('Host/Amenities/Show', ['amenity' => $amenity]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Amenity $amenity)
    {
        return Inertia::render('Host/Amenities/Edit', [
            'amenity' => $amenity,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Amenity $amenity)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $amenity->update($validatedData);

        return redirect()->route('host.amenities.index')->with('success', 'Amenity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Amenity $amenity)
    {
        $amenity->delete();
        return redirect()->route('host.amenities.index')->with('success', 'Amenity deleted successfully.');
    }
}
