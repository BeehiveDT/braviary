<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;

class AuthController extends Controller
{
    /**
     * 註冊新的使用者
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => $validator->messages()
                ]
            ], 422);
        }

        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        $user->api_token = $user->new_token;
        if ($user->save()) {
            return response()->json([
                'status' => 200,
                'message'=> "Successfully registered",
                'name' => $user->name,
                'access_token' => $user->api_token,
            ], 200);
        }
    }

    /**
     * 取得使用者新的 token
     * 以原來使用者登入的方式作為 token 更新的方法
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => $validator->messages()
                ]
            ], 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->new_token;
            $user->api_token = $token;
            $user->save();
            return response()->json([
                'message' => "Successfully logged in",
                'access_token' => $user->api_token,
            ], 200);
        } else {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => "Wrong Password"
                ]
            ], 422);
        }
    }

    /**
     * 清空使用者的 token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $token = $request->header('Authorization');
        $user = User::where('api_token', $token)->first();
        $user->api_token = null;
        $user->save();

        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Successfully logged out'
            ]
        ], 200);
    }
}
