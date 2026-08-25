<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Database\Eloquent\SoftDeletes;


class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [

        //'tracking_number',
        //'title',
        //'description',
        //'category',
        //'office_origin',
        //'recipient',
        //'received_date',
        //'release_date',
        //'due_date',
        //'status',
        //'is_urgent',
        //'last_transaction',
        //'type',
        //'date_received',
        //'urgency',
        //'file_path',
        //'file_type',
        //'file_size',
        //'recipients',
        //'email_status',
        //'released_at',
        //'archived_at',
        //'created_by'
        'tracking_number',
        'title',
        'type',
        'date_received',
        'status',
        'urgency',
        'description',
        'file_path',
        'created_by',
        'released_at',
        'archived_at',
        'deleted_at'
    ];

    protected $casts = [
        //'received_date' => 'date',
        //'release_date' => 'date',
        //'due_date' => 'date',
        //'recipients' => 'array',
        //'email_status' => 'array',
        //'date_received' => 'date',
        //'released_at' => 'datetime',
        //'archived_at' => 'datetime',
        'date_received' => 'date',
        'released_at' => 'datetime',
        'archived_at' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function recipients()
    {
        return $this->hasMany(DocumentRecipient::class);
    }

    public function scopeUrgent($query)
    {
        return $query->where('urgency', 'Urgent');
    } 

    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
    //////////////////

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

    //public function creator()
    //{
      //  return $this->belongsTo(User::class, 'created_by');
    //}

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeReleased($query)
    {
        return $query->where('status', 'released');
    }

    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    public function getIsUrgentAttribute()
    {
        return $this->urgency === 'High';
    }
}
