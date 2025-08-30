<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;
use Inertia\Inertia;

class CustomerPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customerId = auth()->id();
        $payments = Payment::whereHas('booking', function ($query) use ($customerId) {
            $query->where('customer_id', $customerId);
        })->latest()->paginate(10);

        return Inertia::render('Customer/Payments/Index', ['payments' => $payments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customerId = auth()->id();
        $bookings = Booking::where('customer_id', $customerId)->get();
        return Inertia::render('Customer/Payments/Create', ['bookings' => $bookings]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customerId = auth()->id();
        $validatedData = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the booking belongs to the customer
        $booking = Booking::where('customer_id', $customerId)->findOrFail($validatedData['booking_id']);

        Payment::create($validatedData);

        return redirect()->route('customer.payments.index')->with('success', 'Payment created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $customerId = auth()->id();
        // Ensure the payment's booking belongs to the customer
        $payment->load('booking');
        if ($payment->booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Customer/Payments/Show', ['payment' => $payment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $customerId = auth()->id();
        // Ensure the payment's booking belongs to the customer
        $payment->load('booking');
        if ($payment->booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        $bookings = Booking::where('customer_id', $customerId)->get();
        return Inertia::render('Customer/Payments/Edit', [
            'payment' => $payment,
            'bookings' => $bookings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $customerId = auth()->id();
        // Ensure the payment's booking belongs to the customer
        $payment->load('booking');
        if ($payment->booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        // Ensure the updated booking also belongs to the customer
        $booking = Booking::where('customer_id', $customerId)->findOrFail($validatedData['booking_id']);

        $payment->update($validatedData);

        return redirect()->route('customer.payments.index')->with('success', 'Payment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $customerId = auth()->id();
        // Ensure the payment's booking belongs to the customer
        $payment->load('booking');
        if ($payment->booking->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $payment->delete();
        return redirect()->route('customer.payments.index')->with('success', 'Payment deleted successfully.');
    }
}