<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_number',
        'title',
        'description',
        'status',
        'received_date',
        'release_date',
        'due_date',
        'last_transaction',
        'user_id',
        'category',
        'received_by',
        'released_by',
        'qr_code',
        'remarks',
    ];

    protected $casts = [
        'received_date' => 'date',
        'release_date' => 'date',
        'due_date' => 'date',
    ];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function releaser()
    {
        return $this->belongsTo(User::class, 'released_by');
    }

    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'yellow',
            'released' => 'green',
            'archived' => 'gray',
            'overdue' => 'red',
            default => 'blue',
        };
    }

     public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function auditTrails()
    {
        return $this->hasMany(AuditTrail::class);
    }
}
