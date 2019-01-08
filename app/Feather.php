<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feather extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['id', 'eagle_id', 'updated_at',];
    /**
     * 取得所屬的 Eagle
     *
     * @return void
     */
    public function eagle()
    {
        return $this->belongsTo('App\Eagle', 'eagle_id');
    }
}
