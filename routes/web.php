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


use App\Http\Controllers\ArchiveController;




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
    
    

    ///////////////////////////////
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
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::put('/documents/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::get('/documents/{document}/email-status', [DocumentController::class, 'getEmailStatus'])->name('documents.email-status');
    
    Route::post('/documents/{document}/archive', [DocumentController::class, 'archive'])->name('documents.archive');
    
    Route::resource('documents', DocumentController::class);
    Route::post('/documents/{document}/release', [DocumentController::class, 'release'])->name('documents.release');
    Route::post('/documents/{document}/terminal', [DocumentController::class, 'terminal'])->name('documents.terminal');
    Route::get('/api/documents/data', [DocumentController::class, 'getDocumentData'])->name('documents.data');

    ////////////////////////////

// Audit Trails
    Route::get('/audit-trails', [AuditTrailController::class, 'index'])->name('audit-trails');

    // Authenticated Routes
    Route::middleware(['auth'])->group(function () {
    
     // User Management
    Route::get('/user-management', [UserManagementController::class, 'index'])->name('user.management');
    Route::post('/users', [UserManagementController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::put('/user-management', [UserManagementController::class, 'update'])->name('user-management.update');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
    Route::delete('/user-management/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{user}/permissions', [UserManagementController::class, 'updatePermissions'])->name('users.permissions');
     
    });
////////////////////////////////////

     // Archive routes
     Route::get('/archives', [ArchiveController::class, 'index'])->name('archives.index');
     Route::delete('/archives/{archive}', [ArchiveController::class, 'destroy'])->name('archives.destroy');
     Route::get('/other-info', fn () => Inertia::render('Reports'))->name('other-info');

