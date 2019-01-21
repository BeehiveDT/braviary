<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eagle extends Model
{
    use SoftDeletes;
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['user_id', 'created_at', 'updated_at', 'deleted_at', 'pivot'];

    /**
     * 取得所屬的 owner
     *
     * @return void
     */
    public function owner()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    /**
     * 取得所屬的 User
     *
     * @return void
     */
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_eagle')->withTimestamps();
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

    protected $dates = ['deleted_at'];
}
