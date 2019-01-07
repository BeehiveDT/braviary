<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class APIToken
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
            if ($user) {
                return $next($request);
            }
        }

        return response()->json([
            'status' => 400,
            'type' => 'error',
            'message' => 'Bad request! Not a valid API request.'
        ], 400);

        return $next($request);
    }
}
