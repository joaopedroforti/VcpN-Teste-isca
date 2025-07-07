<?php

use App\Http\Controllers\LoginAdminController;
use App\Http\Controllers\LoginPersonController;
use App\Http\Controllers\LogoutAdminController;
use App\Http\Controllers\SaveTestController;
use App\Http\Controllers\ShowBehavioralProfileReportController;
use App\Http\Controllers\ShowBehavioralProfileResultController;
use App\Http\Controllers\ShowBehavioralProfileTestController;
use App\Http\Controllers\ShowInstructionsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShowLoginPersonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// admin


Route::get('', function () {
    return redirect()->away('https://vocenoproximonivel.com.br/perfil');
});


Route::get('instrucoes', [ShowInstructionsController::class, '__invoke']);
Route::get('teste', [ShowBehavioralProfileTestController::class, '__invoke']);
Route::post('teste', [SaveTestController::class, '__invoke']);
Route::get('resultado', [ShowBehavioralProfileResultController::class, '__invoke'])->middleware('auth:person');
Route::get('resultado/{uuid}', [ShowBehavioralProfileReportController::class, '__invoke']);
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('login', [DashboardController::class, 'loga'])->name('loga');
Route::post('login', [DashboardController::class, 'login'])->name('login');
// general
Route::get('{any}', fn () => Inertia::render('NotFound'))->where('any', '.*');
