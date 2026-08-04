<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function documents()
    {
        return $this->hasMany(Document::class, 'received_by');
    }

    public function hasPermission($module, $action)
    {
        $permission = Permission::where('role', $this->role)
            ->where('module', $module)
            ->first();

        if (!$permission) return false;

        $actionMap = [
            'create' => 'can_create',
            'read' => 'can_read',
            'update' => 'can_update',
            'delete' => 'can_delete',
        ];

        return $permission->{$actionMap[$action]} ?? false;

        

        
    }

    public function releasedDocuments()
    {
        return $this->hasMany(Document::class, 'released_by');
    }

    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ?? 'https://ui-avatars.com/api/?name=' . urlencode($this->name);
    }

    public function auditTrails() 
    {
        return $this->hasMany(AuditTrail::class);
    }
}
