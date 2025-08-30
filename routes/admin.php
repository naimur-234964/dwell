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
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
            'pageContent' => 'admin.properties',
        ]);
    })->name('properties');

    Route::get('dashboard/properties/create', function () {
        return Inertia::render('dashboard', [
            'userRole' => auth()->user()->role,
            'pageContent' => 'admin.properties.create',
        ]);
    })->name('properties.create');
});
