<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyAmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Property::all()->each(function ($property) {
            $amenities = \App\Models\Amenity::inRandomOrder()->limit(rand(1, 5))->get();
            $property->amenities()->attach($amenities);
        });
    }
}
