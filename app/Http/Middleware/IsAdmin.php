<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->wantsJson()) {
            return response()->json([
                'error' => [
                    'status' => 422,
                    'message' => 'Unprocessable Entity'
                ]
            ], 422);
        }

        if ($request->header('Authorization')) {
            $token = $request->header('Authorization');
            $user = User::where('api_token', $token)->first();
            if ($user->isadmin) {
                return $next($request);
            } else {
                return response()->json([
                    'status' => 400,
                    'type' => 'error',
                    'message' => 'Bad request! Not Admin.'
                ], 400);
            }
        } else {
            return response()->json([
                'status' => 400,
                'type' => 'error',
                'message' => 'Bad request! Without Authorization.'
            ], 400);
        }
    }
}
