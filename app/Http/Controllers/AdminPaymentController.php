<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment; // Changed from Property to Payment
use Inertia\Inertia;

class AdminPaymentController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::latest()->paginate(10); // Changed from properties to payments
        return Inertia::render('Admin/Payments/Index', ['payments' => $payments]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Payments/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Payment fields - TODO: Customize validation rules for Payment model
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        Payment::create($validatedData); // Changed from Property::create to Payment::create

        return redirect()->route('admin.payments.index')->with('success', 'Payment created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment) // Changed from Property $property to Payment $payment
    {
        return Inertia::render('Admin/Payments/Show', ['payment' => $payment]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment) // Changed from Property $property to Payment $payment
    {
        return Inertia::render('Admin/Payments/Edit', [
            'payment' => $payment, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment) // Changed from Property $property to Payment $payment
    {
        $validatedData = $request->validate([
            // Payment fields - TODO: Customize validation rules for Payment model
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $payment->update($validatedData); // Changed from $property->update to $payment->update

        return redirect()->route('admin.payments.index')->with('success', 'Payment updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment) // Changed from Property $property to Payment $payment
    {
        $payment->delete(); // Changed from $property->delete to $payment->delete
        return redirect()->route('admin.payments.index')->with('success', 'Payment deleted successfully.'); // Changed route and message
    }
}
