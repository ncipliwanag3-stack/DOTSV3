<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class HomeController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Home', [
            'indigenousGroups' => [
                ['name' => 'Manobo', 'region' => 'Mindanao', 'description' => 'One of the largest indigenous groups in the Philippines'],
                ['name' => 'Ifugao', 'region' => 'Luzon', 'description' => 'Known for the Banaue Rice Terraces'],
                ['name' => 'Dayak', 'region' => 'Borneo', 'description' => 'Indigenous people of Borneo island'],
            ]
        ]);
    }
}
