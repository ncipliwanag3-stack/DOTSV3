<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('documents')) {
            return;
        }

        Schema::table('documents', function (Blueprint $table) {
            if (!Schema::hasColumn('documents', 'origin_type')) {
                $table->string('origin_type')->nullable()->after('type');
            }

            if (!Schema::hasColumn('documents', 'last_transaction')) {
                $table->string('last_transaction')->nullable()->after('origin_type');
            }
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('documents')) {
            return;
        }

        Schema::table('documents', function (Blueprint $table) {
            $columns = array_filter([
                Schema::hasColumn('documents', 'origin_type') ? 'origin_type' : null,
                Schema::hasColumn('documents', 'last_transaction') ? 'last_transaction' : null,
            ]);

            if ($columns) {
                $table->dropColumn($columns);
            }
        });
    }
};