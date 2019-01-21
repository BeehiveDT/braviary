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
        'password', 'id', 'is_admin',  'created_at', 'updated_at', 'api_token',
    ];

    /**
     * 取得管理的 Eagle
     *
     * @return void
     */
    public function myEagles()
    {
        return $this->hasMany('App\Eagle');
    }

    /**
     * 取得可看到的 Eagles
     *
     * @return void
     */
    public function linkEagles()
    {
        return $this->belongsToMany('App\Eagle', 'user_eagle')->withTimestamps();
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
