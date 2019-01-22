<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEaglesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eagles', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->index()->comment('使用者編號');
            $table->uuid('job_token')->comment('上傳用token');
            $table->string('name', 255)->comment('工作名稱');
            $table->unsignedInteger('frequency')->comment('訪問間隔(分數)');
            $table->unsignedTinyInteger('tolerance')->comment('允許沒到次數');
            $table->text('description')->nullable()->default('新手鷹(初始專案)')->commemt('專案說明');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eagles');
    }
}
