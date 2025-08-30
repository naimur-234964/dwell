<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:host'])->prefix('host')->name('host.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
        ]);
    })->name('dashboard');

    // Host specific routes
    Route::get('dashboard/properties', function () {
        return Inertia::render('Host/Properties/Index');
    })->name('properties');

    Route::resource('properties', App\Http\Controllers\HostPropertyController::class);
    Route::resource('bookings', App\Http\Controllers\HostBookingController::class);
    Route::resource('amenities', App\Http\Controllers\HostAmenityController::class);
    Route::resource('addresses', App\Http\Controllers\HostAddressController::class);
    Route::resource('payments', App\Http\Controllers\HostPaymentController::class);
});
