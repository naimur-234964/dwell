<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Coupon;
use App\Models\Property;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CouponValidationController extends Controller
{
    public function __invoke(Request $request)
    {
        Log::info('Coupon validation request received', $request->all());

        try {
            $request->validate([
                'coupon_code' => 'required|string',
                'property_id' => 'required|exists:properties,id',
                'check_in_date' => 'required|date',
                'check_out_date' => 'required|date|after:check_in_date',
            ]);

            $coupon = Coupon::where('code', $request->coupon_code)->first();

            if (!$coupon) {
                Log::warning('Coupon not found', ['coupon_code' => $request->coupon_code]);
                return response()->json(['message' => 'Coupon not found.'], 404);
            }

            if ($coupon->status === 'inactive') {
                Log::warning('Coupon inactive', ['coupon_id' => $coupon->id]);
                return response()->json(['message' => 'Coupon is inactive.'], 400);
            }

            $now = Carbon::now();
            if ($coupon->starts_at && $now->lt($coupon->starts_at)) {
                Log::warning('Coupon not yet active', ['coupon_id' => $coupon->id]);
                return response()->json(['message' => 'Coupon is not yet active.'], 400);
            }

            if ($coupon->expires_at && $now->gt($coupon->expires_at)) {
                Log::warning('Coupon expired', ['coupon_id' => $coupon->id]);
                return response()->json(['message' => 'Coupon has expired.'], 400);
            }

            if ($coupon->usage_limit !== null && $coupon->used_count >= $coupon->usage_limit) {
                Log::warning('Coupon usage limit reached', ['coupon_id' => $coupon->id]);
                return response()->json(['message' => 'Coupon usage limit reached.'], 400);
            }

            $property = Property::findOrFail($request->property_id);

            // Check if coupon is specific to a host and matches the property's host
            if ($coupon->user_id !== null && $coupon->user_id !== $property->user_id) {
                Log::warning('Coupon not valid for this property', ['coupon_id' => $coupon->id, 'property_id' => $property->id]);
                return response()->json(['message' => 'Coupon is not valid for this property.'], 400);
            }

            $checkIn = Carbon::parse($request->check_in_date);
            $checkOut = Carbon::parse($request->check_out_date);
            $numberOfNights = $checkIn->diffInDays($checkOut);

            $pricePerNight = $property->discount_price ?? $property->price_per_night;
            $originalPrice = $pricePerNight * $numberOfNights;

            if ($coupon->min_cart_value !== null && $originalPrice < $coupon->min_cart_value) {
                Log::warning('Minimum cart value not met', ['coupon_id' => $coupon->id, 'original_price' => $originalPrice]);
                return response()->json(['message' => 'Minimum cart value not met for this coupon.'], 400);
            }

            $discountedPrice = $originalPrice;
            if ($coupon->type === 'fixed') {
                $discountedPrice = max(0, $originalPrice - $coupon->value);
            } elseif ($coupon->type === 'percentage') {
                $discountedPrice = $originalPrice * (1 - ($coupon->value / 100));
            }

            Log::info('Coupon applied successfully', ['coupon_id' => $coupon->id]);

            return response()->json([
                'message' => 'Coupon applied successfully.',
                'coupon_id' => $coupon->id,
                'original_price' => $originalPrice,
                'discounted_price' => round($discountedPrice, 2),
                'discount_amount' => round($originalPrice - $discountedPrice, 2),
            ]);
        } catch (\Exception $e) {
            Log::error('Error applying coupon', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
        }
    }
}