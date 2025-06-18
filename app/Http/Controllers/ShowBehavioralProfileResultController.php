<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

final class ShowBehavioralProfileResultController extends Controller
{
    public function __invoke()
    {
        return is_null(auth('person')->user()->behavioralProfileTest)
            ? redirect('instrucoes')->with('message', ['info' => 'Você ainda não realizou o teste!'])
            : Inertia::render('Result', ['test' => auth('person')->user()->behavioralProfileTest]);
    }
}
