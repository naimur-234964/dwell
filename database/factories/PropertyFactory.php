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
            'title' => $this->faker->randomElement([
                'Cozy Apartment in the Heart of the City',
                'Spacious Villa with a Pool',
                'Modern Loft with a View',
                'Charming Cottage in the Countryside',
                'Luxury Penthouse with a Rooftop Terrace',
                'Stylish Studio in a Trendy Neighborhood',
                'Family-Friendly House with a Garden',
                'Rustic Cabin in the Woods',
                'Beachfront Bungalow with a Private Beach',
                'Historic Townhouse in the Old Town',
            ]),
            'short_description' => $this->faker->sentence(),
            'description' => $this->faker->paragraphs(3, true),
            'price_per_night' => $this->faker->randomFloat(2, 50, 1000),
            'number_of_guests' => $this->faker->numberBetween(1, 10),
            'number_of_bedrooms' => $this->faker->numberBetween(1, 5),
            'number_of_beds' => $this->faker->numberBetween(1, 7),
            'number_of_bathrooms' => $this->faker->numberBetween(1, 4),
            'is_available' => $this->faker->boolean(),
        ];
    }

    /**
     * Indicate that the property has a discount price.
     */
    public function withDiscount(): static
    {
        return $this->state(fn (array $attributes) => [
            'discount_price' => $this->faker->randomFloat(2, 40, 900),
        ]);
    }
}