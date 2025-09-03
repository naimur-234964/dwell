<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a specific admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create hosts and customers
        $hosts = User::factory()->host()->count(5)->create();
        $customers = User::factory()->count(14)->create();

        // Create amenities
        $amenities = \App\Models\Amenity::factory()->count(10)->create();

        // Create properties and attach amenities
        $properties = \App\Models\Property::factory()->count(20)->make()->each(function ($property) use ($hosts) {
            $property->user_id = $hosts->random()->id;
            $property->save();

            // Create an address for each property
            \App\Models\Address::factory()->make()->each(function ($address) use ($property) {
                $address->property_id = $property->id;
                $address->save();
            });

            // Attach 1 to 5 random amenities to each property
            $randomAmenities = $amenities->random(rand(1, 5));
            $property->amenities()->attach($randomAmenities);
        });

        // Create coupons
        \App\Models\Coupon::factory()->count(5)->create();

        // Create bookings, reviews, and payments
        $bookings = \App\Models\Booking::factory()->count(50)->make()->each(function ($booking) use ($properties, $customers) {
            $booking->property_id = $properties->random()->id;
            $booking->customer_id = $customers->random()->id;
            $booking->save();

            // Create a review for each booking
            \App\Models\Review::factory()->make()->each(function ($review) use ($booking) {
                $review->property_id = $booking->property_id;
                $review->customer_id = $booking->customer_id;
                $review->save();
            });

            // Create a payment for each booking
            \App\Models\Payment::factory()->make()->each(function ($payment) use ($booking) {
                $payment->booking_id = $booking->id;
                $payment->customer_id = $booking->customer_id;
                $payment->save();
            });
        });
    }
}