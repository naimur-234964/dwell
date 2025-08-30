<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Inertia\Inertia;

class HostPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::where('user_id', auth()->id())->get();
        return Inertia::render('Host/Properties/Index', ['properties' => $properties]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Host/Properties/Create');
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
        ]);

        Property::create([
            ...$validatedData,
            'user_id' => auth()->id(), // Associate with the authenticated host
        ]);

        return redirect()->route('host.properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Host/Properties/Show', ['property' => $property]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Host/Properties/Edit', ['property' => $property]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Property $property)
    {
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric|min:0',
            'number_of_guests' => 'required|integer|min:1',
            'number_of_bedrooms' => 'required|integer|min:0',
            'number_of_beds' => 'required|integer|min:0',
            'number_of_bathrooms' => 'required|integer|min:0',
            'is_available' => 'boolean',
        ]);

        $property->update($validatedData);

        return redirect()->route('host.properties.index')->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        if ($property->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $property->delete();
        return redirect()->route('host.properties.index')->with('success', 'Property deleted successfully.');
    }
}
