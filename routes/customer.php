<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified', 'role:customer'])->name('customer.')->group(function () {
    Route::post('/bookings', [App\Http\Controllers\CustomerBookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}/payment', [App\Http\Controllers\CustomerBookingController::class, 'showPaymentForm'])->name('bookings.payment');
    Route::post('/bookings/{booking}/process-payment', [App\Http\Controllers\CustomerBookingController::class, 'processPayment'])->name('bookings.process-payment');
});
