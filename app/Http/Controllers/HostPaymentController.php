<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;
use App\Models\Property;
use Inertia\Inertia;

class HostPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hostId = auth()->id();
        // Fetch payments associated with the host's properties
        $payments = Payment::whereHas('booking.property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->latest()->paginate(10);

        return Inertia::render('Host/Payments/Index', ['payments' => $payments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hostId = auth()->id();
        $bookings = Booking::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->get();
        return Inertia::render('Host/Payments/Create', ['bookings' => $bookings]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hostId = auth()->id();
        $validatedData = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the booking belongs to the host's property
        $booking = Booking::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->findOrFail($validatedData['booking_id']);

        Payment::create($validatedData);

        return redirect()->route('host.payments.index')->with('success', 'Payment created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $hostId = auth()->id();
        // Ensure the payment's booking's property belongs to the host
        $payment->load('booking.property');
        if ($payment->booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Host/Payments/Show', ['payment' => $payment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $hostId = auth()->id();
        // Ensure the payment's booking's property belongs to the host
        $payment->load('booking.property');
        if ($payment->booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }
        $bookings = Booking::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->get();
        return Inertia::render('Host/Payments/Edit', [
            'payment' => $payment,
            'bookings' => $bookings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $hostId = auth()->id();
        // Ensure the payment's booking's property belongs to the host
        $payment->load('booking.property');
        if ($payment->booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the updated booking also belongs to the host's property
        $booking = Booking::whereHas('property', function ($query) use ($hostId) {
            $query->where('user_id', $hostId);
        })->findOrFail($validatedData['booking_id']);

        $payment->update($validatedData);

        return redirect()->route('host.payments.index')->with('success', 'Payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $hostId = auth()->id();
        // Ensure the payment's booking's property belongs to the host
        $payment->load('booking.property');
        if ($payment->booking->property->user_id !== $hostId) {
            abort(403, 'Unauthorized action.');
        }

        $payment->delete();
        return redirect()->route('host.payments.index')->with('success', 'Payment deleted successfully.');
    }
}
