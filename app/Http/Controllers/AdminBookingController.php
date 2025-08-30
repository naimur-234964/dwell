<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking; // Changed from Property to Booking
use Inertia\Inertia;

class AdminBookingController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::latest()->paginate(10); // Changed from properties to bookings
        return Inertia::render('Admin/Bookings/Index', ['bookings' => $bookings]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Bookings/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Booking fields - TODO: Customize validation rules for Booking model
            'property_id' => 'required|exists:properties,id',
            'user_id' => 'required|exists:users,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        Booking::create($validatedData); // Changed from Property::create to Booking::create

        return redirect()->route('admin.bookings.index')->with('success', 'Booking created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking) // Changed from Property $property to Booking $booking
    {
        return Inertia::render('Admin/Bookings/Show', ['booking' => $booking]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking) // Changed from Property $property to Booking $booking
    {
        return Inertia::render('Admin/Bookings/Edit', [
            'booking' => $booking, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking) // Changed from Property $property to Booking $booking
    {
        $validatedData = $request->validate([
            // Booking fields - TODO: Customize validation rules for Booking model
            'property_id' => 'required|exists:properties,id',
            'user_id' => 'required|exists:users,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        $booking->update($validatedData); // Changed from $property->update to $booking->update

        return redirect()->route('admin.bookings.index')->with('success', 'Booking updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking) // Changed from Property $property to Booking $booking
    {
        $booking->delete(); // Changed from $property->delete to $booking->delete
        return redirect()->route('admin.bookings.index')->with('success', 'Booking deleted successfully.'); // Changed route and message
    }
}