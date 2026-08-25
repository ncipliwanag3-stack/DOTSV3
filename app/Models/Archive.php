<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'tracking_number',
        'title',
        'description',
        'category',
        'archived_date',
        'year',
        'status',
        'is_urgent',
        'last_transaction',
        'archived_by'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

     public function archivedBy()
    {
        return $this->belongsTo(User::class, 'archived_by');
    }

}
