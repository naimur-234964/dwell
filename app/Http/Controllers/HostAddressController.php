<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Property;
use Inertia\Inertia;

class HostAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hostId = auth()->id();
        // Fetch addresses associated with the host's properties
        $addresses = Address::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->latest()->paginate(10);

        return Inertia::render('Host/Addresses/Index', ['addresses' => $addresses]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hostId = auth()->id();
        $properties = Property::where('user_id', $hostId)->get();
        return Inertia::render('Host/Addresses/Create', ['properties' => $properties]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hostId = auth()->id();
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        // Ensure the property belongs to the host
        $property = Property::where('user_id', $hostId)->findOrFail($validatedData['property_id']);

        $property->address()->create([
            'street' => $validatedData['street'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'zip_code' => $validatedData['zip_code'],
            'country' => $validatedData['country'],
        ]);

        return redirect()->route('host.addresses.index')->with('success', 'Address created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        $hostId = auth()->id();
        // Ensure the address's property belongs to the host
        $address->load('property');
        if ($address->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Host/Addresses/Show', ['address' => $address]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        $hostId = auth()->id();
        // Ensure the address's property belongs to the host
        $address->load('property');
        if ($address->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        $properties = Property::where('user_id', $hostId)->get();
        return Inertia::render('Host/Addresses/Edit', [
            'address' => $address,
            'properties' => $properties,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        $hostId = auth()->id();
        // Ensure the address's property belongs to the host
        $address->load('property');
        if ($address->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        // Ensure the updated property also belongs to the host
        $property = Property::where('user_id', $hostId)->findOrFail($validatedData['property_id']);

        $address->update($validatedData);

        return redirect()->route('host.addresses.index')->with('success', 'Address updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $hostId = auth()->id();
        // Ensure the address's property belongs to the host
        $address->load('property');
        if ($address->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $address->delete();
        return redirect()->route('host.addresses.index')->with('success', 'Address deleted successfully.');
    }
}
