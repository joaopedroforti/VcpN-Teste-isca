<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Verifica se está logado
        if (!$request->session()->get('isloged', false)) {
            return Redirect::to('/login');
        }

        // Continua normalmente
        $search = $request->input('search');

        $query = Person::with('behavioralProfileTest')
            ->when($search, function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('document', 'like', "%$search%");
            });

        return Inertia::render('Dashboard', [
            'persons' => $query->get(),
            'search' => $search,
        ]);
    }

    public function login(Request $request)
    {
        // Valida login simples
        if ($request->input('email') === 'admin' && $request->input('password') === 'VcPnAdmin1824') {
            $request->session()->put('isloged', true);

            return Redirect::to('/dashboard');
        }

        return Inertia::render('LoginAdmin', [
            'error' => 'Login ou senha incorretos.'
        ]);
    }

    public function loga()
    {
        return Inertia::render('LoginAdmin');
    }
}
