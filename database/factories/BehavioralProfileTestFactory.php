<?php

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BehavioralProfileTest>
 */
class BehavioralProfileTestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'person_id' => Person::factory(),
            'accuracy' => $this->faker->randomFloat(2, 0, 10),
            'collaboration' => $this->faker->randomFloat(2, 0, 10),
            'decision' => $this->faker->randomFloat(2, 0, 10),
            'initiative' => $this->faker->randomFloat(2, 0, 10),
            'skills' => json_encode([
                ['description' => 'php', 'value' => $this->faker->randomFloat(2, 0, 10)],
                ['description' => 'react', 'value' => $this->faker->randomFloat(2, 0, 10)],
            ]),
        ];
    }
}
