<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/host.php';
require __DIR__.'/customer.php';

use App\Http\Controllers\DashboardController; // Added
use App\Http\Controllers\CouponValidationController; // Added
use App\Models\Property; // Added

// Admin Dashboard API Routes
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin/dashboard')->name('admin.dashboard.')->group(function () {
    Route::get('payments-monthly', [DashboardController::class, 'adminPaymentsMonthly'])->name('payments-monthly');
    Route::get('bookings-trend', [DashboardController::class, 'adminBookingsTrend'])->name('bookings-trend');
    Route::get('customers-count', [DashboardController::class, 'adminCustomersCount'])->name('customers-count');
    Route::get('revenues-monthly', [DashboardController::class, 'adminRevenuesMonthly'])->name('revenues-monthly');
    Route::get('booking-statuses', [DashboardController::class, 'adminBookingStatuses'])->name('booking-statuses'); // Added
    Route::get('recent-activities', [DashboardController::class, 'adminRecentActivities'])->name('recent-activities');
    Route::get('top-properties', [DashboardController::class, 'adminTopProperties'])->name('top-properties');
    Route::get('occupancy-rate', [DashboardController::class, 'adminOccupancyRate'])->name('occupancy-rate');
});

// Host Dashboard API Routes
Route::middleware(['auth', 'verified', 'role:host'])->prefix('host/dashboard')->name('host.dashboard.')->group(function () {
    Route::get('bookings', [DashboardController::class, 'hostBookings'])->name('bookings');
    Route::get('payments', [DashboardController::class, 'hostPayments'])->name('payments');
});

// Coupon Validation API Route
Route::get('/api/validate-coupon', CouponValidationController::class)->name('api.validate-coupon');

// Property Booking Demo Route (for testing coupon application)
Route::get('/book-property-demo/{property}', function (Property $property) {
    return Inertia::render('Customer/PropertyBookingDemo', [
        'property' => $property,
    ]);
})->name('book-property-demo');
