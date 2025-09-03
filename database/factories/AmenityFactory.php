<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amenity>
 */
class AmenityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Wi-Fi',
                'TV',
                'Kitchen',
                'Washer',
                'Free parking on premises',
                'Paid parking on premises',
                'Air conditioning',
                'Heating',
                'Dedicated workspace',
                'Pool',
                'Hot tub',
                'Patio',
                'BBQ grill',
                'Outdoor dining area',
                'Fire pit',
                'Indoor fireplace',
                'Piano',
                'Exercise equipment',
                'Lake access',
                'Beach access',
                'Ski-in/Ski-out',
                'Outdoor shower',
                'Smoke alarm',
                'First aid kit',
                'Fire extinguisher',
                'Carbon monoxide alarm',
            ]),
            'description' => $this->faker->paragraph(),
        ];
    }
}