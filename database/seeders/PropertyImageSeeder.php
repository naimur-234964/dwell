<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Property::all()->each(function ($property) {
            \App\Models\PropertyImage::factory()->count(3)->create([
                'property_id' => $property->id,
            ]);
        });
    }
}
