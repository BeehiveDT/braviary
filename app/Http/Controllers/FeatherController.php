<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Eagle;
use App\Feather;

class FeatherController extends Controller
{
    /**
     * 新增羽毛
     *
     * @param Request $request
     * @param string $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, $eagleId)
    {
        $eagle = Eagle::where('job_token', $eagleId)->get()->first();
        if (is_null($eagle)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Eagle Not Found'
                ]
            ], 404);
        }

        $feather = new Feather;
        $feather->eagle_id = $eagle->id;
        $feather->spot = $request->spot;
        $feather->save();
        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'New Feather grows successfully!',
            ]
        ], 200);
    }
}
