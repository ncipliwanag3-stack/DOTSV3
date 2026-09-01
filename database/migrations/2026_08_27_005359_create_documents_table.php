<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('documents')) {
            return;
        }

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique();
            $table->string('title');
            $table->string('type');
            $table->string('origin_type')->nullable();
            $table->string('last_transaction')->nullable();
            $table->date('date_received');
            $table->enum('status', ['Pending', 'Processing', 'For Release', 'Released', 'Archived', 'Terminal', 'Overdue']);
            $table->enum('urgency', ['Low', 'Medium', 'High', 'Urgent']);
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->unsignedBigInteger('created_by');
            $table->timestamp('released_at')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->timestamp('delete_at')->nullable();
            $table->softDeletes();
            $table->timestamp('release_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('documents')) {
            Schema::drop('documents');
        }
    }
};
