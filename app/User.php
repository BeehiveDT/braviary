<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * 取得所有的 Eagle
     *
     * @return void
     */
    public function eagles()
    {
        return $this->hasMany('App\Eagle');
    }

    /**
     * Produce a new token for login
     *
     * @return uniqueid
     */
    protected function getNewTokenAttribute()
    {
        return uniqid(base64_encode(str_random(60)));
    }
}
