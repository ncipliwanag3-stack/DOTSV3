<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/////////

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;

//////////////////////////////////////////

use App\Http\Controllers\AboutController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProcessController;

///////////////////////////////////////////



use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\AuditTrailController;
use App\Http\Controllers\DocumentController;


////////////////////////

Route::get('/about', [AboutController::class, 'about'])->name('about');

///////////////////////////////

// Public Routes
//Route::get('/', [HomeController::class, 'index'])->name('home');
//Route::get('/about', [AboutController::class, 'index'])->name('about');
//Route::get('/process', [ProcessController::class, 'index'])->name('process');
//Route::get('/faq', [FAQController::class, 'index'])->name('faq');
//Route::get('/contact', [ContactController::class, 'index'])->name('contact');



// Guest routes
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/process', [PageController::class, 'process'])->name('process');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

// Auth routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/user-management', UserManagementController::class);
    Route::get('/user-management/roles-permissions', [UserManagementController::class, 'rolesPermissions'])->name('user-management.roles-permissions');
    Route::post('/user-management/permissions', [UserManagementController::class, 'updatePermissions'])->name('user-management.permissions');
    
    Route::get('/audit-trails', [AuditTrailController::class, 'index'])->name('audit-trails');
    
   // Route::resource('/documents', DocumentController::class);

});

///////////////

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/documents/receive', [DashboardController::class, 'receiveDocument'])->name('documents.receive');
    Route::post('/notifications/read', [DashboardController::class, 'markNotificationRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [DashboardController::class, 'markAllNotificationsRead'])->name('notifications.read-all');
});

////////////////////////////////

    Route::get('/documents', [DocumentController::class, 'index'])->name('documents');

////////////////////////////

// User Management routes
    
     Route::get('/audit-trails', [AuditTrailController::class, 'index'])->name('audit-trails');
     Route::get('/user-management', [UserManagementController::class, 'index'])->name('user-management');
     Route::put('/user-management/{user}', [UserManagementController::class, 'update'])->name('user-management.update');