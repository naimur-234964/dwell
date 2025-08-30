<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
        ]);
    })->name('dashboard');

    // Customer specific routes
    Route::get('dashboard/bookings', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
            'pageContent' => 'customer.bookings',
        ]);
    })->name('bookings');
});
