<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveTestRequest;
use App\Models\BehavioralProfileTest;
use App\Services\API\API;
use Ramsey\Uuid\Uuid;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
final class SaveTestController extends Controller
{
    /** @var API */
    private $api;

    public function __construct(API $api)
    {
        $this->api = $api;
    }

    public function __invoke(SaveTestRequest $request)
    {
        $personId = session('pessoa_id');

        // 1. Calcula o perfil
        $calculatedProfile = $this->api->calculateBehavioralProfile($request->groups);

        // 2. Salva o teste
        BehavioralProfileTest::create([
            'uuid' => (string) Uuid::uuid4(),
            'person_id' => $personId,
            'accuracy' => $calculatedProfile->accuracy,
            'collaboration' => $calculatedProfile->collaboration,
            'decision' => $calculatedProfile->decision,
            'initiative' => $calculatedProfile->initiative,
            'profile' => $calculatedProfile->profile,
            'skills' => $calculatedProfile->skills,
        ]);

        // 3. Busca o teste salvo
        $teste = BehavioralProfileTest::where('person_id', $personId)->first();

        // 4. Define a URL de redirecionamento
        $defaultRedirect = '/perfil-nao-encontrado';

        if ($teste) {
            session(['teste' => $teste]);

            $profile = $teste->profile ?? '';
            $partes = explode(',', $profile);

            $dominante = $partes[0] ?? null;
            $secundario = $partes[1] ?? '';

            // Tabela de redirecionamentos
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

            $slug = $mapa[$dominante][$secundario] ?? $defaultRedirect;
        } else {
            $slug = $defaultRedirect;
        }




Http::post('https://events.sendpulse.com/events/id/2e11c3d7b68f4620e93cc0554a644e3c/8906998', [
    'email' => session('pessoa')->email,
    'phone' => '',
    'working' => session('pessoa')->working,
    'event_date' => Carbon::now()->toDateTimeString(),
    'profile' => $profile,
    'name' => session('pessoa')->name,
]);



    
        // 5. Retorna JSON com a URL
        return Inertia::location("https://vocenoproximonivel.com.br{$slug}");

    }
}
