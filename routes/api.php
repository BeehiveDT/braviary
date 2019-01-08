<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('auth')->group(function () {
    //註冊
    Route::post('/register', 'AuthController@register');
    //登入
    Route::post('/login', 'AuthController@login');
    //登出
    Route::middleware('agriweather.api')->group(function () {
        Route::post('/logout', 'AuthController@logout');
    });
});

Route::middleware('agriweather.api')->group(function () {
    // 列出使用者資訊
    Route::get('/me', 'UserController@show');
    // 更新使用者資訊
    Route::post('/me', 'UserController@update');
    // 列出老鷹with最新一根羽毛
    Route::get('/eagles', 'EagleController@show');
    // 新增老鷹
    Route::post('/eagles', 'EagleController@store');
    // 修改老鷹
    Route::post('/eagles/{eagleId}', 'EagleController@update');
    // 刪除老鷹
    Route::delete('/eagles/{eagleId}', 'EagleController@delete');
});

// 新增羽毛
Route::post('/feathers/{jobToken}', 'FeatherController@store');

Route::middleware('isadmin.api')->group(function () {
    //列出所有使用者
    //列出所有老鷹with最新一根羽毛
});
