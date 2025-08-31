<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookings = \App\Models\Booking::all();

        foreach ($bookings as $booking) {
            \App\Models\Payment::factory()->create([
                'booking_id' => $booking->id,
                'customer_id' => $booking->customer_id,
                'amount' => $booking->total_price,
                'created_at' => $booking->created_at,
                'updated_at' => $booking->created_at,
            ]);
        }
    }
}
