<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['address', 'amenities', 'propertyImages', 'reviews'])
            ->withAvg('reviews', 'rating');

        if ($request->has('location')) {
            $locationName = $request->input('location');
            $query->whereHas('address.location', function ($q) use ($locationName) {
                $q->where('name', $locationName);
            });
        }

        $properties = $query->paginate(10)->through(function ($property) {
            $property->image_path = $property->propertyImages->first() ? Storage::url($property->propertyImages->first()->image_path) : null;
            return $property;
        });

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['location']),
        ]);
    }

    public function show(Property $property)
    {
        $property->load(['address.location', 'amenities', 'propertyImages', 'reviews', 'user']);

        $property->image_path = $property->propertyImages->first() ? Storage::url($property->propertyImages->first()->image_path) : null;
        $property->images = $property->propertyImages->map(function ($image) {
            $image->image_path = Storage::url($image->image_path);
            return $image;
        });

        $relatedProperties = Property::with(['address', 'propertyImages', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->where('id', '!=', $property->id)
            ->whereHas('address', function ($query) use ($property) {
                if ($property->address && $property->address->location) {
                    $query->where('location_id', $property->address->location->id);
                }
            })
            ->inRandomOrder()
            ->limit(4)
            ->get()
            ->map(function ($p) {
                $p->image_path = $p->propertyImages->first() ? Storage::url($p->propertyImages->first()->image_path) : null;
                return $p;
            });

        $moreProperties = Property::with(['address', 'propertyImages', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->where('id', '!=', $property->id)
            ->whereNotIn('id', $relatedProperties->pluck('id'))
            ->inRandomOrder()
            ->limit(12)
            ->get()
            ->map(function ($p) {
                $p->image_path = $p->propertyImages->first() ? Storage::url($p->propertyImages->first()->image_path) : null;
                return $p;
            });

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'relatedProperties' => $relatedProperties,
            'moreProperties' => $moreProperties,
        ]);
    }
}
