<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feather extends Model
{
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
