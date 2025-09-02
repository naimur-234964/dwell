<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['address', 'amenities']);

        if ($request->has('location')) {
            $locationName = $request->input('location');
            $query->whereHas('address.location', function ($q) use ($locationName) {
                $q->where('name', $locationName);
            });
        }

        $properties = $query->paginate(10); // Paginate results

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['location']),
        ]);
    }
}
