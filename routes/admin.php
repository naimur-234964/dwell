<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminLocationController; // Added

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
        ]);
    })->name('dashboard');

    // Admin specific routes
    Route::get('dashboard/properties', function () {
        return Inertia::render('Admin/Properties/Index');
    })->name('properties');

    Route::get('dashboard/properties/create', function () {
        return Inertia::render('Admin/Properties/Create'); // Assuming you'll create this page
    })->name('properties.create');

    Route::resource('properties', App\Http\Controllers\AdminPropertyController::class);
    Route::resource('locations', AdminLocationController::class); // Added
    Route::resource('addresses', App\Http\Controllers\AdminAddressController::class);
    Route::resource('amenities', App\Http\Controllers\AdminAmenityController::class);
    Route::resource('bookings', App\Http\Controllers\AdminBookingController::class);
    Route::resource('payments', App\Http\Controllers\AdminPaymentController::class);
    Route::resource('property-images', App\Http\Controllers\AdminPropertyImageController::class);
    Route::resource('reviews', App\Http\Controllers\AdminReviewController::class);
    Route::resource('users', App\Http\Controllers\AdminUserController::class);
});
