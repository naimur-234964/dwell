<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB; // For transactions

use App\Http\Requests\Admin\StoreLocationRequest;
use App\Http\Requests\Admin\UpdateLocationRequest;

class AdminLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::latest()->paginate(10);
        return Inertia::render('Admin/Locations/Index', ['locations' => $locations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Locations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        $validatedData = $request->validated();

        DB::transaction(function () use ($validatedData, $request) {
            $imagePath = $request->file('image')->store('locations', 'public');

            Location::create([
                'name' => $validatedData['name'],
                'image_path' => $imagePath,
            ]);
        });

        return redirect()->route('admin.locations.index')->with('success', 'Location created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        return Inertia::render('Admin/Locations/Show', ['location' => $location]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        return Inertia::render('Admin/Locations/Edit', ['location' => $location]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $validatedData = $request->validated();

        DB::transaction(function () use ($validatedData, $request, $location) {
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($location->image_path) {
                    Storage::disk('public')->delete($location->image_path);
                }
                $imagePath = $request->file('image')->store('locations', 'public');
                $location->image_path = $imagePath;
            }

            $location->name = $validatedData['name'];
            $location->save();
        });

        return redirect()->route('admin.locations.index')->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        DB::transaction(function () use ($location) {
            if ($location->image_path) {
                Storage::disk('public')->delete($location->image_path);
            }
            $location->delete();
        });

        return redirect()->route('admin.locations.index')->with('success', 'Location deleted successfully.');
    }
}