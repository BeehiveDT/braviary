<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserEaglesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_eagle', function (Blueprint $table) {
            $table->unsignedInteger('user_id')->comment('使用者編號');
            $table->unsignedInteger('eagle_id')->comment('工作編號');
            $table->timestamps();
            $table->unique(['user_id', 'eagle_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_eagle');
    }
}
