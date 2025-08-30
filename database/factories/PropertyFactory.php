<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory()->host(), // Assuming a host user
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'price_per_night' => $this->faker->randomFloat(2, 50, 1000),
            'number_of_guests' => $this->faker->numberBetween(1, 10),
            'number_of_bedrooms' => $this->faker->numberBetween(1, 5),
            'number_of_beds' => $this->faker->numberBetween(1, 7),
            'number_of_bathrooms' => $this->faker->numberBetween(1, 4),
            'is_available' => $this->faker->boolean(),
        ];
    }
}
