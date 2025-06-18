<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

final class ShowLoginPersonController extends Controller
{
    public function __invoke()
    {
        if (! auth('person')->check()) {
            return Inertia::render('LoginPerson');
        }

        return is_null(auth('person')->user()->behavioralProfileTest)
            ? redirect('instrucoes')->with('message', ['info' => 'Você ainda não realizou o teste!'])
            : redirect('resultado')->with('message', ['info' => 'Você já realizou o teste!']);
    }
}
