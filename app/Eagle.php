<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Eagle extends Model
{
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
