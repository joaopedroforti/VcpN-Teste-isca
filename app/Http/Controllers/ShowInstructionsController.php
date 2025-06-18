<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Person;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

final class ShowInstructionsController
{
    public function __invoke(Request $request)
    {
        // Recupera os parâmetros da query string
        $nome = $request->query('nome');
        $email = $request->query('email');
        $working = $request->query('working');

        // ✅ Validação: redireciona se qualquer campo obrigatório estiver ausente ou vazio
        if (empty($nome) || empty($email) || empty($working)) {
            return redirect()->away('https://vocenoproximonivel.com.br/perfil');
        }

        // 🔍 Busca a pessoa pelo e-mail
        $pessoa = Person::where('email', $email)->first();

        // 👤 Se não existir, cria
        if (!$pessoa) {
            $pessoa = Person::create([
                'name' => $nome,
                'email' => $email,
                'working' => $working,
                'origin' => 'lp',
            ]);
            Http::post('https://events.sendpulse.com/events/id/92233b0ed0f44984aa04516810cc3224/8906998', [
                'email' => $email,
                'phone' => '',
                'working' => $working,
                'event_date' => Carbon::now()->toDateTimeString(),
                'profile' => null,
                'name' => $nome,
            ]);
        }

        // 🧠 Busca o teste existente
        $teste = $pessoa->behavioralProfileTest;

        // 💾 Armazena na sessão
        session([
            'pessoa_id' => $pessoa->id,
            'pessoa' => $pessoa,
            'teste' => $teste,
        ]);

        // ✅ Se já fez o teste, redireciona para o perfil correspondente
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

            return redirect()->away("https://vocenoproximonivel.com.br{$slug}");
        }

   


             // 📝 Ainda não fez o teste
             return Inertia::render('Instructions');
    }
}
