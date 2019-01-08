<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;

class UserController extends Controller
{
    /**
     * 列出使用者資料
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'filled|string|max:16',
            'password' => 'filled|string|min:6'
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

        return response()->json([
            'Success' => [
                'status' => 200,
                'name' => $user->name
            ]
        ], 200);
    }

    /**
     * 更新使用者資料
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'filled|string|max:16',
            'password' => 'filled|string|min:6'
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

        $user->name = $request->name ?? $user->name;
        $user->password = bcrypt($request->password) ?? $user->password;
        $user->save();
        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Successfully updated'
            ]
        ], 200);
    }
}
