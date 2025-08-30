<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Inertia\Inertia;

class CustomerBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customerId = auth()->id();
        $bookings = Booking::where('customer_id', $customerId)->latest()->paginate(10);

        return Inertia::render('Customer/Bookings/Index', ['bookings' => $bookings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Customers typically don't create bookings directly via a form like this
        // Bookings are usually made through the property listing page.
        // This method might be removed or adapted based on actual UX.
        return Inertia::render('Customer/Bookings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customerId = auth()->id();
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        Booking::create(array_merge($validatedData, ['customer_id' => $customerId]));

        return redirect()->route('customer.bookings.index')->with('success', 'Booking created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $customerId = auth()->id();
        if ($booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Customer/Bookings/Show', ['booking' => $booking]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        $customerId = auth()->id();
        if ($booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Customer/Bookings/Edit', ['booking' => $booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $customerId = auth()->id();
        if ($booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
        ]);

        $booking->update($validatedData);

        return redirect()->route('customer.bookings.index')->with('success', 'Booking updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $customerId = auth()->id();
        if ($booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $booking->delete();
        return redirect()->route('customer.bookings.index')->with('success', 'Booking deleted successfully.');
    }
}