<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'name',
        'email',
        'status',
        'sent_at',
        'read_at'
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'read_at' => 'datetime',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
    
}
