<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class Eagle extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at',];

    /**
     * 取得所屬的 User
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    /**
     * 取得最新的 Feature
     *
     * @return void
     */
    public function lastFeather()
    {
        return $this->hasOne('App\Feather')->latest();
    }

    /**
     * 取得所有的 Feature
     *
     * @return void
     */
    public function feathers()
    {
        return $this->hasMany('App\Feather');
    }

    /**
     * Produce a new token for punch in
     *
     * @return uniqueid
     */
    protected function getNewTokenAttribute()
    {
        return (string)Uuid::generate();
    }
}
