<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Eagle;
use App\User;
use App\UserEagle;

class UserEagleController extends Controller
{
    /**
     * 新增觀察者
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function link(Request $request, $eagleId)
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

        if ($user->is_admin) {
            // 如果是zoo keeper，就可以幫所有老鷹新增觀察者
            $eagle = Eagle::where('id', $eagleId)->first();
        } else {
            // 不然只能幫自己的老鷹新增觀察者
            $eagle = $user->myEagles->where('id', $eagleId)->first();
        }
        if (is_null($eagle)) {
            return response()->json([
                'error' => [
                    'status' => 404,
                    'message' => 'Eagle Link Failed'
                ]
            ], 404);
        }

        $relation = UserEagle::where('user_id', $object->id)
                     ->where('eagle_id', $eagle->id)->first();

        if (is_null($relation)) {
            $eagle->users()->attach($object->id);
        }

        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Eagle Linked Successfully!',
            ]
        ], 200);
    }

    /**
     * 刪除觀察者
     *
     * @param Request $request
     * @param integer $eagleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function unlink(Request $request, $eagleId)
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

        if ($object->id == $user->id || $user->is_admin) {
            // 如果要取消自己的，或是zookeeper，老鷹擁有者是誰不受限
            $eagle = Eagle::where('id', $eagleId)->first();
            if (is_null($eagle)) {
                return response()->json([
                    'error' => [
                        'status' => 404,
                        'message' => 'Eagle Link Failed'
                    ]
                ], 404);
            }
            $relation = UserEagle::where('user_id', $object->id)
                     ->where('eagle_id', $eagle->id)->first();
        } else {
            // 如果要取消別人的，必須擁有這隻老鷹
            $eagle = $user->myEagles->where('id', $eagleId)->first();
            if (is_null($eagle)) {
                return response()->json([
                    'error' => [
                        'status' => 404,
                        'message' => 'Eagle Link Failed'
                    ]
                ], 404);
            }
            $relation = UserEagle::where('user_id', $object->id)
            ->where('eagle_id', $eagle->id)->first();
        }

        if (is_null($relation)) {
            return response()->json([
                'status' => 400,
                'type' => 'error',
                'message' => 'Bad request!'
            ], 400);
        }
        $eagle->users()->detach($object->id);

        return response()->json([
            'Success' => [
                'status' => 200,
                'message' => 'Eagle Unlinked Successfully!',
            ]
        ], 200);
    }
}
