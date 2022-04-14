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
        $campaign = Campaign::factory(10)->create();
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

    //test update campaign
    public function test_update_campaign()
    {
        $campaign = Campaign::factory()->create();
        $response = $this->json('PUT', '/campaigns/' . $campaign->id, $campaign->toArray(), [
            'X-CSRF-TOKEN' => csrf_token(),
        ]);

        $response->assertStatus(201);
    }

    //test single campaign
    public function test_show_single_campaign()
    {
        $campaign = Campaign::factory()->create();
        $response = $this->json('GET', '/campaigns/' . $campaign->id);
        $response->assertStatus(200);
    }

    //test delete campaign
    public function test_delete_campaign()
    {
        $campaign = Campaign::factory()->create();
        $response = $this->json('DELETE', '/campaigns/' . $campaign->id);
        $response->assertStatus(200);
    }
}
