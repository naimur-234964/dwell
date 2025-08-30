<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address; // Changed from Property to Address
use Inertia\Inertia;

class AdminAddressController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $addresses = Address::latest()->paginate(10); // Changed from properties to addresses
        return Inertia::render('Admin/Addresses/Index', ['addresses' => $addresses]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Addresses/Create'); // Changed path, no amenities needed
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Address fields - TODO: Customize validation rules for Address model
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        Address::create($validatedData); // Changed from Property::create to Address::create

        return redirect()->route('admin.addresses.index')->with('success', 'Address created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address) // Changed from Property $property to Address $address
    {
        return Inertia::render('Admin/Addresses/Show', ['address' => $address]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address) // Changed from Property $property to Address $address
    {
        return Inertia::render('Admin/Addresses/Edit', [
            'address' => $address, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address) // Changed from Property $property to Address $address
    {
        $validatedData = $request->validate([
            // Address fields - TODO: Customize validation rules for Address model
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $address->update($validatedData); // Changed from $property->update to $address->update

        return redirect()->route('admin.addresses.index')->with('success', 'Address updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address) // Changed from Property $property to Address $address
    {
        $address->delete(); // Changed from $property->delete to $address->delete
        return redirect()->route('admin.addresses.index')->with('success', 'Address deleted successfully.'); // Changed route and message
    }
}
