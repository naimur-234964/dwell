<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PropertyImage; // Changed from Property to PropertyImage
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // Keep Storage facade for image handling

class AdminPropertyImageController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propertyImages = PropertyImage::latest()->paginate(10); // Changed from properties to propertyImages
        return Inertia::render('Admin/PropertyImages/Index', ['propertyImages' => $propertyImages]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PropertyImages/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // PropertyImage fields - TODO: Customize validation rules for PropertyImage model
            'property_id' => 'required|exists:properties,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'order' => 'nullable|integer|min:0',
        ]);

        $path = $request->file('image')->store('property_images', 'public');

        PropertyImage::create([
            'property_id' => $validatedData['property_id'],
            'image_path' => $path,
            'order' => $validatedData['order'] ?? 0,
        ]);

        return redirect()->route('admin.property-images.index')->with('success', 'Property Image created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyImage $propertyImage) // Changed from Property $property to PropertyImage $propertyImage
    {
        return Inertia::render('Admin/PropertyImages/Show', ['propertyImage' => $propertyImage]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PropertyImage $propertyImage) // Changed from Property $property to PropertyImage $propertyImage
    {
        return Inertia::render('Admin/PropertyImages/Edit', [
            'propertyImage' => $propertyImage, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PropertyImage $propertyImage) // Changed from Property $property to PropertyImage $propertyImage
    {
        $validatedData = $request->validate([
            // PropertyImage fields - TODO: Customize validation rules for PropertyImage model
            'property_id' => 'required|exists:properties,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'order' => 'nullable|integer|min:0',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'integer|exists:property_images,id',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($propertyImage->image_path) {
                Storage::disk('public')->delete($propertyImage->image_path);
            }
            $path = $request->file('image')->store('property_images', 'public');
            $propertyImage->image_path = $path;
        }

        $propertyImage->property_id = $validatedData['property_id'];
        $propertyImage->order = $validatedData['order'] ?? 0;
        $propertyImage->save();

        // Handle image deletion (if any existing image was marked for deletion from frontend)
        if (!empty($validatedData['deleted_images'])) {
            foreach ($validatedData['deleted_images'] as $imageId) {
                $imageToDelete = PropertyImage::find($imageId);
                if ($imageToDelete && $imageToDelete->id === $propertyImage->id) { // Ensure we only delete the current image if it's marked
                    Storage::disk('public')->delete($imageToDelete->image_path);
                    $imageToDelete->delete();
                }
            }
        }

        return redirect()->route('admin.property-images.index')->with('success', 'Property Image updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyImage $propertyImage) // Changed from Property $property to PropertyImage $propertyImage
    {
        if ($propertyImage->image_path) {
            Storage::disk('public')->delete($propertyImage->image_path);
        }
        $propertyImage->delete(); // Changed from $property->delete to $propertyImage->delete
        return redirect()->route('admin.property-images.index')->with('success', 'Property Image deleted successfully.'); // Changed route and message
    }
}
