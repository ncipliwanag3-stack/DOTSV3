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
        //
        Schema::create('documents', function (Blueprint $table) {
            //$table->id();
            //$table->string('tracking_no')->unique();
            //$table->string('title');
            //$table->string('type');
            //$table->date('date_received');
            //$table->string('urgency')->nullable();
            //$table->text('description')->nullable();
            //$table->string('file_path')->nullable();
            //$table->string('file_type')->nullable();
            //$table->integer('file_size')->nullable();
            //$table->json('recipients')->nullable();
            //$table->json('email_status')->nullable();
            //$table->timestamp('released_at')->nullable();
            //$table->timestamp('archived_at')->nullable();
            //$table->foreignId('created_by')->constrained('users');
            //$table->string('category');
            //$table->string('office_origin');
            //$table->string('recipient');
            //$table->date('received_date');
            //$table->timestamp('release_date')->nullable();
            //$table->date('due_date')->nullable();
            //$table->enum('status', ['pending', 'released', 'archived', 'overdue'])->default('pending');
            //$table->boolean('is_urgent')->default(false);
            //$table->string('last_transaction')->nullable();
            //$table->timestamps();
            //$table->softDeletes();
            $table->id();
            $table->string('tracking_number')->unique();
            $table->string('title');
            $table->string('type');
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
            
            //$table->foreign('created_by')->references('id')->on('users');
            
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::dropIfExists('documents');
    }
};
