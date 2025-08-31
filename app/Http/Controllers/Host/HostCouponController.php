<?php

namespace App\Http\Controllers\Host;

use App\Http\Controllers\Controller;
use App\Http\Requests\Host\HostCouponRequest;
use App\Models\Coupon;
use Inertia\Inertia;

class HostCouponController extends Controller
{
    public function index()
    {
        $coupons = auth()->user()->coupons()->paginate(10);
        return Inertia::render('Host/Coupons/Index', compact('coupons'));
    }

    public function create()
    {
        return Inertia::render('Host/Coupons/Create');
    }

    public function store(HostCouponRequest $request)
    {
        auth()->user()->coupons()->create($request->validated());
        return redirect()->route('host.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function show(Coupon $coupon)
    {
        // Ensure the coupon belongs to the authenticated host
        if ($coupon->user_id !== auth()->id()) {
            abort(403);
        }
        return Inertia::render('Host/Coupons/Show', compact('coupon'));
    }

    public function edit(Coupon $coupon)
    {
        // Ensure the coupon belongs to the authenticated host
        if ($coupon->user_id !== auth()->id()) {
            abort(403);
        }
        return Inertia::render('Host/Coupons/Edit', compact('coupon'));
    }

    public function update(HostCouponRequest $request, Coupon $coupon)
    {
        // Ensure the coupon belongs to the authenticated host
        if ($coupon->user_id !== auth()->id()) {
            abort(403);
        }
        $coupon->update($request->validated());
        return redirect()->route('host.coupons.index')->with('success', 'Coupon updated successfully.');
    }

    public function destroy(Coupon $coupon)
    {
        // Ensure the coupon belongs to the authenticated host
        if ($coupon->user_id !== auth()->id()) {
            abort(403);
        }
        $coupon->delete();
        return redirect()->route('host.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
