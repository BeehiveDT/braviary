<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Eagle;
use App\User;

class EagleController extends Controller
{
    /**
     * 列出老鷹
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

        $output = array('eagles' => [
                        'my_eagles' => $user->myEagles,
                        'link_eagles' => $user->linkEagles
                        ]);
        return($output);
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
            'description' => 'nullable|string|'
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
        $eagle->description = $request->description;
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
            'description' => 'nullable|string|'
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
            // 如果是zoo keeper，就可以修改任一隻老鷹
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
        $eagle->description = $request->has('description') ? $request->description : $eagle->description;
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
            // 如果是zoo keeper，就可以刪除任一隻老鷹
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
     * 給最後n根羽毛，跳過m跟
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function feathers(Request $request, $eagleId)
    {
        $limit = $request->input('limit') ?? 1;
        $skip = $request->input('skip') ?? 10;
        if (filter_var($limit, FILTER_VALIDATE_INT) === false ||
            filter_var($skip, FILTER_VALIDATE_INT) === false) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => 'Invalid limit or skip'
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
            // 如果是zoo keeper，就可以觀測任一隻老鷹
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

        $limit = $limit >0 && $limit <=10 ? $limit : 10;
        $feathers = $eagle->feathers->sortByDesc('created_at')->slice($skip)->take($limit);
        

        return(array_values($feathers->toArray()));
    }

    /**
     * 給每一支老鷹最後10根羽毛
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function batchFeathers(Request $request)
    {
        $eagles = $request->input('eagles');
        $eagle_list = explode(',', $eagles);

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
            // 如果是zoo keeper，就可以觀測任一隻老鷹
            $eagles = Eagle::wherein('id', $eagle_list)->get();
        } else {
            // 如果是擁有者或是觀察者也可以看到
            $myeagles = $user->myEagles->wherein('id', $eagle_list);
            $linkEagles = $user->linkEagles->wherein('id', $eagle_list);
            $eagles = $myeagles->merge($linkEagles);
        }

        $output = [];
        foreach ($eagles as $eagle) {
            $output[$eagle->id] = $eagle->feathers->sortByDesc('created_at')->take(10)->pluck('created_at')->map(function ($time) {
                return $time->format('Y-m-d H:i:s');
            });
        };

        return($output);
    }
}
