<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Models\Campaign;
use Illuminate\Support\Facades\Validator;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $campaigns = Campaign::all();
        return response()->json($campaigns);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCampaignRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCampaignRequest $request)
    {

        //validate request
        $validator = Validator::make($request->all(), [
            'campaign_name' => 'required|string|max:255',
            'from_date' => 'required|date',
            'to_date' => 'required|date',
            'daily_budget' => 'required|numeric',
            'total_budget' => 'required|numeric',
            'creative_upload' => 'required',
        ]);


        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        } else {
            //create campaign and store in database
            $campaign = new Campaign();
            $campaign->campaign_name = $request->campaign_name;
            $campaign->from_date = $request->from_date;
            $campaign->to_date = $request->to_date;
            $campaign->daily_budget = $request->daily_budget;
            $campaign->total_budget = $request->total_budget;


            //upload multiple images
            if($request->hasFile('creative_upload')){
                $files = $request->file('creative_upload');
                $creative_upload = [];
                foreach($files as $file){
                    $filename = now().$file->getClientOriginalName();
                    $file->move(public_path().'/images/', $filename);
                    $creative_upload[] = $filename;
                }
                $campaign->creative_upload = json_encode($creative_upload);
            }

            $campaign->save();

            return response()->json($campaign, 201);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Campaign $campaign)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function edit(Campaign $campaign)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCampaignRequest  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Campaign $campaign)
    {
        //
        $campaign->delete();
        return response()->json(['message' => 'Campaign deleted successfully']);
    }
}
