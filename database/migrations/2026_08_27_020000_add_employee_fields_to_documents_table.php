<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            if (!Schema::hasColumn('documents', 'first_name')) {
                $table->string('first_name')->nullable()->after('last_transaction');
            }
            if (!Schema::hasColumn('documents', 'fullname')) {
                $table->string('fullname')->nullable()->after('last_transaction');
            }
            if (!Schema::hasColumn('documents', 'division_code')) {
                $table->string('division_code')->nullable()->after('fullname');
            }
            if (!Schema::hasColumn('documents', 'division')) {
                $table->string('division')->nullable()->after('division_code');
            }
            if (!Schema::hasColumn('documents', 'assigned_to')) {
                $table->string('assigned_to')->nullable()->after('division');
            }
            if (!Schema::hasColumn('documents', 'department')) {
                $table->string('department')->nullable()->after('assigned_to');
            }
        });
    }

    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            foreach (['first_name', 'fullname', 'division_code', 'division', 'assigned_to', 'department'] as $column) {
                if (Schema::hasColumn('documents', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};