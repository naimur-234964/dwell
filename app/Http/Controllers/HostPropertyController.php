<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Address; // Import Address model
use App\Models\Amenity; // Import Amenity model
use App\Models\PropertyImage; // Import PropertyImage model
use Illuminate\Support\Facades\Storage; // Import Storage facade
use App\Http\Requests\Host\UpdatePropertyRequest; // Import UpdatePropertyRequest
use App\Http\Requests\Host\StorePropertyRequest; // Import StorePropertyRequest
use Illuminate\Support\Facades\DB; // Import DB facade
use Inertia\Inertia;

class HostPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $properties = Property::where('user_id', auth()->id())->latest()->paginate(10);
        return Inertia::render('Host/Properties/Index', ['properties' => $properties]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $amenities = Amenity::all();
        return Inertia::render('Host/Properties/Create', ['amenities' => $amenities]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        $validatedData = $request->validated();

        DB::transaction(function () use ($validatedData, $request) {
            $property = Property::create([
                'user_id' => auth()->id(), // Associate with the authenticated host
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'short_description' => $validatedData['short_description'], // Added short_description
                'price_per_night' => $validatedData['price_per_night'],
                'discount_price' => $validatedData['discount_price'] ?? null, // Added discount_price
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

            // Sync amenities
            $property->amenities()->sync($validatedData['amenities'] ?? []);

            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('properties', 'public');
                    $property->propertyImages()->create([
                        'image_path' => $path,
                        'order' => $index,
                    ]);
                }
            }
        }); // End of transaction

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
        $property->load('address', 'amenities', 'propertyImages'); // Eager load the address relationship
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
        $property->load('address', 'amenities', 'propertyImages'); // Eager load address, amenities and propertyImages relationships
        $amenities = Amenity::all(); // Get all available amenities
        return Inertia::render('Host/Properties/Edit', [
            'property' => $property,
            'amenities' => $amenities,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        $validatedData = $request->validated();

        DB::transaction(function () use ($validatedData, $request, $property) {
            $property->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'short_description' => $validatedData['short_description'], // Added short_description
                'price_per_night' => $validatedData['price_per_night'],
                'discount_price' => $validatedData['discount_price'] ?? null, // Added discount_price
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

            // Sync amenities
            $property->amenities()->sync($validatedData['amenities'] ?? []);

            // Handle image deletion
            if (!empty($validatedData['deleted_images'])) {
                foreach ($validatedData['deleted_images'] as $imageId) {
                    $image = PropertyImage::find($imageId);
                    if ($image && $image->property_id === $property->id) {
                        Storage::disk('public')->delete($image->image_path);
                        $image->delete();
                    }
                }
            }

            // Handle image reordering
            if (!empty($validatedData['existing_images'])) {
                foreach ($validatedData['existing_images'] as $index => $image_data) {
                    $image = PropertyImage::find($image_data['id']);
                    if ($image && $image->property_id === $property->id) {
                        $image->update(['order' => $index]);
                    }
                }
            }

            // Handle new image uploads
            if ($request->hasFile('images')) {
                $lastOrder = $property->propertyImages()->max('order') ?? -1;
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('properties', 'public');
                    $property->propertyImages()->create([
                        'image_path' => $path,
                        'order' => $lastOrder + 1 + $index,
                    ]);
                }
            }
        }); // End of transaction

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

        // Delete associated images from storage
        foreach ($property->propertyImages as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $property->delete();
        return redirect()->route('host.properties.index')->with('success', 'Property deleted successfully.');
    }
}
