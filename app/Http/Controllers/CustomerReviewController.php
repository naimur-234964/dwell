<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Inertia\Inertia;

class CustomerReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customerId = auth()->id();
        $reviews = Review::where('customer_id', $customerId)->latest()->paginate(10);

        return Inertia::render('Customer/Reviews/Index', ['reviews' => $reviews]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Customers typically create reviews after a booking, not via a standalone form.
        // This method might be removed or adapted based on actual UX.
        return Inertia::render('Customer/Reviews/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customerId = auth()->id();
        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        Review::create(array_merge($validatedData, ['customer_id' => $customerId]));

        return redirect()->route('customer.reviews.index')->with('success', 'Review created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        $customerId = auth()->id();
        if ($review->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Customer/Reviews/Show', ['review' => $review]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        $customerId = auth()->id();
        if ($review->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Customer/Reviews/Edit', ['review' => $review]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $customerId = auth()->id();
        if ($review->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $validatedData = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validatedData);

        return redirect()->route('customer.reviews.index')->with('success', 'Review updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $customerId = auth()->id();
        if ($review->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        $review->delete();
        return redirect()->route('customer.reviews.index')->with('success', 'Review deleted successfully.');
    }
}