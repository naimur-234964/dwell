<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Property; // Import Property model
use App\Models\Address; // Import Address model

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure all properties have an address
        Property::all()->each(function ($property) {
            if (!$property->address) {
                Address::factory()->create([
                    'property_id' => $property->id,
                ]);
            }
        });
    }
}
