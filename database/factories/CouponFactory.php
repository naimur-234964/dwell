<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->word(),
            'type' => $this->faker->randomElement(['percentage', 'fixed']),
            'value' => $this->faker->randomFloat(2, 10, 100),
            'starts_at' => now(),
            'expires_at' => now()->addDays(30),
            'usage_limit' => $this->faker->numberBetween(10, 100),
            'min_cart_value' => $this->faker->randomFloat(2, 50, 200),
            'status' => 'active',
        ];
    }
}
