<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserEagle extends Model
{
    protected $table = 'user_eagle';
    public function users()
    {
        return $this->belongsTo('App\User');
    }

    public function eagles()
    {
        return $this->belongsTo('App\Eagle');
    }
}
