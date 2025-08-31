<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminCouponRequest;
use App\Models\Coupon;
use Inertia\Inertia;

class AdminCouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::paginate(10);
        return Inertia::render('Admin/Coupons/Index', compact('coupons'));
    }

    public function create()
    {
        return Inertia::render('Admin/Coupons/Create');
    }

    public function store(AdminCouponRequest $request)
    {
        Coupon::create($request->validated());
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function show(Coupon $coupon)
    {
        return Inertia::render('Admin/Coupons/Show', compact('coupon'));
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('Admin/Coupons/Edit', compact('coupon'));
    }

    public function update(AdminCouponRequest $request, Coupon $coupon)
    {
        $coupon->update($request->validated());
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon updated successfully.');
    }

    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('success', 'Coupon deleted successfully.');
    }
}
