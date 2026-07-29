<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', [
            'title' => 'Welcome to Indigenous Heritage',
            'heroContent' => [
                'title' => 'Preserving Indigenous Filipino Heritage',
                'subtitle' => 'Celebrating the rich cultural traditions of the Philippines',
            ]
        ]);
    }

    public function about()
    {
        
        return Inertia::render('About');

         return Inertia::render('About', [
            'title' => 'About Us',
            'content' => 'We are dedicated to preserving and promoting indigenous Filipino culture...'
        ]);
    }

    public function process()
    {
        return Inertia::render('Process', [
            'title' => 'Our Process',
            'steps' => [
                ['title' => 'Research', 'description' => 'Deep dive into indigenous communities'],
                ['title' => 'Collaboration', 'description' => 'Working with tribal leaders'],
                ['title' => 'Documentation', 'description' => 'Preserving oral traditions'],
                ['title' => 'Sharing', 'description' => 'Disseminating knowledge globally'],
            ]
        ]);
    }

    public function faq()
    {
        return Inertia::render('FAQ', [
            'title' => 'Frequently Asked Questions',
            'faqs' => [
                [
                    'question' => 'What is indigenous Filipino culture?',
                    'answer' => 'Indigenous Filipino culture encompasses the traditions...'
                ],
                // Add more FAQs
            ]
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'title' => 'Contact Us'
        ]);
    }
}