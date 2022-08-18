<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MahasiswaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('mahasiswa',[MahasiswaController::class,'index']);
// Route::post('mahasiswa',[MahasiswaController::class,'store']);
// Route::patch('mahasiswa/update/{mahasiswa:id}',[MahasiswaController::class,'update']);
// Route::get('mahasiswa/show/{mahasiswa:id}',[MahasiswaController::class,'show']);

Route::apiResource('mahasiswa',MahasiswaController::class);
