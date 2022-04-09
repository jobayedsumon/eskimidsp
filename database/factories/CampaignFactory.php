<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'campaign_name' => $this->faker->sentence,
            'from_date' => $this->faker->date,
            'to_date' => $this->faker->date,
            'total_budget' => $this->faker->randomFloat(2, 1, 10000),
            'daily_budget' => $this->faker->randomFloat(2, 1, 1000),
            'creative_upload' => json_encode([
                $this->faker->imageUrl(),
                $this->faker->imageUrl(),
                $this->faker->imageUrl()
            ]),
        ];
    }
}
