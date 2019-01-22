<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Eagle;
use App\User;

class AdminController extends Controller
{
    /**
     * 列出所有使用者
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function users(Request $request)
    {
        $token = $request->header('Authorization');
        $user = User::where('api_token', $token)->first();
        if (is_null($user)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'User Not Found'
                ]
            ], 404);
        }

        return response()->json([
            'Success' => [
                'status' => 200,
                'users' => User::all()
            ]
        ], 200);
    }


    /**
     * 列出所有老鷹with最後一根羽毛
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function eagles(Request $request)
    {
        $token = $request->header('Authorization');
        $user = User::where('api_token', $token)->first();
        if (is_null($user)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'User Not Found'
                ]
            ], 404);
        }

        return response()->json([
            'Success' => [
                'status' => 200,
                'eagles' => Eagle::all()->makeHidden(['job_token'])
            ]
        ], 200);
    }
}
