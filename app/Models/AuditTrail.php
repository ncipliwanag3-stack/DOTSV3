<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditTrail extends Model
{
    use HasFactory;

     protected $fillable = [
        'module',
        'event',
        'log_date',
        'user',
        'user_id',
        'details',
    ];

    protected $casts = [
        'log_date' => 'datetime',
        'details' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
