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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
             $table->id();
            $table->string('tracking_number')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'released', 'archived', 'overdue']);
            $table->date('received_date');
            $table->date('release_date')->nullable();
            $table->date('due_date')->nullable();
            $table->text('last_transaction')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('category');
            $table->foreignId('received_by')->constrained('users');
            $table->foreignId('released_by')->nullable()->constrained('users');
            $table->string('qr_code')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
