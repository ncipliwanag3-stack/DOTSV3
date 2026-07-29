<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;

class AboutController extends Controller
{
    //
     //public function about()
    //{
      //  return Inertia::render('Public/About', [
        //    'title' => 'About NCIP',
        //]);

        
    //}

    public function about()
    {
        //return Inertia::render('About', [
          //  'title' => 'About Us',
            //'content' => 'We are dedicated to preserving and promoting indigenous Filipino culture...'
        //]);
     
        return Inertia::render('Auth/Login');
    
    }
}
