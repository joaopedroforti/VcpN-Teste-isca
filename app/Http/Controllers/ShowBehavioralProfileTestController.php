<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Routing\Controller;

final class ShowBehavioralProfileTestController extends Controller
{
    public function __invoke()
    {
        // 🔒 Verifica se há pessoa logada
        if (!session()->has('pessoa_id')) {
            return redirect()->away('https://vocenoproximonivel.com.br/perfil');
        }

        $teste = session('teste');

        // ✅ Se já fez o teste
        if ($teste) {
            $profile = $teste->profile ?? '';
            $partes = explode(',', $profile);

            $dominante = $partes[0] ?? null;
            $secundario = $partes[1] ?? null;

            $mapa = [
                'Decisão' => [
                    '' => '/perfil-profissional-dj6t1',
                    'Iniciativa' => '/perfil-profissional-9x7p4',
                    'Colaboração' => '/perfil-profissional-j3qd2',
                    'Exatidão' => '/perfil-profissional-h8pl9',
                ],
                'Iniciativa' => [
                    '' => '/perfil-profissional-1zp8r',
                    'Decisão' => '/perfil-profissional-q7l5n',
                    'Colaboração' => '/perfil-profissional-m2rk8',
                    'Exatidão' => '/perfil-profissional-e5yv3',
                ],
                'Colaboração' => [
                    '' => '/perfil-profissional-b9tw4',
                    'Decisão' => '/perfil-profissional-u4zq7',
                    'Iniciativa' => '/perfil-profissional-s5nm2',
                    'Exatidão' => '/perfil-profissional-k3wp6',
                ],
                'Exatidão' => [
                    '' => '/perfil-profissional-f8ql0',
                    'Decisão' => '/perfil-profissional-v2dr9',
                    'Iniciativa' => '/perfil-profissional-t6pm3',
                    'Colaboração' => '/perfil-profissional-n4yx5',
                ],
            ];

            $slug = $mapa[$dominante][$secundario ?? ''] ?? '/perfil-nao-encontrado';
            var_dump($slug);
            return redirect()->away("https://vocenoproximonivel.com.br{$slug}");
        }
        // 📝 Ainda não fez o teste
        return Inertia::render('Test');
    }
}
