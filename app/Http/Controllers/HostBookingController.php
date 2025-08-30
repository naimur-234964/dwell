<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Property;
use Inertia\Inertia;

class HostBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hostId = auth()->id();
        $bookings = Booking::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->latest()->paginate(10);

        return Inertia::render('Host/Bookings/Index', ['bookings' => $bookings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hostId = auth()->id();
        $properties = Property::where('user_id', $hostId)->get();
        return Inertia::render('Host/Bookings/Create', ['properties' => $properties]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hostId = auth()->id();
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'customer_id' => 'required|exists:users,id', // Changed from user_id to customer_id
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the property belongs to the host
        $property = Property::where('user_id', $hostId)->findOrFail($validatedData['property_id']);

        Booking::create($validatedData);

        return redirect()->route('host.bookings.index')->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $hostId = auth()->id();
        // Ensure the booking's property belongs to the host
        $booking->load('property');
        if ($booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Host/Bookings/Show', ['booking' => $booking]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $hostId = auth()->id();
        // Ensure the booking's property belongs to the host
        $booking->load('property');
        if ($booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        $properties = Property::where('user_id', $hostId)->get();
        return Inertia::render('Host/Bookings/Edit', [
            'booking' => $booking,
            'properties' => $properties,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $hostId = auth()->id();
        // Ensure the booking's property belongs to the host
        $booking->load('property');
        if ($booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'customer_id' => 'required|exists:users,id', // Changed from user_id to customer_id
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the updated property also belongs to the host
        $property = Property::where('user_id', $hostId)->findOrFail($validatedData['property_id']);

        $booking->update($validatedData);

        return redirect()->route('host.bookings.index')->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $hostId = auth()->id();
        // Ensure the booking's property belongs to the host
        $booking->load('property');
        if ($booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $booking->delete();
        return redirect()->route('host.bookings.index')->with('success', 'Booking deleted successfully.');
    }
}