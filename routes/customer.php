<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified', 'role:customer'])->name('customer.')->group(function () {
    Route::post('/bookings', [App\Http\Controllers\CustomerBookingController::class, 'store'])->name('bookings.store');
});
