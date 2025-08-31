<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Payment;
use App\Models\User;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function adminPaymentsMonthly()
    {
        $payments = Payment::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(amount) as total_amount')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($payments);
    }

    public function adminBookingsTrend()
    {
        $bookings = Booking::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as total_bookings')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($bookings);
    }

    public function adminCustomersCount()
    {
        $totalCustomers = User::where('role', 'customer')->count();
        return response()->json(['total_customers' => $totalCustomers]);
    }

    public function adminRevenuesMonthly()
    {
        $revenues = Payment::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(amount) as total_revenue')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($revenues);
    }

    public function adminBookingStatuses()
    {
        $bookingStatuses = Booking::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        return response()->json($bookingStatuses);
    }

    public function hostBookings(Request $request)
    {
        $hostId = auth()->id();
        $bookings = Booking::whereHas('property', function ($query) use ($hostId) {
                $query->where('user_id', $hostId);
            })
            ->with('property', 'customer') // Eager load property and customer details
            ->latest()
            ->paginate(10);

        return response()->json($bookings);
    }

    public function hostPayments(Request $request)
    {
        $hostId = auth()->id();
        $payments = Payment::whereHas('booking.property', function ($query) use ($hostId) {
                $query->where('user_id', $hostId);
            })
            ->with('booking.property', 'booking.customer') // Eager load related data
            ->latest()
            ->paginate(10);

        return response()->json($payments);
    }

    public function adminRecentActivities()
    {
        $recentBookings = Booking::with(['property:id,title', 'customer:id,name'])
            ->latest()
            ->take(5)
            ->get(['id', 'property_id', 'customer_id', 'check_in_date', 'check_out_date', 'status', 'created_at']);

        return response()->json($recentBookings);
    }
}