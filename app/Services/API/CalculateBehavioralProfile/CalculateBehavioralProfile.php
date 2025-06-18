<?php

namespace App\Services\API\CalculateBehavioralProfile;

use Illuminate\Support\Facades\Http;

class CalculateBehavioralProfile
{
    public function __invoke(array $groups)
    {
        $response = Http::acceptJson()
            ->asJson()
            ->post('https://api1.inperson.com.br/behavioral-profiles', ['groups' => $groups])
            ->json();

        return new CalculatedBehavioralProfileDTO(...$response);
    }
}
