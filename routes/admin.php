<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});
