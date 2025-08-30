<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Address; // Import Address model
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

            // Address fields
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $property = Property::create([
            'user_id' => $validatedData['user_id'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'price_per_night' => $validatedData['price_per_night'],
            'number_of_guests' => $validatedData['number_of_guests'],
            'number_of_bedrooms' => $validatedData['number_of_bedrooms'],
            'number_of_beds' => $validatedData['number_of_beds'],
            'number_of_bathrooms' => $validatedData['number_of_bathrooms'],
            'is_available' => $validatedData['is_available'],
        ]);

        $property->address()->create([
            'address_line_1' => $validatedData['address_line_1'],
            'address_line_2' => $validatedData['address_line_2'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'zip_code' => $validatedData['zip_code'],
            'country' => $validatedData['country'],
        ]);

        return redirect()->route('admin.properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property->load('address'); // Eager load the address relationship
        return Inertia::render('Admin/Properties/Show', ['property' => $property]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        $property->load('address'); // Eager load the address relationship
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

            // Address fields
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $property->update([
            'user_id' => $validatedData['user_id'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'price_per_night' => $validatedData['price_per_night'],
            'number_of_guests' => $validatedData['number_of_guests'],
            'number_of_bedrooms' => $validatedData['number_of_bedrooms'],
            'number_of_beds' => $validatedData['number_of_beds'],
            'number_of_bathrooms' => $validatedData['number_of_bathrooms'],
            'is_available' => $validatedData['is_available'],
        ]);

        // Update the associated address
        $property->address->update([
            'address_line_1' => $validatedData['address_line_1'],
            'address_line_2' => $validatedData['address_line_2'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'zip_code' => $validatedData['zip_code'],
            'country' => $validatedData['country'],
        ]);

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
