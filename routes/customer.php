<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified', 'role:customer'])->name('customer.')->group(function () {
    Route::post('/bookings', [App\Http\Controllers\CustomerBookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}/payment', [App\Http\Controllers\CustomerBookingController::class, 'showPaymentForm'])->name('bookings.payment');
    Route::post('/bookings/{booking}/process-payment', [App\Http\Controllers\CustomerBookingController::class, 'processPayment'])->name('bookings.process-payment');
    Route::get('/bookings/{booking}/congratulations', [App\Http\Controllers\CustomerBookingController::class, 'congratulations'])->name('bookings.congratulations');
    Route::get('/bookings/{booking}', [App\Http\Controllers\CustomerBookingController::class, 'show'])->name('bookings.show');
});
