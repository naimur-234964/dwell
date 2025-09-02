<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Coupon;
use App\Models\Property;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
    public function create(Property $property)
    {
        $property->load('address', 'propertyImages');
        $property->image_path = $property->propertyImages->first() ? Storage::url($property->propertyImages->first()->image_path) : null;
        return Inertia::render('Customer/Bookings/Create', ['property' => $property]);
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
            'phone_no' => 'required|string|max:20',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|string|max:255',
            'coupon_id' => 'nullable|exists:coupons,id',
        ]);

        $finalPrice = $validatedData['total_price'];
        $couponId = null;
        $advancePaymentAmount = round($finalPrice * 0.10, 2);

        if (isset($validatedData['coupon_id'])) {
            $coupon = Coupon::find($validatedData['coupon_id']);
            $property = Property::findOrFail($validatedData['property_id']);

            // Re-validate coupon on backend for security
            if (!$coupon || $coupon->status === 'inactive' || ($coupon->starts_at && Carbon::now()->lt($coupon->starts_at)) || ($coupon->expires_at && Carbon::now()->gt($coupon->expires_at)) || ($coupon->usage_limit !== null && $coupon->used_count >= $coupon->usage_limit) || ($coupon->user_id !== null && $coupon->user_id !== $property->user_id)) {
                return redirect()->back()->withErrors(['coupon_code' => 'Invalid or expired coupon.']);
            }

            $checkIn = Carbon::parse($validatedData['check_in_date']);
            $checkOut = Carbon::parse($validatedData['check_out_date']);
            $numberOfNights = $checkIn->diffInDays($checkOut);
            $originalPrice = $property->price_per_night * $numberOfNights;

            if ($coupon->min_cart_value !== null && $originalPrice < $coupon->min_cart_value) {
                return redirect()->back()->withErrors(['coupon_code' => 'Minimum cart value not met for this coupon.']);
            }

            if ($coupon->type === 'fixed') {
                $finalPrice = max(0, $originalPrice - $coupon->value);
            } elseif ($coupon->type === 'percentage') {
                $finalPrice = $originalPrice * (1 - ($coupon->value / 100));
            }

            $coupon->increment('used_count');
            $couponId = $coupon->id;
        }

        Booking::create(array_merge($validatedData, [
            'customer_id' => $customerId,
            'total_price' => round($finalPrice, 2),
            'phone_no' => $validatedData['phone_no'],
            'advance_payment_amount' => $advancePaymentAmount,
            'advance_payment_status' => 'pending',
            'coupon_id' => $couponId,
        ]));

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