<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

        return (User::all());
    }

    /**
     * 列出所有老鷹
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

        return (Eagle::all()->makeHidden(['job_token']));
    }

    /**
     * 升等使用者
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upgrade(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'target_mail' => 'required|string|email|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => $validator->messages()
                ]
            ], 422);
        }

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

        $object = User::where('email', $request->target_mail)->first();
        if (is_null($object)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Target Not Found'
                ]
            ], 404);
        }
        
        $object->is_admin = '1';
        $object->save();

        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Upgrade succeed!',
            ]
        ], 200);
    }

}
