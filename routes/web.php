<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Location;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    $locations = Location::all()->map(function ($location) {
        $location->image_path = Storage::url($location->image_path);
        return $location;
    });
    return Inertia::render('welcome', [
        'locations' => $locations,
    ]);
})->name('home');

// Footer Pages
Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/legal', function () {
    return Inertia::render('Legal');
})->name('legal');

Route::get('/helpful-links', function () {
    return Inertia::render('HelpfulLinks');
})->name('helpful-links');

Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');

Route::get('/rental-management', function () {
    return Inertia::render('RentalManagement');
})->name('rental-management');

Route::get('/host-support', function () {
    return Inertia::render('HostSupport');
})->name('host-support');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/careers', function () {
    return Inertia::render('Careers');
})->name('careers');

Route::get('/press', function () {
    return Inertia::render('Press');
})->name('press');

Route::get('/contact-us', function () {
    return Inertia::render('ContactUs');
})->name('contact-us');

Route::get('/faqs', function () {
    return Inertia::render('FAQs');
})->name('faqs');

Route::get('/terms-and-conditions', function () {
    return Inertia::render('TermsAndConditions');
})->name('terms-and-conditions');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/cookie-policy', function () {
    return Inertia::render('CookiePolicy');
})->name('cookie-policy');

Route::get('/host-faq', function () {
    return Inertia::render('HostFAQ');
})->name('host-faq');

Route::get('/knowledge-base', function () {
    return Inertia::render('KnowledgeBase');
})->name('knowledge-base');

// Header Pages (Coming Soon)
Route::get('/flights', function () {
    return Inertia::render('Flights');
})->name('flights');

Route::get('/car-rentals', function () {
    return Inertia::render('CarRentals');
})->name('car-rentals');

Route::get('/attractions', function () {
    return Inertia::render('Attractions');
})->name('attractions');

Route::get('/airport-taxis', function () {
    return Inertia::render('AirportTaxis');
})->name('airport-taxis');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $userRole = auth()->user()->role;

        if ($userRole === 'customer') {
            return Inertia::render('Customer/Dashboard');
        }

        return Inertia::render('AdminHost/Dashboard', [
            'userRole' => $userRole,
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
use App\Http\Controllers\PropertyController; // Added

Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');

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
