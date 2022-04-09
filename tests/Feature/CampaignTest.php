<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Models\Campaign;

class CampaignTest extends TestCase
{
    use DatabaseMigrations;

    public function test_get_all_campaigns()
    {
        $campaign = Campaign::factory()->create();
        $response = $this->json('GET', '/campaigns');
        $response->assertStatus(200);
    }

    //test create campaign
    public function test_create_campaign()
    {
        $campaign = Campaign::factory()->make();
        $response = $this->json('POST', '/campaigns', $campaign->toArray(), [
            'X-CSRF-TOKEN' => csrf_token(),
        ]);

        $response->assertStatus(201);
    }
}
