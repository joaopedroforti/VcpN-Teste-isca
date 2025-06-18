<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAdminRequest;

final class LoginAdminController extends Controller
{
    public function __invoke(LoginAdminRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect('/dashboard');
    }
}
