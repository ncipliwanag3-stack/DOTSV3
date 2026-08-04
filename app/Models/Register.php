<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    use HasFactory;
     
    protected $fillable = [
        'dots_id',
        'name',
        'email',
        'password',
        'office',
        'position',
        'profile_photo',
        'role',
        'avatar',
        'division',
    ];
    
}
