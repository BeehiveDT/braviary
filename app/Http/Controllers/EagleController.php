<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Eagle;
use App\User;

class EagleController extends Controller
{
    /**
     * 列出老鷹with最後一根羽毛
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
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
                'eagles' => [
                    'my_eagles' => $user->myEagles,
                    'link_eagles' => $user->linkEagles
                ]
            ]
        ], 200);
    }

    /**
     * 新增老鷹
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'frequency' => 'required|integer',
            'tolerance' => 'required|integer',
            'description' => 'filled|string|'
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

        $eagle = new Eagle;
        $eagle->user_id = $user->id;
        $eagle->job_token = $eagle->new_token;
        $eagle->name = $request->name;
        $eagle->frequency = $request->frequency;
        $eagle->tolerance = $request->tolerance;
        $eagle->description = $request->description ?? '';
        $eagle->save();
        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'New Eagle '.$eagle->name.' comes!',
                'job_token'=> $eagle->job_token
            ]
        ], 200);
    }

    /**
     * 修改老鷹
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $eagleId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'filled|string|max:255',
            'frequency' => 'filled|integer',
            'tolerance' => 'filled|integer',
            'description' => 'filled|string|'
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

        if ($user->is_admin) {
            // 如果是zoo keeper，就可以修改所有老鷹
            $eagle = Eagle::where('id', $eagleId)->first();
        } else {
            // 不然只能修改自己的
            $eagle = $user->myEagles->where('id', $eagleId)->first();
        }
        if (is_null($eagle)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Eagle Update Failed'
                ]
            ], 404);
        }

        $eagle->name = $request->name ?? $eagle->name;
        $eagle->frequency = $request->frequency ?? $eagle->frequency;
        $eagle->tolerance = $request->tolerance ?? $eagle->tolerance;
        $eagle->description = $request->description ?? '';
        $eagle->save();
        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Update Eagle '.$eagle->name.'\'s info succeed!'
            ]
        ], 200);
    }
    /**
     * 刪除老鷹
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, $eagleId)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'filled|string|max:255',
            'frequency' => 'filled|integer',
            'tolerance' => 'filled|integer',
            'description' => 'filled|string|'
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

        if ($user->is_admin) {
            // 如果是zoo keeper，就可以刪除所有老鷹
            $eagle = Eagle::where('id', $eagleId)->first();
        } else {
            // 不然只能刪除自己的
            $eagle = $user->myEagles->where('id', $eagleId)->first();
        }
        if (is_null($eagle)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Eagle Not Found'
                ]
            ], 404);
        }

        $eagle->delete();
        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Delete Eagle '.$eagle->name.'\'s info succeed!'
            ]
        ], 200);
    }
   /**
     * 給最後n根羽毛
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function feathers(Request $request, $eagleId)
    {
        $limit = $request->input('limit') ?? 1;
        if (filter_var($limit, FILTER_VALIDATE_INT) === false) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => 'Invalid limit'
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

        if ($user->is_admin) {
            // 如果是zoo keeper，就可以觀測所有老鷹
            $eagle = Eagle::where('id', $eagleId)->first();
        } else {
            // 如果是擁有者或是觀察者也可以看到
            $eagle = $user->myEagles->where('id', $eagleId)->first() ??
                     $user->linkEagles->where('id', $eagleId)->first();
        }

        if (is_null($eagle)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Eagle Not Found'
                ]
            ], 404);
        }

        if ($limit >0 && $limit <=6) {
            $feathers = $eagle->feathers->sortByDesc('created_at')
                        ->take($limit)->pluck('created_at')->map(function ($time) {
                            return $time->format('Y-m-d H:i:s');
                        });
        } else {
            $feathers = $eagle->feathers->sortByDesc('created_at')
                        ->take(1)->pluck('created_at')->map(function ($time) {
                            return $time->format('Y-m-d H:i:s');
                        });
        }

        return response()->json([
            'Success' => [
                'status' => 200,
                'feathers' => $feathers
            ]
        ], 200);
    }
}
