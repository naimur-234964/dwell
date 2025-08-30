<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review; // Changed from Property to Review
use Inertia\Inertia;

class AdminReviewController extends Controller // Changed class name
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::latest()->paginate(10); // Changed from properties to reviews
        return Inertia::render('Admin/Reviews/Index', ['reviews' => $reviews]); // Changed path and prop name
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Reviews/Create'); // Changed path
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Review fields - TODO: Customize validation rules for Review model
            'property_id' => 'required|exists:properties,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        Review::create($validatedData); // Changed from Property::create to Review::create

        return redirect()->route('admin.reviews.index')->with('success', 'Review created successfully.'); // Changed route and message
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review) // Changed from Property $property to Review $review
    {
        return Inertia::render('Admin/Reviews/Show', ['review' => $review]); // Changed path and prop name
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review) // Changed from Property $property to Review $review
    {
        return Inertia::render('Admin/Reviews/Edit', [
            'review' => $review, // Changed prop name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review) // Changed from Property $property to Review $review
    {
        $validatedData = $request->validate([
            // Review fields - TODO: Customize validation rules for Review model
            'property_id' => 'required|exists:properties,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validatedData); // Changed from $property->update to $review->update

        return redirect()->route('admin.reviews.index')->with('success', 'Review updated successfully.'); // Changed route and message
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review) // Changed from Property $property to Review $review
    {
        $review->delete(); // Changed from $property->delete to $review->delete
        return redirect()->route('admin.reviews.index')->with('success', 'Review deleted successfully.'); // Changed route and message
    }
}
