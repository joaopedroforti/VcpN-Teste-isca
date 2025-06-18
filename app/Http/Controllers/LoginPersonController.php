<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginPersonRequest;

final class LoginPersonController extends Controller
{
    public function __invoke(LoginPersonRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect('/instrucoes');
    }
}
