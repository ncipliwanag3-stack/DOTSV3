<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


    //Route::apiResource('archives', ArchiveController::class);
    //Route::get('/archives/year/{year}', [ArchiveController::class, 'byYear']);
    //Route::get('/archives/search', [ArchiveController::class, 'search']);


    //use App\Http\Controllers\{
    //Auth\AuthController,
    //DocumentController,
    //ArchiveController,
    //AuditTrailController,
    //UserManagementController,
    //PageController
//};

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\AuditTrailController;
use App\Http\Controllers\UserManagementController;

Route::get('/page', [PageController::class, 'index']);
// Public routes for landing pages
Route::get('/home', [PageController::class, 'home']);
Route::get('/about', [PageController::class, 'about']);
Route::get('/process', [PageController::class, 'process']);
Route::get('/faq', [PageController::class, 'faq']);
Route::get('/contact', [PageController::class, 'contact']);

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);


// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // User
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard
    Route::get('/dashboard/stats', [DocumentController::class, 'stats']);
    
    // Documents
    Route::prefix('documents')->group(function () {
        Route::get('/latest', [DocumentController::class, 'latest']);
        Route::get('/all', [DocumentController::class, 'all']);
        Route::post('/store', [DocumentController::class, 'store']);
        Route::put('/{id}', [DocumentController::class, 'update']);
        Route::delete('/{id}', [DocumentController::class, 'destroy']);
        Route::post('/{id}/release', [DocumentController::class, 'release']);
        Route::post('/{id}/terminal', [DocumentController::class, 'terminal']);
        Route::get('/{id}/print', [DocumentController::class, 'print']);

        ////////////////////////

        Route::get('/', [DocumentController::class, 'index']);      // GET /api/documents
        Route::post('/', [DocumentController::class, 'store']);     // POST /api/documents
        Route::get('/{id}', [DocumentController::class, 'show']);   // GET /api/documents/{id}
        Route::put('/{id}', [DocumentController::class, 'update']); // PUT /api/documents/{id}
        Route::delete('/{id}', [DocumentController::class, 'destroy']); // DELETE /api/documents/{id}
        /////////////////////////////

        // Document routes
        //Route::get('/documents', [DocumentController::class, 'index']);
        //Route::post('/documents', [DocumentController::class, 'store']);
        Route::get('/documents/{document}', [DocumentController::class, 'show']);
        //Route::put('/documents/{document}', [DocumentController::class, 'update']);
        //Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);
        //Route::post('/documents/{document}/release', [DocumentController::class, 'release']);
        Route::post('/documents/{document}/archive', [DocumentController::class, 'archive']);
        //Route::post('/documents/{document}/terminal', [DocumentController::class, 'terminal']);
        Route::get('/documents/{document}/email-status', [DocumentController::class, 'getEmailStatus']);
    });

    // Archives
    Route::prefix('archives')->group(function () {
        Route::get('/{year}', [ArchiveController::class, 'index']);
        Route::post('/{id}/restore', [ArchiveController::class, 'restore']);
        Route::delete('/{id}', [ArchiveController::class, 'destroy']);
    });

    // Audit Trails
    Route::prefix('audit-trails')->group(function () {
        Route::get('/', [AuditTrailController::class, 'index']);
        Route::post('/', [AuditTrailController::class, 'store']);
    });

    // User Management
    Route::prefix('users')->group(function () {
        Route::get('/', [UserManagementController::class, 'index']);
        Route::post('/', [UserManagementController::class, 'store']);
        Route::put('/{id}', [UserManagementController::class, 'update']);
        Route::delete('/{id}', [UserManagementController::class, 'destroy']);
        Route::get('/roles', [UserManagementController::class, 'roles']);
        Route::put('/roles/{id}', [UserManagementController::class, 'updateRole']);
    });
});